# AI Fusion 🏋️

Transform your phone camera into a real-time AI-powered technique coach for core exercises. Get instant feedback, accurate rep counting, and personalized corrective plans—all processed on your device for complete privacy.

## 🎯 Features

- **Real-Time Form Analysis**: Instant feedback on your technique as you perform each rep
- **Smart Rep Counting**: Only clean reps count; bad form gets called out immediately
- **Privacy-First**: All processing happens on your device—no video uploads
- **5 Core Exercises**: Squat, Deadlift/Hip Hinge, Push-Up, Row, Overhead Press
- **Corrective Plans**: Get personalized exercise recommendations based on your form issues

## 🚀 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern, utility-first styling
- **MediaPipe** - On-device pose detection AI
- **Bun** - Fast JavaScript runtime & package manager

## 📋 Prerequisites

- Node.js 18+ or Bun
- Modern web browser with camera access
- 6-8 feet of space in front of your device

## 🛠️ Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-fusion

# Install dependencies
bun install

# Run development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📱 Usage

1. **Select Exercise**: Choose from 5 core exercises
2. **Setup Camera**: Position your device 6-8 feet away with full body visible
3. **Start Training**: Get real-time feedback as you perform each rep
4. **Review Results**: See your stats and personalized corrective plan

## 🎨 Key Components

### Landing Page (`/`)
- Hero section with value proposition
- Feature highlights
- Exercise overview

### Exercise Selection (`/exercises`)
- Browse all available exercises
- View target muscles and common errors
- Setup instructions

### Workout Session (`/workout/[exerciseId]`)
- Real-time camera feed with pose detection
- Live form feedback overlay
- Rep counting with phase detection
- Visual skeleton tracking

### Session Summary (`/summary`)
- Performance statistics
- Personalized corrective plan
- Detailed feedback history
- Next session recommendations

## 🧠 How It Works

1. **Pose Detection**: MediaPipe tracks 33 body landmarks in real-time
2. **Form Analysis**: Custom algorithms analyze joint angles and positions
3. **Feedback Generation**: Issues are detected and communicated instantly
4. **Rep Validation**: Only technically sound reps increment the counter
5. **Plan Generation**: Common errors are mapped to corrective exercises

## 🎯 Supported Exercises

| Exercise | Camera Angle | Key Metrics |
|----------|-------------|-------------|
| Squat | Side | Knee angle, hip depth, knee tracking |
| Deadlift | Side | Hip hinge, back position, bar path |
| Push-Up | Side | Elbow angle, body alignment, ROM |
| Row | Front | Scapular retraction, elbow path |
| Overhead Press | Front | Bar path, lockout, core stability |

## 🔒 Privacy & Security

- ✅ All video processing happens on your device
- ✅ No video data is uploaded to servers
- ✅ No account or login required
- ✅ Camera access is only used during workout sessions

## 🎨 Customization

### Adding New Exercises

1. Add exercise definition in `src/lib/exercises.ts`
2. Implement form analysis logic in `src/lib/formAnalysis.ts`
3. Add corrective plan mappings in `src/app/summary/page.tsx`

### Styling

All styles use Tailwind CSS. Global styles are in `src/app/globals.css`.

## 🚧 Roadmap

- [ ] Multi-angle support (switch between front/side)
- [ ] Progress tracking over multiple sessions
- [ ] Export session data
- [ ] Additional exercises (lunges, planks, etc.)
- [ ] Form comparison with ideal technique
- [ ] Voice feedback option
- [ ] Workout programs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- MediaPipe for the excellent pose detection model
- Next.js team for the fantastic framework
- Tailwind CSS for the utility-first styling approach

---

Built with ❤️ for home lifters, PT clients, and coaches everywhere.
