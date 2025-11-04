package handler

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
	"strconv"

	"github.com/Rarstyle/AI-Fusion/internal/middleware"
	"github.com/Rarstyle/AI-Fusion/internal/video"
	"github.com/gorilla/mux"
	"go.uber.org/zap"
)

type VideoHandler struct {
	videoService *video.Service
	logger       *zap.Logger
}

func NewVideoHandler(videoService *video.Service, logger *zap.Logger) *VideoHandler {
	return &VideoHandler{
		videoService: videoService,
		logger:       logger,
	}
}

// UploadVideo handles POST /api/videos/upload
func (h *VideoHandler) UploadVideo(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Get user from context
	claims, ok := middleware.GetUserFromContext(r.Context())
	if !ok {
		h.logger.Error("Failed to get user from context")
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Parse multipart form (max size should be set at router level)
	err := r.ParseMultipartForm(32 << 20) // 32MB max memory
	if err != nil {
		h.logger.Error("Failed to parse multipart form", zap.Error(err))
		http.Error(w, "Failed to parse form", http.StatusBadRequest)
		return
	}

	// Get file from form
	file, fileHeader, err := r.FormFile("video")
	if err != nil {
		h.logger.Error("Failed to get file from form", zap.Error(err))
		http.Error(w, "Video file is required", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Upload video
	response, err := h.videoService.UploadVideo(fileHeader, claims.UserID)
	if err != nil {
		h.logger.Error("Failed to upload video", zap.String("user_id", claims.UserID), zap.Error(err))
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	h.logger.Info("Video uploaded successfully",
		zap.String("user_id", claims.UserID),
		zap.String("video_id", response.VideoID),
		zap.String("filename", response.FileName))

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}

// GetVideo handles GET /api/videos/{id}
func (h *VideoHandler) GetVideo(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Get user from context
	claims, ok := middleware.GetUserFromContext(r.Context())
	if !ok {
		h.logger.Error("Failed to get user from context")
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Get video ID from URL
	vars := mux.Vars(r)
	videoID := vars["id"]
	if videoID == "" {
		http.Error(w, "Video ID is required", http.StatusBadRequest)
		return
	}

	// Get video metadata
	video, err := h.videoService.GetVideo(videoID, claims.UserID)
	if err != nil {
		h.logger.Info("Video not found", zap.String("video_id", videoID), zap.String("user_id", claims.UserID))
		http.Error(w, "Video not found", http.StatusNotFound)
		return
	}

	// Check if file exists
	if _, err := os.Stat(video.FilePath); os.IsNotExist(err) {
		h.logger.Warn("Video file not found on disk", zap.String("video_id", videoID), zap.String("file_path", video.FilePath))
		http.Error(w, "Video file not found", http.StatusNotFound)
		return
	}

	// Open file
	file, err := os.Open(video.FilePath)
	if err != nil {
		h.logger.Error("Failed to open video file", zap.String("video_id", videoID), zap.Error(err))
		http.Error(w, "Failed to read video file", http.StatusInternalServerError)
		return
	}
	defer file.Close()

	// Get file info for content length
	fileInfo, err := file.Stat()
	if err != nil {
		h.logger.Error("Failed to get file info", zap.String("video_id", videoID), zap.Error(err))
		http.Error(w, "Failed to read video file", http.StatusInternalServerError)
		return
	}

	// Set headers for video streaming
	w.Header().Set("Content-Type", "video/mp4")
	w.Header().Set("Content-Length", strconv.FormatInt(fileInfo.Size(), 10))
	w.Header().Set("Content-Disposition", `inline; filename="`+video.FileName+`"`)
	w.Header().Set("Accept-Ranges", "bytes")

	// Stream the file
	_, err = io.Copy(w, file)
	if err != nil {
		h.logger.Error("Failed to stream video", zap.String("video_id", videoID), zap.Error(err))
		return
	}
}

// ListVideos handles GET /api/videos
func (h *VideoHandler) ListVideos(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Get user from context
	claims, ok := middleware.GetUserFromContext(r.Context())
	if !ok {
		h.logger.Error("Failed to get user from context")
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Get videos
	response, err := h.videoService.ListVideos(claims.UserID)
	if err != nil {
		h.logger.Error("Failed to list videos", zap.String("user_id", claims.UserID), zap.Error(err))
		http.Error(w, "Failed to retrieve videos", http.StatusInternalServerError)
		return
	}

	h.logger.Info("Videos listed", zap.String("user_id", claims.UserID), zap.Int("count", response.Count))

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// DeleteVideo handles DELETE /api/videos/{id}
func (h *VideoHandler) DeleteVideo(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Get user from context
	claims, ok := middleware.GetUserFromContext(r.Context())
	if !ok {
		h.logger.Error("Failed to get user from context")
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Get video ID from URL
	vars := mux.Vars(r)
	videoID := vars["id"]
	if videoID == "" {
		http.Error(w, "Video ID is required", http.StatusBadRequest)
		return
	}

	// Delete video
	err := h.videoService.DeleteVideo(videoID, claims.UserID)
	if err != nil {
		h.logger.Info("Failed to delete video", zap.String("video_id", videoID), zap.String("user_id", claims.UserID), zap.Error(err))
		http.Error(w, "Video not found", http.StatusNotFound)
		return
	}

	h.logger.Info("Video deleted successfully",
		zap.String("user_id", claims.UserID),
		zap.String("video_id", videoID))

	response := map[string]string{
		"message": "Video deleted successfully",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

