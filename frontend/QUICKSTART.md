# Quick Start Guide 🚀

Get AI Fusion running in less than 5 minutes!

## Prerequisites

- **Node.js 18+** or **Bun** (recommended)
- Modern web browser (Chrome, Safari, Edge)
- Webcam or phone camera
- 6-8 feet of space

## Installation

```bash
# Clone the repository
git clone <your-repo-url>


# Use npm
npm install
```

## Development

```bash


# use npm
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## First Time Setup

### 1. Allow Camera Permissions
When you start your first workout, the browser will ask for camera access. Click **Allow**.

### 2. Position Yourself
- Stand **6-8 feet** from your device
- Ensure your **full body is visible**
- Use good lighting (face the light source)
- Clear background works best

### 3. Select an Exercise
Try **Push-ups** first - they're easiest to track and require only a side view.

### 4. Follow On-Screen Instructions
- The app will guide you through setup
- Green skeleton overlay = tracking active
- Rep counter shows in center
- Form feedback appears at top

## Testing the App

### Quick Test Flow
1. Home page → Click "Start Training"
2. Select "Push-Up"
3. Position camera (side view)
4. Click "Start Workout"
5. Do 5 push-ups
6. Click "End Session"
7. Review your stats and corrective plan

### All Exercises to Test
- ✅ Squat (side view)
- ✅ Deadlift (side view)
- ✅ Push-Up (side view)
- ✅ Row (front view)
- ✅ Overhead Press (front view)

## Project Structure

```
ai-fusion/
├── src/
│   ├── app/              # Pages (Next.js App Router)
│   │   ├── page.tsx      # Landing page
│   │   ├── exercises/    # Exercise selection
│   │   ├── workout/      # Live workout session
│   │   └── summary/      # Results & corrective plan
│   ├── components/       # Reusable UI components
│   ├── lib/              # Core logic
│   │   ├── exercises.ts        # Exercise definitions
│   │   ├── poseDetection.ts    # MediaPipe wrapper
│   │   ├── formAnalysis.ts     # Form checking logic
│   │   └── utils.ts            # Helper functions
│   └── types/            # TypeScript types
├── public/               # Static assets
└── README.md            # Full documentation
```

## Key Files to Know

### Adding/Editing Exercises
**`src/lib/exercises.ts`** - Exercise definitions and metadata

### Modifying Form Checks
**`src/lib/formAnalysis.ts`** - Exercise-specific analysis logic

### UI Components
**`src/components/WorkoutCamera.tsx`** - Main camera/detection component

### Styling
**`src/app/globals.css`** - Global styles (Tailwind)

## Common Commands

```bash
# Development server
bun run dev

# Type checking
bun run type-check
# or
npx tsc --noEmit

# Linting
bun run lint

# Build for production
bun run build

# Start production server
bun run start

# Format code
bun run format
```

## Environment Variables

No environment variables needed! Everything runs client-side.

## Browser DevTools

### Useful for debugging:

1. **Check camera**: `chrome://settings/content/camera`
2. **Check WebGL**: `chrome://gpu`
3. **Console logs**: Open DevTools (F12) → Console
4. **Network tab**: Monitor MediaPipe model loading

## Troubleshooting Quick Fixes

### Camera not working?
```bash
# Clear browser cache
# Check permissions
# Try incognito mode
```

### Pose not detecting?
- Improve lighting
- Move to correct distance (6-8 feet)
- Clear background
- Ensure full body visible

### Build errors?
```bash
# Clear cache and reinstall
rm -rf node_modules .next
bun install
bun run dev
```

## Next Steps

1. ✅ Get app running locally
2. ✅ Test all 5 exercises
3. ✅ Read [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
4. ✅ Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for optimal camera setup
5. ✅ Review [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) if issues arise

## Development Tips

### Hot Reload
Changes to code automatically refresh the browser (thanks to Next.js).

### TypeScript Errors
Run `bun run type-check` or your IDE will show errors inline.

### Styling
Uses Tailwind CSS - edit classes in JSX, see changes immediately.

### Adding New Exercises
1. Add to `src/lib/exercises.ts`
2. Implement analyzer in `src/lib/formAnalysis.ts`
3. Test thoroughly with different body types

## Performance Tips

- MediaPipe runs on GPU automatically
- First load downloads AI model (~2MB)
- Subsequent loads are cached
- Close other apps for best performance

## Resources

- **MediaPipe Docs**: https://developers.google.com/mediapipe
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## Support

Having issues? Check:
1. [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Browser console for error messages
3. Camera/lighting setup
4. Device compatibility (2020+ recommended)

---

**Happy coding! 💪**

Built with Next.js, TypeScript, MediaPipe, and Tailwind CSS.
