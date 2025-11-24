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

// Analysis models
type FormFeedback struct {
	Type      string `json:"type"`
	Message   string `json:"message"`
	Severity  string `json:"severity"` // "info", "warning", "error"
	Timestamp int64  `json:"timestamp"`
}

type RepAnalysis struct {
	RepNumber int            `json:"repNumber"`
	Valid     bool           `json:"valid"`
	Feedback  []FormFeedback `json:"feedback,omitempty"`
	Timestamp int64          `json:"timestamp"`
}

type AnalysisSummary struct {
	TotalReps    int      `json:"totalReps"`
	ValidReps    int      `json:"validReps"`
	FormAccuracy float64  `json:"formAccuracy"` // 0-100
	CommonIssues []string `json:"commonIssues,omitempty"`
}

type AnalysisResult struct {
	VideoID  string          `json:"videoId"`
	Reps     []RepAnalysis   `json:"reps"`
	Feedback []FormFeedback  `json:"feedback"`
	Summary  AnalysisSummary `json:"summary"`
}
