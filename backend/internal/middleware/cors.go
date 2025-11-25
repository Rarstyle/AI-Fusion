package middleware

import (
	"net/http"
)

func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// CORSMiddlewareWithOrigins allows custom origin configuration
// func CORSMiddlewareWithOrigins(allowedOrigins []string) func(http.Handler) http.Handler {
// 	return func(next http.Handler) http.Handler {
// 		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 			origin := r.Header.Get("Origin")

// 			// Check if origin is allowed
// 			allowed := false
// 			for _, allowedOrigin := range allowedOrigins {
// 				if origin == allowedOrigin || allowedOrigin == "*" {
// 					allowed = true
// 					break
// 				}
// 			}

// 			// Set CORS headers
// 			if allowed {
// 				w.Header().Set("Access-Control-Allow-Origin", origin)
// 			}
// 			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH")
// 			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
// 			w.Header().Set("Access-Control-Allow-Credentials", "true")
// 			w.Header().Set("Access-Control-Max-Age", "3600")

// 			// Handle preflight requests
// 			if r.Method == http.MethodOptions {
// 				w.WriteHeader(http.StatusNoContent)
// 				return
// 			}

// 			next.ServeHTTP(w, r)
// 		})
// 	}
// }
