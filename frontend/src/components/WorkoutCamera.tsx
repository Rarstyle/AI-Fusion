"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ExerciseType, FormFeedback, RepData } from "@/types/exercise";
import { PoseDetectionService } from "@/lib/poseDetection";
import { FormAnalyzer } from "@/lib/formAnalysis";

interface WorkoutCameraProps {
  exerciseId: ExerciseType;
  onComplete: (reps: RepData[], allFeedback: FormFeedback[]) => void;
}

export default function WorkoutCamera({
  exerciseId,
  onComplete,
}: WorkoutCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [repCount, setRepCount] = useState(0);
  const [currentFeedback, setCurrentFeedback] = useState<FormFeedback[]>([]);
  const [phase, setPhase] = useState<string>("neutral");
  const [isActive, setIsActive] = useState(false);

  const poseServiceRef = useRef<PoseDetectionService | null>(null);
  const formAnalyzerRef = useRef<FormAnalyzer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const allFeedbackRef = useRef<FormFeedback[]>([]);
  const repsDataRef = useRef<RepData[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize camera and pose detection
  useEffect(() => {
    let mounted = true;

    async function setup() {
      try {
        // Request camera access
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user",
          },
          audio: false,
        });

        if (!mounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await new Promise((resolve) => {
            if (videoRef.current) {
              videoRef.current.onloadedmetadata = resolve;
            }
          });
          await videoRef.current.play();
        }

        // Initialize pose detection
        const poseService = new PoseDetectionService();
        await poseService.initialize();
        poseServiceRef.current = poseService;

        // Initialize form analyzer
        formAnalyzerRef.current = new FormAnalyzer(exerciseId);

        if (mounted) {
          setIsLoading(false);
          setIsActive(true);
        }
      } catch (err) {
        console.error("Setup error:", err);
        if (mounted) {
          setError(
            "Failed to access camera or initialize pose detection. Please check permissions.",
          );
          setIsLoading(false);
        }
      }
    }

    setup();

    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (poseServiceRef.current) {
        poseServiceRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [exerciseId]);

  // Detection loop
  useEffect(() => {
    if (
      !isActive ||
      !videoRef.current ||
      !poseServiceRef.current ||
      !formAnalyzerRef.current
    ) {
      return;
    }

    let lastTimestamp = 0;

    async function detectLoop() {
      if (
        !videoRef.current ||
        !poseServiceRef.current ||
        !formAnalyzerRef.current ||
        !isActive
      ) {
        return;
      }

      const video = videoRef.current;
      const now = performance.now();

      try {
        // Detect pose
        const result = await poseServiceRef.current.detectPose(video, now);

        if (result && result.landmarks && result.landmarks.length > 0) {
          const landmarks = result.landmarks[0];

          // Analyze form
          const analysis = formAnalyzerRef.current.analyze(
            landmarks,
            Date.now(),
          );

          // Update feedback
          if (analysis.feedback.length > 0) {
            setCurrentFeedback((prev) => {
              const newFeedback = [...analysis.feedback];
              allFeedbackRef.current.push(...newFeedback);
              return newFeedback;
            });

            // Clear feedback after a delay
            setTimeout(() => {
              setCurrentFeedback([]);
            }, 2000);
          }

          // Update rep count
          if (analysis.repCounted) {
            const newRepCount = formAnalyzerRef.current.getRepCount();
            setRepCount(newRepCount);

            // Store rep data
            repsDataRef.current.push({
              repNumber: newRepCount,
              valid: true,
              feedback: analysis.feedback,
              timestamp: Date.now(),
            });
          }

          // Update phase
          setPhase(analysis.phase);

          // Draw skeleton
          drawSkeleton(landmarks);
        }

        lastTimestamp = now;
      } catch (err) {
        console.error("Detection error:", err);
      }

      animationFrameRef.current = requestAnimationFrame(detectLoop);
    }

    detectLoop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);

  const drawSkeleton = useCallback((landmarks: any[]) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw landmarks
    ctx.fillStyle = "#00FF00";
    landmarks.forEach((landmark) => {
      const x = landmark.x * canvas.width;
      const y = landmark.y * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw connections (simplified)
    ctx.strokeStyle = "#00FF00";
    ctx.lineWidth = 2;
    const connections = [
      [11, 12],
      [11, 13],
      [13, 15],
      [12, 14],
      [14, 16], // Arms
      [11, 23],
      [12, 24],
      [23, 24], // Torso
      [23, 25],
      [25, 27],
      [24, 26],
      [26, 28], // Legs
    ];

    connections.forEach(([start, end]) => {
      const startLandmark = landmarks[start];
      const endLandmark = landmarks[end];
      if (startLandmark && endLandmark) {
        ctx.beginPath();
        ctx.moveTo(
          startLandmark.x * canvas.width,
          startLandmark.y * canvas.height,
        );
        ctx.lineTo(endLandmark.x * canvas.width, endLandmark.y * canvas.height);
        ctx.stroke();
      }
    });
  }, []);

  const handleStop = useCallback(() => {
    setIsActive(false);
    onComplete(repsDataRef.current, allFeedbackRef.current);
  }, [onComplete]);

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center h-screen bg-slate-900"
        data-oid="2hihyhk"
      >
        <div className="text-center" data-oid="oe.mfof">
          <div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            data-oid="z.nf82_"
          ></div>
          <p className="text-white text-lg" data-oid="v0p15jg">
            Initializing camera and AI...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center h-screen bg-slate-900 p-4"
        data-oid="6jd8u80"
      >
        <div className="text-center max-w-md" data-oid="65y86by">
          <div
            className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
            data-oid="n:.p5_n"
          >
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              data-oid="fr5k57q"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
                data-oid="7fb01ap"
              />
            </svg>
          </div>
          <h2
            className="text-xl font-semibold text-white mb-2"
            data-oid="4-66v:-"
          >
            Setup Error
          </h2>
          <p className="text-gray-400 mb-4" data-oid="giniyhg">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            data-oid="jik9a5s"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-screen bg-slate-900 overflow-hidden"
      data-oid="u21w:30"
    >
      {/* Video Feed */}
      <div className="relative w-full h-full" data-oid="16zzk30">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]"
          playsInline
          muted
          data-oid="sd-z8cc"
        />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full transform scale-x-[-1]"
          data-oid="d_1z418"
        />
      </div>

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none" data-oid="asukeiz">
        {/* Top Bar */}
        <div
          className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent"
          data-oid="agi5bm3"
        >
          <div className="flex items-center justify-between" data-oid="djx3bdv">
            <div
              className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full"
              data-oid="05:cv0_"
            >
              <span
                className="text-white text-sm font-medium"
                data-oid="qyhcmy6"
              >
                Phase: {phase}
              </span>
            </div>
            <div
              className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full"
              data-oid="tvyn3nu"
            >
              <span
                className="text-white text-sm font-medium"
                data-oid="vb58-dr"
              >
                Reps: {repCount}
              </span>
            </div>
          </div>
        </div>

        {/* Center - Rep Counter */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          data-oid="xet55vi"
        >
          <div
            className="text-8xl font-bold text-white drop-shadow-2xl"
            data-oid="282awy8"
          >
            {repCount}
          </div>
        </div>

        {/* Feedback Messages */}
        <div
          className="absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4"
          data-oid="ga1lm7a"
        >
          {currentFeedback.map((feedback, index) => (
            <div
              key={`${feedback.timestamp}-${index}`}
              className={`mb-2 p-4 rounded-lg backdrop-blur-md animate-fade-in ${
                feedback.severity === "error"
                  ? "bg-red-500/80"
                  : feedback.severity === "warning"
                    ? "bg-yellow-500/80"
                    : "bg-green-500/80"
              }`}
              data-oid="ykjn:0h"
            >
              <p
                className="text-white font-semibold text-center"
                data-oid="efjyr2t"
              >
                {feedback.message}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Controls */}
        <div
          className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/50 to-transparent"
          data-oid="uf8vhh0"
        >
          <div
            className="flex items-center justify-center gap-4"
            data-oid="8kjst_a"
          >
            <button
              onClick={handleStop}
              className="pointer-events-auto px-8 py-4 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors shadow-lg"
              data-oid="j:y.uze"
            >
              End Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
