package video

import (
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"
)

var allowedExtensions = map[string]bool{
	".mp4":  true,
	".webm": true,
	".mov":  true,
	".avi":  true,
}

var allowedMimeTypes = map[string]bool{
	"video/mp4":                true,
	"video/webm":               true,
	"video/quicktime":          true,
	"video/x-msvideo":          true,
	"video/mpeg":               true,
	"application/octet-stream": true,
}

// ValidateFileSize checks if the file size is within limits
func ValidateFileSize(size int64, maxSize int64) error {
	if size <= 0 {
		return fmt.Errorf("invalid file size: %d", size)
	}
	if size > maxSize {
		return fmt.Errorf("file size %d exceeds maximum allowed size %d", size, maxSize)
	}
	return nil
}

// ValidateFileFormat checks if the file extension and MIME type are allowed
func ValidateFileFormat(filename string, contentType string) error {
	ext := strings.ToLower(filepath.Ext(filename))
	if !allowedExtensions[ext] {
		return fmt.Errorf("file extension %s not allowed. Allowed: mp4, webm, mov, avi", ext)
	}

	contentType = strings.Split(contentType, ";")[0]
	contentType = strings.TrimSpace(strings.ToLower(contentType))

	if !allowedMimeTypes[contentType] {
		// Allow if extension is valid even if MIME type is unknown
		// (browsers sometimes send incorrect MIME types)
		if ext != "" {
			return nil
		}
		return fmt.Errorf("content type %s not allowed", contentType)
	}

	return nil
}

// SanitizeFilename removes dangerous characters and path components
func SanitizeFilename(filename string) string {
	filename = strings.ReplaceAll(filename, "..", "")
	filename = strings.ReplaceAll(filename, "/", "_")
	filename = strings.ReplaceAll(filename, "\\", "_")
	filename = strings.TrimSpace(filename)

	if filename == "" {
		filename = "video"
	}

	return filename
}

// SaveVideoFile saves the uploaded file to the storage directory
func SaveVideoFile(file multipart.File, storagePath string, filename string) (string, int64, error) {
	if err := os.MkdirAll(storagePath, 0755); err != nil {
		return "", 0, fmt.Errorf("failed to create storage directory: %w", err)
	}

	filePath := filepath.Join(storagePath, filename)

	// Create the file
	dst, err := os.Create(filePath)
	if err != nil {
		return "", 0, fmt.Errorf("failed to create file: %w", err)
	}
	defer dst.Close()

	// Copy file content
	written, err := io.Copy(dst, file)
	if err != nil {
		os.Remove(filePath)
		return "", 0, fmt.Errorf("failed to save file: %w", err)
	}

	return filePath, written, nil
}

// DeleteVideoFile removes a video file from the filesystem
func DeleteVideoFile(filePath string) error {
	if filePath == "" {
		return nil
	}

	if err := os.Remove(filePath); err != nil {
		if !os.IsNotExist(err) {
			return fmt.Errorf("failed to delete file: %w", err)
		}
	}

	return nil
}
