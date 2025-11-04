(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/lib/poseDetection.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PoseDetectionService",
    ()=>PoseDetectionService,
    "PoseLandmarkIndices",
    ()=>PoseLandmarkIndices,
    "calculateAngle",
    ()=>calculateAngle,
    "calculateDistance",
    ()=>calculateDistance,
    "isLandmarkVisible",
    ()=>isLandmarkVisible
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$mediapipe$2f$tasks$2d$vision$2f$vision_bundle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@mediapipe/tasks-vision/vision_bundle.mjs [app-client] (ecmascript)");
;
;
class PoseDetectionService {
    async initialize() {
        if (this.initialized) return;
        try {
            const vision = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$mediapipe$2f$tasks$2d$vision$2f$vision_bundle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilesetResolver"].forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");
            this.poseLandmarker = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$mediapipe$2f$tasks$2d$vision$2f$vision_bundle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarker"].createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
                    delegate: "GPU"
                },
                runningMode: "VIDEO",
                numPoses: 1,
                minPoseDetectionConfidence: 0.5,
                minPosePresenceConfidence: 0.5,
                minTrackingConfidence: 0.5
            });
            this.initialized = true;
        } catch (error) {
            console.error("Failed to initialize pose detection:", error);
            throw error;
        }
    }
    async detectPose(video, timestamp) {
        if (!this.poseLandmarker || !this.initialized) {
            throw new Error("Pose detection not initialized");
        }
        try {
            return this.poseLandmarker.detectForVideo(video, timestamp);
        } catch (error) {
            console.error("Error detecting pose:", error);
            return null;
        }
    }
    close() {
        if (this.poseLandmarker) {
            this.poseLandmarker.close();
            this.poseLandmarker = null;
            this.initialized = false;
        }
    }
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "poseLandmarker", null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "initialized", false);
    }
}
function calculateAngle(a, b, c) {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs(radians * 180.0 / Math.PI);
    if (angle > 180.0) {
        angle = 360 - angle;
    }
    return angle;
}
function calculateDistance(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) + Math.pow(b.z - a.z, 2));
}
function isLandmarkVisible(landmark) {
    let threshold = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.5;
    return landmark.visibility !== undefined && landmark.visibility > threshold;
}
const PoseLandmarkIndices = {
    NOSE: 0,
    LEFT_EYE_INNER: 1,
    LEFT_EYE: 2,
    LEFT_EYE_OUTER: 3,
    RIGHT_EYE_INNER: 4,
    RIGHT_EYE: 5,
    RIGHT_EYE_OUTER: 6,
    LEFT_EAR: 7,
    RIGHT_EAR: 8,
    MOUTH_LEFT: 9,
    MOUTH_RIGHT: 10,
    LEFT_SHOULDER: 11,
    RIGHT_SHOULDER: 12,
    LEFT_ELBOW: 13,
    RIGHT_ELBOW: 14,
    LEFT_WRIST: 15,
    RIGHT_WRIST: 16,
    LEFT_PINKY: 17,
    RIGHT_PINKY: 18,
    LEFT_INDEX: 19,
    RIGHT_INDEX: 20,
    LEFT_THUMB: 21,
    RIGHT_THUMB: 22,
    LEFT_HIP: 23,
    RIGHT_HIP: 24,
    LEFT_KNEE: 25,
    RIGHT_KNEE: 26,
    LEFT_ANKLE: 27,
    RIGHT_ANKLE: 28,
    LEFT_HEEL: 29,
    RIGHT_HEEL: 30,
    LEFT_FOOT_INDEX: 31,
    RIGHT_FOOT_INDEX: 32
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/lib/formAnalysis.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormAnalyzer",
    ()=>FormAnalyzer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/poseDetection.ts [app-client] (ecmascript)");
;
;
class FormAnalyzer {
    reset() {
        this.state = {
            phase: "neutral",
            repCount: 0,
            lastPhaseChange: Date.now()
        };
    }
    analyze(landmarks, timestamp) {
        switch(this.exerciseType){
            case "squat":
                return this.analyzeSquat(landmarks, timestamp);
            case "deadlift":
                return this.analyzeDeadlift(landmarks, timestamp);
            case "pushup":
                return this.analyzePushup(landmarks, timestamp);
            case "row":
                return this.analyzeRow(landmarks, timestamp);
            case "overhead-press":
                return this.analyzeOverheadPress(landmarks, timestamp);
            default:
                return {
                    feedback: [],
                    repCounted: false,
                    phase: "neutral"
                };
        }
    }
    analyzeSquat(landmarks, timestamp) {
        const feedback = [];
        let repCounted = false;
        // Get key landmarks
        const leftHip = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].LEFT_HIP];
        const leftKnee = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].LEFT_KNEE];
        const leftAnkle = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].LEFT_ANKLE];
        const rightKnee = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].RIGHT_KNEE];
        const leftShoulder = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].LEFT_SHOULDER];
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLandmarkVisible"])(leftHip) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLandmarkVisible"])(leftKnee) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLandmarkVisible"])(leftAnkle)) {
            return {
                feedback,
                repCounted,
                phase: this.state.phase
            };
        }
        // Calculate knee angle
        const kneeAngle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateAngle"])(leftHip, leftKnee, leftAnkle);
        // Track min angle during descent
        if (!this.state.minAngleThisRep || kneeAngle < this.state.minAngleThisRep) {
            this.state.minAngleThisRep = kneeAngle;
        }
        // Check for depth
        const hipBelowKnee = leftHip.y > leftKnee.y;
        // Phase detection
        if (kneeAngle < 100 && this.state.phase !== "down") {
            this.state.phase = "down";
            this.state.lastPhaseChange = timestamp;
        } else if (kneeAngle > 160 && this.state.phase === "down") {
            // Rep completed
            if (this.state.minAngleThisRep && this.state.minAngleThisRep < 100) {
                this.state.repCount++;
                repCounted = true;
                feedback.push({
                    timestamp,
                    message: "✓ Good rep",
                    severity: "info",
                    type: "rep_counted"
                });
            } else {
                feedback.push({
                    timestamp,
                    message: "Insufficient depth",
                    severity: "warning",
                    type: "depth"
                });
            }
            this.state.phase = "up";
            this.state.minAngleThisRep = undefined;
        }
        // Form checks
        // Check knee valgus (knees caving)
        const kneeDistance = Math.abs(leftKnee.x - rightKnee.x);
        const hipDistance = Math.abs(leftHip.x - landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].RIGHT_HIP].x);
        if (kneeDistance < hipDistance * 0.8 && this.state.phase === "down") {
            feedback.push({
                timestamp,
                message: "⚠️ Knees caving inward",
                severity: "warning",
                type: "knee_valgus"
            });
        }
        // Check forward lean (simplified)
        const shoulderToHipAngle = Math.abs(leftShoulder.x - leftHip.x);
        if (shoulderToHipAngle > 0.15 && this.state.phase === "down") {
            feedback.push({
                timestamp,
                message: "⚠️ Excessive forward lean",
                severity: "warning",
                type: "forward_lean"
            });
        }
        return {
            feedback,
            repCounted,
            phase: this.state.phase
        };
    }
    analyzeDeadlift(landmarks, timestamp) {
        const feedback = [];
        let repCounted = false;
        const leftHip = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].LEFT_HIP];
        const leftShoulder = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].LEFT_SHOULDER];
        const leftKnee = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].LEFT_KNEE];
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLandmarkVisible"])(leftHip) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLandmarkVisible"])(leftShoulder)) {
            return {
                feedback,
                repCounted,
                phase: this.state.phase
            };
        }
        // Hip angle for phase detection
        const hipHeight = leftHip.y;
        if (hipHeight < 0.6 && this.state.phase !== "down") {
            this.state.phase = "down";
            this.state.lastPhaseChange = timestamp;
        } else if (hipHeight > 0.8 && this.state.phase === "down") {
            this.state.repCount++;
            repCounted = true;
            this.state.phase = "up";
            feedback.push({
                timestamp,
                message: "✓ Rep completed",
                severity: "info",
                type: "rep_counted"
            });
        }
        // Check back rounding (simplified - shoulder ahead of hip)
        const backAngle = Math.abs(leftShoulder.x - leftHip.x);
        if (backAngle > 0.2 && this.state.phase === "down") {
            feedback.push({
                timestamp,
                message: "⚠️ Keep back neutral",
                severity: "warning",
                type: "back_rounding"
            });
        }
        return {
            feedback,
            repCounted,
            phase: this.state.phase
        };
    }
    analyzePushup(landmarks, timestamp) {
        const feedback = [];
        let repCounted = false;
        const leftShoulder = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].LEFT_SHOULDER];
        const leftElbow = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].LEFT_ELBOW];
        const leftWrist = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].LEFT_WRIST];
        const leftHip = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].LEFT_HIP];
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLandmarkVisible"])(leftShoulder) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLandmarkVisible"])(leftElbow) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLandmarkVisible"])(leftWrist)) {
            return {
                feedback,
                repCounted,
                phase: this.state.phase
            };
        }
        // Calculate elbow angle
        const elbowAngle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateAngle"])(leftShoulder, leftElbow, leftWrist);
        // Track angles
        if (!this.state.minAngleThisRep || elbowAngle < this.state.minAngleThisRep) {
            this.state.minAngleThisRep = elbowAngle;
        }
        // Phase detection
        if (elbowAngle < 90 && this.state.phase !== "down") {
            this.state.phase = "down";
            this.state.lastPhaseChange = timestamp;
        } else if (elbowAngle > 160 && this.state.phase === "down") {
            if (this.state.minAngleThisRep && this.state.minAngleThisRep < 90) {
                this.state.repCount++;
                repCounted = true;
                feedback.push({
                    timestamp,
                    message: "✓ Good rep",
                    severity: "info",
                    type: "rep_counted"
                });
            } else {
                feedback.push({
                    timestamp,
                    message: "Go deeper",
                    severity: "warning",
                    type: "depth"
                });
            }
            this.state.phase = "up";
            this.state.minAngleThisRep = undefined;
        }
        // Check for sagging hips
        const shoulderHipDistance = Math.abs(leftShoulder.y - leftHip.y);
        if (shoulderHipDistance < 0.15) {
            feedback.push({
                timestamp,
                message: "⚠️ Hips sagging",
                severity: "warning",
                type: "hip_sag"
            });
        }
        return {
            feedback,
            repCounted,
            phase: this.state.phase
        };
    }
    analyzeRow(landmarks, timestamp) {
        const feedback = [];
        let repCounted = false;
        const leftShoulder = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].LEFT_SHOULDER];
        const leftElbow = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].LEFT_ELBOW];
        const leftWrist = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].LEFT_WRIST];
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLandmarkVisible"])(leftShoulder) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLandmarkVisible"])(leftElbow) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLandmarkVisible"])(leftWrist)) {
            return {
                feedback,
                repCounted,
                phase: this.state.phase
            };
        }
        // Simple elbow position tracking
        const elbowBehindShoulder = leftElbow.x < leftShoulder.x - 0.1;
        if (elbowBehindShoulder && this.state.phase !== "down") {
            this.state.phase = "down";
            this.state.lastPhaseChange = timestamp;
        } else if (!elbowBehindShoulder && this.state.phase === "down") {
            this.state.repCount++;
            repCounted = true;
            this.state.phase = "up";
            feedback.push({
                timestamp,
                message: "✓ Rep completed",
                severity: "info",
                type: "rep_counted"
            });
        }
        return {
            feedback,
            repCounted,
            phase: this.state.phase
        };
    }
    analyzeOverheadPress(landmarks, timestamp) {
        const feedback = [];
        let repCounted = false;
        const leftShoulder = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].LEFT_SHOULDER];
        const leftElbow = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].LEFT_ELBOW];
        const leftWrist = landmarks[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseLandmarkIndices"].LEFT_WRIST];
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLandmarkVisible"])(leftShoulder) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLandmarkVisible"])(leftElbow) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLandmarkVisible"])(leftWrist)) {
            return {
                feedback,
                repCounted,
                phase: this.state.phase
            };
        }
        const elbowAngle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateAngle"])(leftShoulder, leftElbow, leftWrist);
        // Arms overhead (locked out)
        if (leftWrist.y < leftShoulder.y - 0.2 && elbowAngle > 160 && this.state.phase !== "up") {
            this.state.phase = "up";
            this.state.lastPhaseChange = timestamp;
        } else if (leftWrist.y > leftShoulder.y && this.state.phase === "up") {
            this.state.repCount++;
            repCounted = true;
            this.state.phase = "down";
            feedback.push({
                timestamp,
                message: "✓ Rep completed",
                severity: "info",
                type: "rep_counted"
            });
        }
        return {
            feedback,
            repCounted,
            phase: this.state.phase
        };
    }
    getRepCount() {
        return this.state.repCount;
    }
    constructor(exerciseType){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "state", {
            phase: "neutral",
            repCount: 0,
            lastPhaseChange: Date.now()
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "exerciseType", void 0);
        this.exerciseType = exerciseType;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/WorkoutCamera.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkoutCamera
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/poseDetection.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$formAnalysis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/formAnalysis.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function WorkoutCamera(param) {
    let { exerciseId, onComplete } = param;
    _s();
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [repCount, setRepCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currentFeedback, setCurrentFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("neutral");
    const [isActive, setIsActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const poseServiceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const formAnalyzerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animationFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const allFeedbackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const repsDataRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const streamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Initialize camera and pose detection
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkoutCamera.useEffect": ()=>{
            let mounted = true;
            async function setup() {
                try {
                    // Request camera access
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: {
                            width: {
                                ideal: 1280
                            },
                            height: {
                                ideal: 720
                            },
                            facingMode: "user"
                        },
                        audio: false
                    });
                    if (!mounted) {
                        stream.getTracks().forEach({
                            "WorkoutCamera.useEffect.setup": (track)=>track.stop()
                        }["WorkoutCamera.useEffect.setup"]);
                        return;
                    }
                    streamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        await new Promise({
                            "WorkoutCamera.useEffect.setup": (resolve)=>{
                                if (videoRef.current) {
                                    videoRef.current.onloadedmetadata = resolve;
                                }
                            }
                        }["WorkoutCamera.useEffect.setup"]);
                        await videoRef.current.play();
                    }
                    // Initialize pose detection
                    const poseService = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$poseDetection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoseDetectionService"]();
                    await poseService.initialize();
                    poseServiceRef.current = poseService;
                    // Initialize form analyzer
                    formAnalyzerRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$formAnalysis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormAnalyzer"](exerciseId);
                    if (mounted) {
                        setIsLoading(false);
                        setIsActive(true);
                    }
                } catch (err) {
                    console.error("Setup error:", err);
                    if (mounted) {
                        setError("Failed to access camera or initialize pose detection. Please check permissions.");
                        setIsLoading(false);
                    }
                }
            }
            setup();
            return ({
                "WorkoutCamera.useEffect": ()=>{
                    mounted = false;
                    if (streamRef.current) {
                        streamRef.current.getTracks().forEach({
                            "WorkoutCamera.useEffect": (track)=>track.stop()
                        }["WorkoutCamera.useEffect"]);
                    }
                    if (poseServiceRef.current) {
                        poseServiceRef.current.close();
                    }
                    if (animationFrameRef.current) {
                        cancelAnimationFrame(animationFrameRef.current);
                    }
                }
            })["WorkoutCamera.useEffect"];
        }
    }["WorkoutCamera.useEffect"], [
        exerciseId
    ]);
    // Detection loop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkoutCamera.useEffect": ()=>{
            if (!isActive || !videoRef.current || !poseServiceRef.current || !formAnalyzerRef.current) {
                return;
            }
            let lastTimestamp = 0;
            async function detectLoop() {
                if (!videoRef.current || !poseServiceRef.current || !formAnalyzerRef.current || !isActive) {
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
                        const analysis = formAnalyzerRef.current.analyze(landmarks, Date.now());
                        // Update feedback
                        if (analysis.feedback.length > 0) {
                            setCurrentFeedback({
                                "WorkoutCamera.useEffect.detectLoop": (prev)=>{
                                    const newFeedback = [
                                        ...analysis.feedback
                                    ];
                                    allFeedbackRef.current.push(...newFeedback);
                                    return newFeedback;
                                }
                            }["WorkoutCamera.useEffect.detectLoop"]);
                            // Clear feedback after a delay
                            setTimeout({
                                "WorkoutCamera.useEffect.detectLoop": ()=>{
                                    setCurrentFeedback([]);
                                }
                            }["WorkoutCamera.useEffect.detectLoop"], 2000);
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
                                timestamp: Date.now()
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
            return ({
                "WorkoutCamera.useEffect": ()=>{
                    if (animationFrameRef.current) {
                        cancelAnimationFrame(animationFrameRef.current);
                    }
                }
            })["WorkoutCamera.useEffect"];
        }
    }["WorkoutCamera.useEffect"], [
        isActive
    ]);
    const drawSkeleton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkoutCamera.useCallback[drawSkeleton]": (landmarks)=>{
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
            landmarks.forEach({
                "WorkoutCamera.useCallback[drawSkeleton]": (landmark)=>{
                    const x = landmark.x * canvas.width;
                    const y = landmark.y * canvas.height;
                    ctx.beginPath();
                    ctx.arc(x, y, 5, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }["WorkoutCamera.useCallback[drawSkeleton]"]);
            // Draw connections (simplified)
            ctx.strokeStyle = "#00FF00";
            ctx.lineWidth = 2;
            const connections = [
                [
                    11,
                    12
                ],
                [
                    11,
                    13
                ],
                [
                    13,
                    15
                ],
                [
                    12,
                    14
                ],
                [
                    14,
                    16
                ],
                [
                    11,
                    23
                ],
                [
                    12,
                    24
                ],
                [
                    23,
                    24
                ],
                [
                    23,
                    25
                ],
                [
                    25,
                    27
                ],
                [
                    24,
                    26
                ],
                [
                    26,
                    28
                ]
            ];
            connections.forEach({
                "WorkoutCamera.useCallback[drawSkeleton]": (param)=>{
                    let [start, end] = param;
                    const startLandmark = landmarks[start];
                    const endLandmark = landmarks[end];
                    if (startLandmark && endLandmark) {
                        ctx.beginPath();
                        ctx.moveTo(startLandmark.x * canvas.width, startLandmark.y * canvas.height);
                        ctx.lineTo(endLandmark.x * canvas.width, endLandmark.y * canvas.height);
                        ctx.stroke();
                    }
                }
            }["WorkoutCamera.useCallback[drawSkeleton]"]);
        }
    }["WorkoutCamera.useCallback[drawSkeleton]"], []);
    const handleStop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkoutCamera.useCallback[handleStop]": ()=>{
            setIsActive(false);
            onComplete(repsDataRef.current, allFeedbackRef.current);
        }
    }["WorkoutCamera.useCallback[handleStop]"], [
        onComplete
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-screen bg-slate-900",
            "data-oid": "2hihyhk",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                "data-oid": "oe.mfof",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4",
                        "data-oid": "z.nf82_"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                        lineNumber: 264,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white text-lg",
                        "data-oid": "v0p15jg",
                        children: "Initializing camera and AI..."
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                        lineNumber: 268,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                lineNumber: 263,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
            lineNumber: 259,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-screen bg-slate-900 p-4",
            "data-oid": "6jd8u80",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center max-w-md",
                "data-oid": "65y86by",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4",
                        "data-oid": "n:.p5_n",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-8 h-8 text-red-400",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            "data-oid": "fr5k57q",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M6 18L18 6M6 6l12 12",
                                "data-oid": "7fb01ap"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                                lineNumber: 294,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                            lineNumber: 287,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                        lineNumber: 283,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold text-white mb-2",
                        "data-oid": "4-66v:-",
                        children: "Setup Error"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                        lineNumber: 303,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400 mb-4",
                        "data-oid": "giniyhg",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                        lineNumber: 309,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>window.location.reload(),
                        className: "px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600",
                        "data-oid": "jik9a5s",
                        children: "Try Again"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                        lineNumber: 312,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                lineNumber: 282,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
            lineNumber: 278,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-screen bg-slate-900 overflow-hidden",
        "data-oid": "u21w:30",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full h-full",
                "data-oid": "16zzk30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        ref: videoRef,
                        className: "absolute inset-0 w-full h-full object-cover transform scale-x-[-1]",
                        playsInline: true,
                        muted: true,
                        "data-oid": "sd-z8cc"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                        lineNumber: 331,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                        ref: canvasRef,
                        className: "absolute inset-0 w-full h-full transform scale-x-[-1]",
                        "data-oid": "d_1z418"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                        lineNumber: 339,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                "data-oid": "asukeiz",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent",
                        "data-oid": "agi5bm3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            "data-oid": "djx3bdv",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full",
                                    "data-oid": "05:cv0_",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white text-sm font-medium",
                                        "data-oid": "qyhcmy6",
                                        children: [
                                            "Phase: ",
                                            phase
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                                        lineNumber: 358,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                                    lineNumber: 354,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full",
                                    "data-oid": "tvyn3nu",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white text-sm font-medium",
                                        "data-oid": "vb58-dr",
                                        children: [
                                            "Reps: ",
                                            repCount
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                                        lineNumber: 369,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                                    lineNumber: 365,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                            lineNumber: 353,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                        lineNumber: 349,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                        "data-oid": "xet55vi",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-8xl font-bold text-white drop-shadow-2xl",
                            "data-oid": "282awy8",
                            children: repCount
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                            lineNumber: 384,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                        lineNumber: 380,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4",
                        "data-oid": "ga1lm7a",
                        children: currentFeedback.map((feedback, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 p-4 rounded-lg backdrop-blur-md animate-fade-in ".concat(feedback.severity === "error" ? "bg-red-500/80" : feedback.severity === "warning" ? "bg-yellow-500/80" : "bg-green-500/80"),
                                "data-oid": "ykjn:0h",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white font-semibold text-center",
                                    "data-oid": "efjyr2t",
                                    children: feedback.message
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                                    lineNumber: 409,
                                    columnNumber: 15
                                }, this)
                            }, "".concat(feedback.timestamp, "-").concat(index), false, {
                                fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                                lineNumber: 398,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                        lineNumber: 393,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/50 to-transparent",
                        "data-oid": "uf8vhh0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-4",
                            "data-oid": "8kjst_a",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleStop,
                                className: "pointer-events-auto px-8 py-4 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors shadow-lg",
                                "data-oid": "j:y.uze",
                                children: "End Session"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                                lineNumber: 428,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                            lineNumber: 424,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                        lineNumber: 420,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
                lineNumber: 347,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/WorkoutCamera.tsx",
        lineNumber: 325,
        columnNumber: 5
    }, this);
}
_s(WorkoutCamera, "YL+/i2Voaro8WKmreo/FpEpcqgo=");
_c = WorkoutCamera;
var _c;
__turbopack_context__.k.register(_c, "WorkoutCamera");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/lib/exercises.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "exercises",
    ()=>exercises,
    "getAllExercises",
    ()=>getAllExercises,
    "getExercise",
    ()=>getExercise
]);
const exercises = {
    squat: {
        id: "squat",
        name: "Squat",
        description: "Master the fundamental lower body movement pattern with proper depth and alignment.",
        cameraAngle: "side",
        icon: "🦵",
        targetMuscles: [
            "Quadriceps",
            "Glutes",
            "Hamstrings",
            "Core"
        ],
        commonErrors: [
            "Knees caving inward",
            "Excessive forward lean",
            "Insufficient depth",
            "Heels lifting off ground",
            "Lower back rounding"
        ]
    },
    deadlift: {
        id: "deadlift",
        name: "Deadlift / Hip Hinge",
        description: "Learn the hip hinge pattern essential for posterior chain development and injury prevention.",
        cameraAngle: "side",
        icon: "💪",
        targetMuscles: [
            "Hamstrings",
            "Glutes",
            "Lower Back",
            "Core"
        ],
        commonErrors: [
            "Back rounding",
            "Hips rising too fast",
            "Bar drifting away from body",
            "Knees locking too early",
            "Improper breathing"
        ]
    },
    pushup: {
        id: "pushup",
        name: "Push-Up",
        description: "Perfect your upper body pressing mechanics and core stability.",
        cameraAngle: "side",
        icon: "💥",
        targetMuscles: [
            "Chest",
            "Triceps",
            "Shoulders",
            "Core"
        ],
        commonErrors: [
            "Sagging hips",
            "Flaring elbows",
            "Incomplete range of motion",
            "Head dropping",
            "Pike position"
        ]
    },
    row: {
        id: "row",
        name: "Row",
        description: "Develop proper pulling mechanics and posterior shoulder strength.",
        cameraAngle: "front",
        icon: "🚣",
        targetMuscles: [
            "Upper Back",
            "Lats",
            "Rhomboids",
            "Biceps"
        ],
        commonErrors: [
            "Excessive momentum",
            "Shoulder shrugging",
            "Elbow flaring",
            "Incomplete scapular retraction",
            "Torso rotation"
        ]
    },
    "overhead-press": {
        id: "overhead-press",
        name: "Overhead Press",
        description: "Build stable overhead pressing mechanics and shoulder health.",
        cameraAngle: "front",
        icon: "🏋️",
        targetMuscles: [
            "Shoulders",
            "Triceps",
            "Upper Chest",
            "Core"
        ],
        commonErrors: [
            "Excessive lower back arch",
            "Bar path not straight",
            "Head not passing through",
            "Core instability",
            "Incomplete lockout"
        ]
    }
};
const getExercise = (id)=>exercises[id];
const getAllExercises = ()=>Object.values(exercises);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/app/workout/[exerciseId]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkoutPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$WorkoutCamera$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/WorkoutCamera.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$exercises$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/exercises.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function WorkoutPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const exerciseId = params.exerciseId;
    const exercise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$exercises$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExercise"])(exerciseId);
    const [showInstructions, setShowInstructions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("camera");
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleComplete = (reps, feedback)=>{
        // Store session data in sessionStorage
        const sessionData = {
            exerciseId,
            reps,
            feedback,
            endTime: Date.now()
        };
        sessionStorage.setItem("workoutSession", JSON.stringify(sessionData));
        router.push("/summary");
    };
    if (showInstructions) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-2xl w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-8",
                        "data-oid": "rwd0uex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-6xl mb-4",
                                "data-oid": "9qd7y5y",
                                children: exercise.icon
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold text-white mb-2",
                                "data-oid": "o6cfqzt",
                                children: exercise.name
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400",
                                "data-oid": "80m1lwd",
                                children: exercise.description
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6 mb-8",
                        "data-oid": "tgj8dg4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-oid": "krc5vi9",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-semibold text-white mb-4 flex items-center gap-2",
                                        "data-oid": "jzkh02q",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-6 h-6 text-blue-400",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                "data-oid": "j48-fet",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z",
                                                        "data-oid": "1d4ci-x"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                        lineNumber: 68,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M15 13a3 3 0 11-6 0 3 3 0 016 0z",
                                                        "data-oid": "k4yifzo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                lineNumber: 61,
                                                columnNumber: 17
                                            }, this),
                                            "Camera Setup"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-900/50 rounded-lg p-4 space-y-2",
                                        "data-oid": "qk8y4.8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-300 flex items-start gap-2",
                                                "data-oid": "frj-4lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-blue-400 font-semibold",
                                                        "data-oid": "fg.eej4",
                                                        children: "•"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "data-oid": "gfryse2",
                                                        children: [
                                                            "Position phone",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                className: "text-white",
                                                                "data-oid": "3bzq-6n",
                                                                children: "6-8 feet away"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                                lineNumber: 102,
                                                                columnNumber: 21
                                                            }, this),
                                                            " ",
                                                            "at hip height"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                        lineNumber: 100,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                lineNumber: 90,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-300 flex items-start gap-2",
                                                "data-oid": "g-533hd",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-blue-400 font-semibold",
                                                        "data-oid": "462ichl",
                                                        children: "•"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                        lineNumber: 112,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "data-oid": "2n2w2wc",
                                                        children: [
                                                            "Use",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                className: "text-white",
                                                                "data-oid": "2eojdxf",
                                                                children: [
                                                                    exercise.cameraAngle,
                                                                    " view"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                                lineNumber: 120,
                                                                columnNumber: 21
                                                            }, this),
                                                            " ",
                                                            "- your entire body should be visible"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                        lineNumber: 118,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                lineNumber: 108,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-300 flex items-start gap-2",
                                                "data-oid": "m:rb207",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-blue-400 font-semibold",
                                                        "data-oid": "s-gz0xx",
                                                        children: "•"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "data-oid": "g:-ddwe",
                                                        children: "Ensure good lighting and a clear background"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                lineNumber: 126,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-300 flex items-start gap-2",
                                                "data-oid": ":20r.yd",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-blue-400 font-semibold",
                                                        "data-oid": "bpnhmnu",
                                                        children: "•"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "data-oid": "sw2mc_l",
                                                        children: "Grant camera permissions when prompted"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                        lineNumber: 150,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                lineNumber: 140,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-oid": "65nq_1j",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-semibold text-white mb-4 flex items-center gap-2",
                                        "data-oid": ":-gaxew",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-6 h-6 text-yellow-400",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                "data-oid": "i5wpzaw",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
                                                    "data-oid": "xue75f6"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                lineNumber: 163,
                                                columnNumber: 17
                                            }, this),
                                            "We'll Check For"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-900/50 rounded-lg p-4",
                                        "data-oid": "gkh3w8y",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-2",
                                            "data-oid": "rgmau6e",
                                            children: exercise.commonErrors.map((error, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "text-gray-300 flex items-start gap-2",
                                                    "data-oid": "r0g0xui",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-yellow-400 font-semibold",
                                                            "data-oid": "o3ya57m",
                                                            children: "•"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                            lineNumber: 191,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "data-oid": "f_zkh_b",
                                                            children: error
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                            lineNumber: 197,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                            lineNumber: 184,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                        lineNumber: 180,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "flex-1 px-6 py-4 rounded-lg font-semibold transition-colors ".concat(mode === 'camera' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-gray-300'),
                                onClick: ()=>setMode('camera'),
                                children: "Use Camera"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                lineNumber: 207,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "flex-1 px-6 py-4 rounded-lg font-semibold transition-colors ".concat(mode === 'upload' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-gray-300'),
                                onClick: ()=>setMode('upload'),
                                children: "Upload Video"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                lineNumber: 213,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                        lineNumber: 206,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.back(),
                                className: "flex-1 px-6 py-4 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors",
                                children: "Back"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                lineNumber: 222,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowInstructions(false),
                                className: "flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg",
                                children: "Start"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                lineNumber: 228,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                        lineNumber: 221,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, this);
    }
    // Main workout logic
    if (mode === "camera") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$WorkoutCamera$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            exerciseId: exerciseId,
            onComplete: handleComplete
        }, void 0, false, {
            fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
            lineNumber: 243,
            columnNumber: 7
        }, this);
    }
    // Video upload mode
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-xl w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold text-white mb-4 text-center",
                    children: "Upload Your Exercise Video"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                    lineNumber: 254,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: async (e)=>{
                        e.preventDefault();
                        setError(null);
                        setFeedback(null);
                        setUploading(true);
                        const formData = new FormData(e.target);
                        try {
                            const res = await fetch("/api/analyze-video", {
                                method: "POST",
                                body: formData
                            });
                            if (!res.ok) throw new Error("Failed to analyze video");
                            const data = await res.json();
                            setFeedback(data.feedback || []);
                        } catch (err) {
                            setError(err.message || "Unknown error");
                        } finally{
                            setUploading(false);
                        }
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "file",
                            name: "video",
                            accept: "video/*",
                            required: true,
                            className: "block w-full mb-4 text-gray-200"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "hidden",
                            name: "exerciseId",
                            value: exerciseId
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                            lineNumber: 284,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: uploading,
                            className: "w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors",
                            children: uploading ? "Uploading..." : "Analyze Video"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                            lineNumber: 285,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                    lineNumber: 255,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 text-red-400 text-center",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                    lineNumber: 293,
                    columnNumber: 19
                }, this),
                feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold text-white mb-2",
                            children: "Feedback"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                            lineNumber: 296,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "text-gray-300 space-y-2",
                            children: feedback.map((fb, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: fb.message
                                }, idx, false, {
                                    fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                                    lineNumber: 299,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                            lineNumber: 297,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
                    lineNumber: 295,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
            lineNumber: 253,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/workout/[exerciseId]/page.tsx",
        lineNumber: 252,
        columnNumber: 5
    }, this);
}
_s(WorkoutPage, "kTWHiley0u4v5Ahzg+oCotjI3aM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = WorkoutPage;
var _c;
__turbopack_context__.k.register(_c, "WorkoutPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_src_9c9e02e2._.js.map