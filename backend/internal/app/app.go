package app

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/Rarstyle/AI-Fusion/internal/auth"
	"github.com/Rarstyle/AI-Fusion/internal/config"
	"github.com/Rarstyle/AI-Fusion/internal/handler"
	"github.com/Rarstyle/AI-Fusion/internal/middleware"
	"github.com/Rarstyle/AI-Fusion/internal/video"
	"github.com/gorilla/mux"
	"go.uber.org/zap"
)

type App struct {
	config           *config.Config
	logger           *zap.Logger
	router           *mux.Router
	server           *http.Server
	authService      *auth.Service
	authHandler      *handler.AuthHandler
	protectedHandler *handler.ProtectedHandler
	videoService     *video.Service
	videoHandler     *handler.VideoHandler
}

func New(cfg *config.Config, logger *zap.Logger) *App {
	authStore := auth.NewStore()
	authService := auth.NewService(authStore, &cfg.Auth)
	authHandler := handler.NewAuthHandler(authService, logger)
	protectedHandler := handler.NewProtectedHandler(logger)

	// Initialize video processing
	videoStore := video.NewStore()
	videoService, err := video.NewService(videoStore, &cfg.Video, &cfg.ML)
	if err != nil {
		logger.Fatal("Failed to initialize video service", zap.Error(err))
	}
	videoHandler := handler.NewVideoHandler(videoService, logger)

	router := mux.NewRouter()

	app := &App{
		config:           cfg,
		logger:           logger,
		router:           router,
		authService:      authService,
		authHandler:      authHandler,
		protectedHandler: protectedHandler,
		videoService:     videoService,
		videoHandler:     videoHandler,
	}

	app.setupRoutes()
	app.setupServer()

	return app
}

func (a *App) setupRoutes() {

	a.router.Use(middleware.LoggingMiddleware(a.logger))

	// Apply CORS middleware to all routes
	a.router.Use(middleware.CORSMiddleware)

	a.router.HandleFunc("/auth/register", a.authHandler.Register).Methods("POST", "OPTIONS")
	a.router.HandleFunc("/auth/login", a.authHandler.Login).Methods("POST", "OPTIONS")
	a.router.HandleFunc("/auth/logout", a.authHandler.Logout).Methods("POST", "OPTIONS")

	protectedRouter := a.router.PathPrefix("/api").Subrouter()
	protectedRouter.Use(middleware.AuthMiddleware(a.authService))
	protectedRouter.HandleFunc("/protected", a.protectedHandler.ProtectedEndpoint).Methods("GET")

	// Video routes
	protectedRouter.HandleFunc("/videos/upload", a.videoHandler.UploadVideo).Methods("POST")
	protectedRouter.HandleFunc("/videos/analyze", a.videoHandler.AnalyzeVideo).Methods("POST")
	protectedRouter.HandleFunc("/videos", a.videoHandler.ListVideos).Methods("GET")
	protectedRouter.HandleFunc("/videos/{id}", a.videoHandler.GetVideo).Methods("GET")
	protectedRouter.HandleFunc("/videos/{id}", a.videoHandler.DeleteVideo).Methods("DELETE")

	a.router.HandleFunc("/health", a.healthCheck).Methods("GET")

	a.logger.Info("Routes registered",
		zap.String("login", "POST /auth/login"),
		zap.String("register", "POST /auth/register"),
		zap.String("logout", "POST /auth/logout"),
		zap.String("protected", "GET /api/protected"),
		zap.String("upload_video", "POST /api/videos/upload"),
		zap.String("analyze_video", "POST /api/videos/analyze"),
		zap.String("list_videos", "GET /api/videos"),
		zap.String("get_video", "GET /api/videos/{id}"),
		zap.String("delete_video", "DELETE /api/videos/{id}"),
		zap.String("health", "GET /health"),
	)
}

func (a *App) setupServer() {
	a.server = &http.Server{
		Addr:         fmt.Sprintf("%s:%d", a.config.Server.Host, a.config.Server.Port),
		Handler:      a.router,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}
}

func (a *App) Run() error {
	a.logger.Info("Starting server",
		zap.String("host", a.config.Server.Host),
		zap.Int("port", a.config.Server.Port),
		zap.String("env", a.config.Env),
	)

	if err := a.server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		return fmt.Errorf("failed to start server: %w", err)
	}

	return nil
}

func (a *App) Shutdown(ctx context.Context) error {
	a.logger.Info("Shutting down server")
	return a.server.Shutdown(ctx)
}

func (a *App) healthCheck(w http.ResponseWriter, r *http.Request) {
	response := map[string]interface{}{
		"status":    "ok",
		"timestamp": time.Now().Unix(),
		"service":   "ai-fusion-backend",
		"version":   "1.0.0",
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		a.logger.Error("Failed to encode health check response", zap.Error(err))
		http.Error(w, "Internal server error", http.StatusInternalServerError)
	}
}
