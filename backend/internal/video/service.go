package video

import (
	"fmt"
	"mime/multipart"
	"path/filepath"
	"strings"
	"time"

	"github.com/Rarstyle/AI-Fusion/internal/config"
	"github.com/google/uuid"
)

type Service struct {
	store      *Store
	config     *config.VideoConfig
	storageDir string
	analyzer   *Analyzer
}

func NewService(store *Store, cfg *config.VideoConfig, mlCfg *config.MLConfig) (*Service, error) {
	storageDir := filepath.Join("./storage", cfg.StoragePath)
	absStorageDir, err := filepath.Abs(storageDir)
	if err != nil {
		return nil, fmt.Errorf("failed to resolve storage directory: %w", err)
	}

	return &Service{
		store:      store,
		config:     cfg,
		storageDir: absStorageDir, // pass absolute path
		analyzer:   NewAnalyzer(mlCfg),
	}, nil
}

// UploadVideo handles video upload: validates, saves file, and stores metadata
func (s *Service) UploadVideo(fileHeader *multipart.FileHeader, userID string) (*VideoUploadResponse, error) {
	file, err := fileHeader.Open()
	if err != nil {
		return nil, fmt.Errorf("failed to open file: %w", err)
	}
	defer file.Close()

	if err := ValidateFileSize(fileHeader.Size, s.config.MaxFileSize); err != nil {
		return nil, fmt.Errorf("file validation failed: %w", err)
	}

	// Validate file format
	if err := ValidateFileFormat(fileHeader.Filename, fileHeader.Header.Get("Content-Type")); err != nil {
		return nil, fmt.Errorf("file validation failed: %w", err)
	}

	// Check user's video count limit
	count := s.store.CountByUserID(userID)
	if count >= s.config.MaxFiles {
		return nil, fmt.Errorf("user has reached maximum number of videos (%d)", s.config.MaxFiles)
	}

	// Generate unique filename
	videoID := uuid.New().String()

	baseName := strings.TrimSuffix(fileHeader.Filename, filepath.Ext(fileHeader.Filename))
	sanitizedFilename := SanitizeFilename(baseName)
	ext := filepath.Ext(fileHeader.Filename)

	filename := fmt.Sprintf("%s_%s%s", videoID, sanitizedFilename, ext)

	// Save file to storage
	filePath, written, err := SaveVideoFile(file, s.storageDir, filename)
	if err != nil {
		return nil, fmt.Errorf("failed to save file: %w", err)
	}

	// Create video metadata
	now := time.Now()
	video := Video{
		ID:        videoID,
		UserID:    userID,
		FileName:  fileHeader.Filename,
		FilePath:  filePath,
		FileSize:  written,
		CreatedAt: now,
		UpdatedAt: now,
	}

	// Store metadata
	if err := s.store.Create(video); err != nil {
		// Clean up file if metadata storage fails
		DeleteVideoFile(filePath)
		return nil, fmt.Errorf("failed to store video metadata: %w", err)
	}

	return &VideoUploadResponse{
		VideoID:  videoID,
		FileName: fileHeader.Filename,
		FileSize: written,
	}, nil
}

// GetVideo retrieves video metadata by ID (with user ownership check)
func (s *Service) GetVideo(videoID string, userID string) (*Video, error) {
	video, err := s.store.GetByID(videoID)
	if err != nil {
		return nil, fmt.Errorf("video not found")
	}

	// Verify ownership
	if video.UserID != userID {
		return nil, fmt.Errorf("video not found") // Don't reveal existence to other users
	}

	return &video, nil
}

// ListVideos retrieves all videos for a user
func (s *Service) ListVideos(userID string) (*VideoListResponse, error) {
	videos, err := s.store.GetByUserID(userID)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve videos: %w", err)
	}

	return &VideoListResponse{
		Videos: videos,
		Count:  len(videos),
	}, nil
}

// DeleteVideo removes a video and its file
func (s *Service) DeleteVideo(videoID string, userID string) error {
	// Get video to get file path
	video, err := s.store.GetByID(videoID)
	if err != nil {
		return fmt.Errorf("video not found")
	}

	// Verify ownership
	if video.UserID != userID {
		return fmt.Errorf("video not found") // Don't reveal existence to other users
	}

	// Delete file
	if err := DeleteVideoFile(video.FilePath); err != nil {
		// Log error but continue with metadata deletion
		// The file might already be deleted or not exist
	}

	// Delete metadata
	if err := s.store.Delete(videoID, userID); err != nil {
		return fmt.Errorf("failed to delete video: %w", err)
	}

	return nil
}

// AnalyzeVideo analyzes an uploaded video and returns form feedback
func (s *Service) AnalyzeVideo(videoID string, exerciseID string, userID string) (*AnalysisResult, error) {
	// Get video to verify ownership and get file path
	video, err := s.GetVideo(videoID, userID)
	if err != nil {
		return nil, fmt.Errorf("video not found: %w", err)
	}

	// Analyze the video
	result, err := s.analyzer.AnalyzeVideo(video.FilePath, exerciseID)
	if err != nil {
		return nil, fmt.Errorf("failed to analyze video: %w", err)
	}

	// Set video ID in result
	result.VideoID = videoID

	return result, nil
}
