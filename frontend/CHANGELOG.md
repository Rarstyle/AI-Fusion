# Changelog

All notable changes to FormCoach AI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-10-07

### 🎉 Initial Release

#### Added
- **Landing Page**
  - Hero section with value proposition
  - Feature highlights
  - Exercise overview
  - Call-to-action buttons

- **Exercise Selection**
  - 5 core exercises (Squat, Deadlift, Push-Up, Row, Overhead Press)
  - Exercise cards with details
  - Target muscle groups
  - Common errors preview
  - Camera angle requirements

- **Live Workout Session**
  - Real-time pose detection using MediaPipe
  - Live video feed with skeleton overlay
  - Real-time form feedback
  - Smart rep counting (only valid reps count)
  - Phase detection (up/down/neutral)
  - Visual feedback overlays

- **Session Summary**
  - Performance statistics
  - Clean rep count and accuracy
  - Personalized corrective plan
  - Feedback history
  - Next session recommendations

- **Form Analysis**
  - Squat: Knee tracking, depth, forward lean detection
  - Deadlift: Hip hinge, back position analysis
  - Push-Up: Elbow angle, hip alignment
  - Row: Scapular retraction, elbow path
  - Overhead Press: Bar path, lockout detection

- **Components**
  - WorkoutCamera: Main camera and detection component
  - LoadingSpinner: Reusable loading states
  - Badge: UI badge component
  - Not Found: Custom 404 page

- **Documentation**
  - README.md: Project overview and installation
  - QUICKSTART.md: 5-minute setup guide
  - SETUP_GUIDE.md: Camera setup instructions
  - TROUBLESHOOTING.md: Common issues and solutions
  - PROJECT_OVERVIEW.md: Technical architecture

#### Features
- ✅ On-device processing (privacy-first)
- ✅ No video uploads or storage
- ✅ No account required
- ✅ Real-time feedback (< 100ms latency)
- ✅ GPU-accelerated pose detection
- ✅ Mobile and desktop support
- ✅ Responsive design
- ✅ Dark mode UI

#### Technical Stack
- Next.js 15 (App Router)
- TypeScript 5
- React 19
- Tailwind CSS 3.4
- MediaPipe Pose Landmarker
- Bun runtime

### Security
- All video processing happens client-side
- No backend or server storage
- Camera access only during workout
- Session data cleared on completion

---

## [Unreleased]

### Planned Features
- [ ] Progress tracking across sessions
- [ ] Multiple camera angles
- [ ] Export workout data
- [ ] Additional exercises (lunges, planks, pull-ups)
- [ ] Voice feedback option
- [ ] Workout programs/routines
- [ ] Form comparison with ideal technique
- [ ] Offline PWA support
- [ ] Accessibility improvements

### Under Consideration
- [ ] Social features (leaderboards, sharing)
- [ ] Integration with fitness apps
- [ ] Premium features (coaching, programs)
- [ ] Mobile native apps
- [ ] Wearable device integration

---

## Version History

### Version Numbering
- **Major** (X.0.0): Breaking changes, major new features
- **Minor** (0.X.0): New features, backwards compatible
- **Patch** (0.0.X): Bug fixes, minor improvements

### Deprecation Policy
- Features marked as deprecated will be removed in next major version
- At least 2 minor versions notice before removal
- Migration guides provided for breaking changes

---

## Contributing

See [README.md](./README.md) for contribution guidelines.

## Support

For issues and questions:
- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Review [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- Open an issue on GitHub
