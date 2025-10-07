package main

import (
	"log"

	"github.com/Rarstyle/AI-Fusion/internal/config"
	"github.com/Rarstyle/AI-Fusion/pkg/logger"
)

func main() {

	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	logger, err := logger.NewLogger(logger.Config{
		Level:  cfg.Log.Level,
		Format: cfg.Log.Format,
		Output: cfg.Log.Output,
	}, cfg.Env)
	if err != nil {
		log.Fatalf("Failed to create logger: %v", err)
	}

	logger.Info("Starting AI-Fusion backend...")

}
