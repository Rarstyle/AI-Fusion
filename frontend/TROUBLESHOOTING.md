# Troubleshooting Guide 🔧

## Common Issues & Solutions

### Camera Not Working

#### Issue: "Camera permission denied"
**Solution:**
1. Check browser permissions:
   - Chrome: Click lock icon in address bar → Site settings → Camera → Allow
   - Safari: Preferences → Websites → Camera → Allow
2. Reload the page
3. Try a different browser if issue persists

#### Issue: "No camera detected"
**Solution:**
- Ensure camera is not being used by another app
- Restart browser
- Check if camera works in other apps
- Try USB camera if built-in camera fails

#### Issue: Black screen or frozen video
**Solution:**
- Refresh the page
- Clear browser cache
- Update browser to latest version
- Check camera drivers (desktop)

---

### Pose Detection Issues

#### Issue: "No pose detected" message
**Causes & Solutions:**

1. **Too far from camera**
   - Move 6-8 feet away
   - Ensure full body is visible

2. **Poor lighting**
   - Face a light source
   - Avoid backlighting
   - Turn on more lights

3. **Busy background**
   - Use solid-colored wall
   - Remove clutter
   - Avoid mirrors

4. **Clothing issues**
   - Wear form-fitting clothes
   - Use contrasting colors vs background
   - Avoid patterns

#### Issue: Tracking is jittery or inconsistent
**Solutions:**
- Improve lighting conditions
- Reduce motion blur (move slower)
- Clear background
- Ensure stable camera mount
- Close other resource-intensive apps

---

### Rep Counting Problems

#### Issue: Reps not counting
**Possible causes:**

1. **Incomplete range of motion**
   - Go deeper on squats/push-ups
   - Full lockout on overhead press
   - Complete the movement pattern

2. **Wrong camera angle**
   - Verify correct view (side vs front)
   - Reposition camera perpendicular/facing

3. **Moving too fast**
   - Slow down to 2-3 seconds per rep
   - Controlled tempo helps detection

#### Issue: Double counting reps
**Solutions:**
- Complete full range before starting next rep
- Ensure smooth transitions between reps
- Maintain consistent tempo

#### Issue: Invalid reps not getting feedback
**Note:** This is intentional! The system:
- Counts only "clean" reps
- Provides feedback on form errors
- Invalid reps don't increment counter

---

### Performance Issues

#### Issue: Laggy video or low FPS
**Solutions:**
1. **Close other apps/tabs**
   - Free up system resources
   - Close video/gaming apps

2. **Lower video quality**
   - Browser may auto-adjust
   - Try mobile device vs desktop

3. **Check internet**
   - Initial model download needs connection
   - After load, works offline

4. **Device limitations**
   - Minimum: 4GB RAM, 2020+ device
   - Older devices may struggle

#### Issue: Long loading time
**Normal loading steps:**
1. Camera initialization (2-5 seconds)
2. AI model download (5-15 seconds first time)
3. Model initialization (2-3 seconds)

**If stuck:**
- Check internet connection
- Clear browser cache
- Try incognito/private mode

---

### UI/UX Issues

#### Issue: Feedback messages too fast/slow
**Note:** Feedback displays for 2 seconds by default
- Multiple cues will stack
- Check session summary for full history

#### Issue: Can't see rep counter
**Solutions:**
- Ensure sufficient contrast (lighting)
- Rep counter is center screen
- Try adjusting phone brightness

#### Issue: Session summary not showing
**Cause:** Browser refresh before completing session
**Prevention:** 
- Use "End Session" button
- Don't refresh during workout
- Data stored in sessionStorage (temporary)

---

### Browser-Specific Issues

#### Safari (iOS/Mac)
- **Issue:** MediaPipe performance
- **Solution:** Safari 14+ required, works best on iOS 15+

#### Firefox
- **Issue:** Limited MediaPipe support
- **Solution:** Use Chrome/Edge for best experience

#### Chrome Mobile
- **Issue:** Background tab pauses
- **Solution:** Keep app in foreground during workout

---

### Exercise-Specific Tips

#### Squat Not Detecting
- Ensure full side profile
- Hip must go below knee level
- Keep knees visible

#### Deadlift Issues
- Side view essential
- Hip hinge must be visible
- Maintain clear torso view

#### Push-Up Not Counting
- Side view required
- Chest must lower significantly
- Keep body straight (plank)

#### Row Detection
- Face camera directly
- Pull elbows behind torso
- Stable lower body

#### Overhead Press
- Front view required
- Full lockout overhead
- Bar path must be visible

---

## Error Messages Explained

### "Failed to initialize pose detection"
**Meaning:** MediaPipe couldn't load
**Fix:**
1. Check internet connection
2. Try different browser
3. Clear cache and retry
4. Verify WebGL support: chrome://gpu

### "Camera access required"
**Meaning:** Permissions not granted
**Fix:** Allow camera in browser settings

### "Browser not supported"
**Meaning:** Old browser version
**Fix:** Update to latest Chrome, Safari, or Edge

---

## Still Need Help?

### Before Reporting an Issue:
1. ✅ Try a different browser
2. ✅ Test camera in other apps
3. ✅ Check setup guide (SETUP_GUIDE.md)
4. ✅ Review this troubleshooting guide
5. ✅ Try incognito/private mode

### System Information to Include:
- Browser and version
- Device model
- Operating system
- Specific exercise attempted
- Error messages (screenshot if possible)

### Known Limitations:
- Requires modern device (2020+)
- WebGL/GPU acceleration needed
- Good lighting essential
- Clear line of sight to camera
- Some exercises harder to track than others

---

## Quick Checklist ✓

Before starting a workout session:

- [ ] Camera working in browser
- [ ] 6-8 feet from camera
- [ ] Full body visible
- [ ] Good lighting
- [ ] Clear background
- [ ] Correct camera angle for exercise
- [ ] No other apps using camera
- [ ] Browser updated
- [ ] Stable camera mount

---

**Most issues are solved by:**
1. Better lighting 💡
2. Correct camera angle 📹
3. Proper distance 📏
4. Browser permissions ✅
