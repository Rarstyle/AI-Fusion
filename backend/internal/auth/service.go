package auth

import (
	"errors"
	"fmt"
	"time"

	"github.com/Rarstyle/AI-Fusion/internal/config"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	store *Store
	cfg   *config.AuthConfig
}

func NewService(store *Store, cfg *config.AuthConfig) *Service {
	return &Service{store: store, cfg: cfg}
}

func (s *Service) Login(req LoginRequest) (LoginResponse, error) {
	user, err := s.store.GetUserByUsername(req.Username)
	if err != nil {
		return LoginResponse{}, errors.New("invalid credentials")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		return LoginResponse{}, errors.New("invalid credentials")
	}

	token, err := s.generateToken(user)
	if err != nil {
		return LoginResponse{}, fmt.Errorf("failed to generate token: %w", err)
	}

	user.Password = ""

	return LoginResponse{
		Token: token,
		User:  user,
	}, nil
}

func (s *Service) Register(req RegisterRequest) (RegisterResponse, error) {
	_, err := s.store.GetUserByUsername(req.Username)
	if err == nil {
		return RegisterResponse{}, errors.New("username already exists")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), s.cfg.BCryptCost)
	if err != nil {
		return RegisterResponse{}, fmt.Errorf("failed to hash password: %w", err)
	}

	user := User{
		ID:       uuid.New().String(),
		Username: req.Username,
		Email:    req.Email,
		Password: string(hashedPassword),
	}

	err = s.store.CreateUser(user)
	if err != nil {
		return RegisterResponse{}, fmt.Errorf("failed to create user: %w", err)
	}

	user.Password = ""

	return RegisterResponse{
		Success: true,
		User:    user,
	}, nil
}

func (s *Service) ValidateToken(tokenString string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(s.cfg.JWTSecret), nil
	})

	if err != nil {
		return nil, fmt.Errorf("failed to parse token: %w", err)
	}

	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}

func (s *Service) generateToken(user User) (string, error) {
	claims := &Claims{
		UserID:   user.ID,
		Username: user.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Duration(s.cfg.JWTExpiration) * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
			Issuer:    "ai-fusion",
			Subject:   user.ID,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(s.cfg.JWTSecret))
}
