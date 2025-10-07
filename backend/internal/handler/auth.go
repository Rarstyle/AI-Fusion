package handler

import (
	"encoding/json"
	"net/http"

	"github.com/Rarstyle/AI-Fusion/internal/auth"
	"go.uber.org/zap"
)

type AuthHandler struct {
	authService *auth.Service
	logger      *zap.Logger
}

func NewAuthHandler(authService *auth.Service, logger *zap.Logger) *AuthHandler {
	return &AuthHandler{
		authService: authService,
		logger:      logger,
	}
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req auth.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.logger.Error("Failed to decode login request", zap.Error(err))
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Username == "" || req.Password == "" {
		http.Error(w, "Username and password are required", http.StatusBadRequest)
		return
	}

	response, err := h.authService.Login(req)
	if err != nil {
		h.logger.Info("Login failed", zap.String("username", req.Username), zap.Error(err))
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	h.logger.Info("User logged in successfully", zap.String("username", req.Username))

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req auth.RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.logger.Error("Failed to decode register request", zap.Error(err))
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Username == "" || req.Email == "" || req.Password == "" {
		http.Error(w, "Username, email, and password are required", http.StatusBadRequest)
		return
	}

	response, err := h.authService.Register(req)
	if err != nil {
		h.logger.Error("Registration failed", zap.String("username", req.Username), zap.Error(err))
		http.Error(w, err.Error(), http.StatusConflict)
		return
	}

	h.logger.Info("User registered successfully", zap.String("username", req.Username))

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	response := map[string]string{
		"message": "Logged out successfully",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
