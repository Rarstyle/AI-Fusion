package video

import "time"

type Video struct {
	ID        string    `json:"id"`
	UserID    string    `json:"user_id"`
	FileName  string    `json:"file_name"`
	FilePath  string    `json:"file_path"`
	FileSize  int64     `json:"file_size"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type VideoUploadRequest struct{}

type VideoUploadResponse struct {
	VideoID  string `json:"video_id"`
	FileName string `json:"file_name"`
	FileSize int64  `json:"file_size"`
}

type VideoListResponse struct {
	Videos []Video `json:"videos"`
	Count  int     `json:"count"`
}
