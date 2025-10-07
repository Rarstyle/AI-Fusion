# AI Fusion - Project Overview

## 🎯 Mission
Turn any phone camera into a real-time AI-powered technique coach for home workouts, providing instant feedback, accurate rep counting, and personalized corrective plans—all processed on-device for complete privacy.

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI/ML**: MediaPipe Pose Landmarker
- **Runtime**: Bun (package manager & runtime)

### Project Structure
```
src/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Landing page
│   ├── layout.tsx           # Root layout
│   ├── exercises/           # Exercise selection
│   ├── workout/[id]/        # Dynamic workout session
│   ├── summary/             # Session results & corrective plan
│   └── not-found.tsx        # 404 page
├── components/              # Reusable React components
│   ├── WorkoutCamera.tsx    # Main camera/detection component
│   ├── LoadingSpinner.tsx   # Loading states
│   └── Badge.tsx            # UI badge component
├── lib/                     # Core business logic
│   ├── poseDetection.ts     # MediaPipe wrapper
│   ├── formAnalysis.ts      # Exercise-specific form checking
│   ├── exercises.ts         # Exercise definitions
│   ├── constants.ts         # Configuration constants
│   └── utils.ts             # Helper functions
└── types/                   # TypeScript type definitions
    └── exercise.ts          # Core types
```

## 🔄 User Flow

### 1. Landing Page (`/`)
- Hero section with value proposition
- Feature highlights (Real-time feedback, smart counting, privacy)
- Supported exercises overview
- CTA to start training

### 2. Exercise Selection (`/exercises`)
- Grid of 5 core exercises
- Exercise details (description, muscles, common errors)
- Camera angle requirements
- Setup tips

### 3. Workout Setup (`/workout/[exerciseId]`)
- Exercise-specific instructions
- Camera positioning guide
- Common errors to watch for
- "Start Workout" button

### 4. Live Workout Session
- Real-time video feed with pose overlay
- Live rep counter (center screen)
- Instant form feedback (top of screen)
- Phase indicator (up/down/neutral)
- "End Session" button

### 5. Session Summary (`/summary`)
- Performance stats (clean reps, accuracy, total cues)
- Personalized corrective plan
- Feedback history
- Options to retry or try new exercise

## 🧠 Core Systems

### Pose Detection System (`poseDetection.ts`)
- Wraps MediaPipe Pose Landmarker
- Tracks 33 body landmarks in real-time
- Runs on GPU for performance
- Returns normalized 3D coordinates

### Form Analysis System (`formAnalysis.ts`)
- Exercise-specific analyzers
- Calculates joint angles and distances
- Tracks movement phases (up/down/neutral)
- Validates rep completion
- Generates form feedback

**Implemented Exercises:**
1. **Squat**: Knee angle, depth, knee tracking, forward lean
2. **Deadlift**: Hip hinge, back position, hip rise timing
3. **Push-up**: Elbow angle, hip alignment, depth
4. **Row**: Scapular retraction, elbow path
5. **Overhead Press**: Bar path, lockout, core stability

### Feedback System
- Real-time cue generation
- Severity levels (info/warning/error)
- Non-blocking UI overlays
- Persistent feedback storage for summary

### Rep Counting System
- Phase-based detection (prevents double-counting)
- Form validation (bad reps don't count)
- Timestamp tracking
- Valid/invalid rep separation

## 🎨 Design System

### Color Palette
- **Background**: Slate 900/800 gradients
- **Primary**: Blue 500 → Purple 600 gradient
- **Success**: Green 400/500
- **Warning**: Yellow 400/500
- **Error**: Red 400/500
- **Text**: White/Gray scale

### Typography
- **Headings**: Bold, 2xl-6xl sizes
- **Body**: Regular, sm-lg sizes
- **Monospace**: For counters/stats

### Components
- Glassmorphism cards (backdrop-blur)
- Gradient buttons with hover effects
- Animated feedback overlays
- Badge system for tags

## 📊 Data Flow

### Workout Session Data
```typescript
{
  exerciseId: ExerciseType;
  reps: RepData[];
  feedback: FormFeedback[];
  endTime: number;
}
```

### Storage
- **SessionStorage**: Temporary workout data
- **No persistent storage**: Privacy-first approach
- **No backend**: All processing client-side

## 🔒 Privacy & Security

### What We Do
✅ Process video locally on device  
✅ Use standard Web APIs (getUserMedia)  
✅ Clear data on session end  
✅ Open source and auditable  

### What We DON'T Do
❌ Upload video to servers  
❌ Store video recordings  
❌ Track user behavior  
❌ Require accounts or login  
❌ Share data with third parties  

## 🚀 Performance Optimizations

1. **GPU Acceleration**: MediaPipe uses WebGL/WebGPU
2. **Efficient Re-renders**: React state management optimized
3. **Debounced Feedback**: Prevents UI thrashing
4. **Lazy Loading**: Components loaded on-demand
5. **CDN Resources**: MediaPipe models from CDN

## 🧪 Testing Strategy

### Manual Testing Checklist
- [ ] Camera permissions work on first visit
- [ ] Pose detection activates and tracks
- [ ] Rep counting increments correctly
- [ ] Form feedback displays appropriately
- [ ] Session data persists to summary
- [ ] Corrective plan generates correctly
- [ ] Navigation works between pages

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ Firefox (MediaPipe support varies)

### Device Testing
- ✅ iOS (iPhone 12+)
- ✅ Android (modern devices)
- ✅ Desktop (webcam)
- ⚠️ Tablets (camera positioning challenging)

## 🔮 Future Enhancements

### v2 Features (Planned)
- [ ] Multiple camera angles (switch mid-workout)
- [ ] Session history and progress tracking
- [ ] Export workout data (CSV/JSON)
- [ ] Additional exercises (lunges, planks, pull-ups)
- [ ] Side-by-side form comparison
- [ ] Voice feedback option
- [ ] Workout programs/routines
- [ ] Social sharing (with privacy controls)

### Technical Debt
- [ ] Add comprehensive unit tests
- [ ] E2E testing with Playwright
- [ ] Performance monitoring
- [ ] Error boundary components
- [ ] Offline support (PWA)
- [ ] Accessibility improvements (WCAG 2.1)

## 📈 Metrics to Track

### User Experience
- Camera initialization success rate
- Pose detection accuracy
- Average session duration
- Rep counting accuracy

### Technical
- Time to interactive (TTI)
- FPS during pose detection
- Memory usage
- Model load time

## 🤝 Contributing

### Development Setup
```bash
bun install
bun run dev
```

### Code Style
- TypeScript strict mode
- ESLint + Prettier
- Semantic component naming
- Functional components with hooks

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Add tests if applicable
4. Ensure typecheck passes
5. Submit PR with description

## 📚 Resources

### Documentation
- [MediaPipe Pose](https://developers.google.com/mediapipe/solutions/vision/pose_landmarker)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Research
- Exercise biomechanics standards
- Physical therapy guidelines
- Computer vision for fitness

---

**Built with ❤️ for athletes, home lifters, and anyone looking to improve their form.**
