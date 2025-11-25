package middleware

import (
	"net/http"
	"time"

	"go.uber.org/zap"
)

// statusRecorder captures HTTP status codes for logging.
type statusRecorder struct {
	http.ResponseWriter
	Status int
}

func (r *statusRecorder) WriteHeader(status int) {
	r.Status = status
	r.ResponseWriter.WriteHeader(status)
}

func LoggingMiddleware(logger *zap.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

			// Track process time
			start := time.Now()

			// Capture status code
			rec := &statusRecorder{
				ResponseWriter: w,
				Status:         http.StatusOK, // default
			}

			// Call next handler
			next.ServeHTTP(rec, r)

			// Log request
			logger.Info("HTTP request",
				zap.String("method", r.Method),
				zap.String("path", r.URL.Path),
				zap.Int("status", rec.Status),
				zap.String("remote_addr", r.RemoteAddr),
				zap.String("user_agent", r.UserAgent()),
				zap.Duration("duration", time.Since(start)),
			)
		})
	}
}
