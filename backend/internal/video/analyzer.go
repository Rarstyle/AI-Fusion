package video

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"

	"github.com/Rarstyle/AI-Fusion/internal/config"
)

type Analyzer struct {
	cfg *config.MLConfig
}

func NewAnalyzer(cfg *config.MLConfig) *Analyzer {
	return &Analyzer{cfg: cfg}
}

func (a *Analyzer) AnalyzeVideo(videoPath, exercise string) (*AnalysisResult, error) {
	payload := map[string]string{
		"session_id": "session-1",
		"user_id":    "user-1",
		"exercise":   exercise,
		"video_path": videoPath,
	}

	body, _ := json.Marshal(payload)

	fmt.Printf("The video is located here: %s\n", videoPath)

	// python3 /abs/path/to/bridge_analyzer.py
	cmd := exec.Command(
		a.cfg.PythonPath,
		"-m", "ml_service.bridge_analyzer",
		videoPath,
	)
	cmd.Dir = a.cfg.WorkDir        // ensures imports work inside ML service
	cmd.Env = append(os.Environ()) // keep normal environment

	var stdout bytes.Buffer
	var stderr bytes.Buffer

	cmd.Stdin = bytes.NewReader(body)
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	if err := cmd.Run(); err != nil {
		return nil, fmt.Errorf("ML analyzer failed: %v, stderr: %s", err, stderr.String())
	}

	var result AnalysisResult
	if err := json.Unmarshal(stdout.Bytes(), &result); err != nil {
		return nil, fmt.Errorf("failed to parse ML output: %v", err)
	}

	return &result, nil
}
