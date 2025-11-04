package video

import (
	"fmt"
	"sync"
)

type Store struct {
	videos     map[string]Video
	userVideos map[string][]string
	mu         sync.RWMutex
}

func NewStore() *Store {
	return &Store{
		videos:     make(map[string]Video),
		userVideos: make(map[string][]string),
	}
}

// Create adds a new video to the store
func (s *Store) Create(video Video) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if _, exists := s.videos[video.ID]; exists {
		return fmt.Errorf("video with ID %s already exists", video.ID)
	}

	s.videos[video.ID] = video

	s.userVideos[video.UserID] = append(s.userVideos[video.UserID], video.ID)

	return nil
}

// GetByID retrieves a video by its ID
func (s *Store) GetByID(id string) (Video, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	video, ok := s.videos[id]
	if !ok {
		return Video{}, fmt.Errorf("video not found")
	}

	return video, nil
}

// GetByUserID retrieves all videos for a specific user
func (s *Store) GetByUserID(userID string) ([]Video, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	videoIDs, ok := s.userVideos[userID]
	if !ok {
		return []Video{}, nil // Return empty slice, not an error
	}

	videos := make([]Video, 0, len(videoIDs))
	for _, videoID := range videoIDs {
		if video, exists := s.videos[videoID]; exists {
			videos = append(videos, video)
		}
	}

	return videos, nil
}

// Delete removes a video from the store
func (s *Store) Delete(id string, userID string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	video, ok := s.videos[id]
	if !ok {
		return fmt.Errorf("video not found")
	}

	if video.UserID != userID {
		return fmt.Errorf("video does not belong to user")
	}

	delete(s.videos, id)

	videoIDs := s.userVideos[userID]
	for i, vidID := range videoIDs {
		if vidID == id {
			s.userVideos[userID] = append(videoIDs[:i], videoIDs[i+1:]...)
			break
		}
	}

	if len(s.userVideos[userID]) == 0 {
		delete(s.userVideos, userID)
	}

	return nil
}

// CountByUserID returns the number of videos for a user
func (s *Store) CountByUserID(userID string) int {
	s.mu.RLock()
	defer s.mu.RUnlock()

	return len(s.userVideos[userID])
}
