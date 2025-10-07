package auth

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

type Store struct {
	users map[string]User
}

func NewStore() *Store {
	store := &Store{users: make(map[string]User)}
	store.initializeTestUsers()
	return store
}

func (s *Store) initializeTestUsers() {
	testUsers := []struct {
		id       string
		username string
		email    string
		password string
	}{
		{"1", "admin", "admin@example.com", "admin"},
		{"2", "user", "user@example.com", "user"},
		{"3", "test", "test@example.com", "test123"},
	}

	for _, tu := range testUsers {
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(tu.password), 12)

		user := User{
			ID:       tu.id,
			Username: tu.username,
			Email:    tu.email,
			Password: string(hashedPassword),
		}
		s.users[tu.id] = user
	}
}

func (s *Store) CreateUser(user User) error {
	s.users[user.ID] = user
	return nil
}

func (s *Store) GetUser(id string) (User, error) {
	user, ok := s.users[id]
	if !ok {
		return User{}, fmt.Errorf("user not found")
	}
	return user, nil
}

func (s *Store) GetUserByUsername(username string) (User, error) {
	for _, user := range s.users {
		if user.Username == username {
			return user, nil
		}
	}
	return User{}, fmt.Errorf("user not found")
}
