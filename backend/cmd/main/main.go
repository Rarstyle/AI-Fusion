package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/Rarstyle/AI-Fusion/internal/app"
	"github.com/Rarstyle/AI-Fusion/internal/config"
	"github.com/Rarstyle/AI-Fusion/pkg/logger"
	"go.uber.org/zap"
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

	application := app.New(cfg, logger)

	go func() {
		if err := application.Run(); err != nil {
			logger.Fatal("Failed to start server", zap.Error(err))
		}
	}()

	// TODO: add web hooks maybe.

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	logger.Info("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := application.Shutdown(ctx); err != nil {
		logger.Fatal("Server forced to shutdown", zap.Error(err))
	}

	logger.Info("Server exited")
}
