package handler

import (
	"encoding/json"
	"net/http"

	"github.com/Rarstyle/AI-Fusion/internal/middleware"
	"go.uber.org/zap"
)

type ProtectedHandler struct {
	logger *zap.Logger
}

func NewProtectedHandler(logger *zap.Logger) *ProtectedHandler {
	return &ProtectedHandler{
		logger: logger,
	}
}

func (h *ProtectedHandler) ProtectedEndpoint(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Get user from context (set by AuthMiddleware)
	claims, ok := middleware.GetUserFromContext(r.Context())
	if !ok {
		h.logger.Error("Failed to get user from context")
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"message": "This is a protected endpoint",
		"user": map[string]interface{}{
			"id":       claims.UserID,
			"username": claims.Username,
		},
		"timestamp": claims.IssuedAt,
	}

	h.logger.Info("Protected endpoint accessed",
		zap.String("user_id", claims.UserID),
		zap.String("username", claims.Username))

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
