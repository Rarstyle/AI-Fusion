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
}

func New(cfg *config.Config, logger *zap.Logger) *App {
	authStore := auth.NewStore()
	authService := auth.NewService(authStore, &cfg.Auth)
	authHandler := handler.NewAuthHandler(authService, logger)
	protectedHandler := handler.NewProtectedHandler(logger)

	router := mux.NewRouter()

	app := &App{
		config:           cfg,
		logger:           logger,
		router:           router,
		authService:      authService,
		authHandler:      authHandler,
		protectedHandler: protectedHandler,
	}

	app.setupRoutes()
	app.setupServer()

	return app
}

func (a *App) setupRoutes() {
	a.router.HandleFunc("/auth/login", a.authHandler.Login).Methods("POST")
	a.router.HandleFunc("/auth/register", a.authHandler.Register).Methods("POST")
	a.router.HandleFunc("/auth/logout", a.authHandler.Logout).Methods("POST")

	protectedRouter := a.router.PathPrefix("/api").Subrouter()
	protectedRouter.Use(middleware.AuthMiddleware(a.authService))
	protectedRouter.HandleFunc("/protected", a.protectedHandler.ProtectedEndpoint).Methods("GET")

	a.router.HandleFunc("/health", a.healthCheck).Methods("GET")

	a.logger.Info("Routes registered",
		zap.String("login", "POST /auth/login"),
		zap.String("register", "POST /auth/register"),
		zap.String("logout", "POST /auth/logout"),
		zap.String("protected", "GET /api/protected"),
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
