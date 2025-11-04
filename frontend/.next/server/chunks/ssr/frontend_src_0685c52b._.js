module.exports = [
"[project]/frontend/src/lib/exercises.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/frontend/src/app/summary/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SummaryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$exercises$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/exercises.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function SummaryPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [sessionData, setSessionData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [correctivePlan, setCorrectivePlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const data = sessionStorage.getItem("workoutSession");
        if (!data) {
            router.push("/exercises");
            return;
        }
        const session = JSON.parse(data);
        setSessionData(session);
        // Generate corrective plan based on feedback
        const plan = generateCorrectivePlan(session.feedback);
        setCorrectivePlan(plan);
    }, [
        router
    ]);
    const generateCorrectivePlan = (feedback)=>{
        const issues = new Map();
        feedback.forEach((fb)=>{
            if (fb.severity === "warning" || fb.severity === "error") {
                issues.set(fb.type, (issues.get(fb.type) || 0) + 1);
            }
        });
        const plans = [];
        // Map issues to corrective exercises
        const correctiveMapping = {
            knee_valgus: {
                issue: "Knees Caving Inward",
                description: "Weak hip abductors and external rotators causing knee valgus.",
                exercises: [
                    "Banded lateral walks (3x15)",
                    "Clamshells (3x20 each side)",
                    "Single-leg glute bridges (3x12 each)"
                ],
                priority: "high"
            },
            forward_lean: {
                issue: "Excessive Forward Lean",
                description: "Weak quads or limited ankle mobility causing forward trunk lean.",
                exercises: [
                    "Goblet squats (3x12)",
                    "Ankle mobility drills (2 min)",
                    "Wall sits (3x30 seconds)"
                ],
                priority: "medium"
            },
            depth: {
                issue: "Insufficient Depth",
                description: "Limited mobility or weak stabilizers preventing full range of motion.",
                exercises: [
                    "Box squats (3x10)",
                    "Hip flexor stretches (2 min each side)",
                    "Deep bodyweight squats (3x5, hold bottom)"
                ],
                priority: "medium"
            },
            back_rounding: {
                issue: "Back Rounding",
                description: "Weak core and back extensors compromising spinal position.",
                exercises: [
                    "Romanian deadlifts (3x10)",
                    "Bird dogs (3x10 each side)",
                    "Dead bugs (3x12)"
                ],
                priority: "high"
            },
            hip_sag: {
                issue: "Hips Sagging",
                description: "Weak core stability affecting plank position.",
                exercises: [
                    "Plank holds (3x30-60 seconds)",
                    "Hollow body holds (3x20 seconds)",
                    "Dead bugs (3x12)"
                ],
                priority: "high"
            }
        };
        // Sort by frequency and add to plan
        const sortedIssues = Array.from(issues.entries()).sort((a, b)=>b[1] - a[1]).slice(0, 3);
        sortedIssues.forEach(([type])=>{
            if (correctiveMapping[type]) {
                plans.push(correctiveMapping[type]);
            }
        });
        return plans;
    };
    if (!sessionData) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-slate-900 flex items-center justify-center",
            "data-oid": "aak.:4a",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white",
                "data-oid": "ufr30ff",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/summary/page.tsx",
                lineNumber: 137,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/app/summary/page.tsx",
            lineNumber: 133,
            columnNumber: 7
        }, this);
    }
    const exercise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$exercises$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getExercise"])(sessionData.exerciseId);
    const validReps = sessionData.reps.filter((r)=>r.valid).length;
    const totalAttempts = sessionData.reps.length;
    const accuracy = totalAttempts > 0 ? (validReps / totalAttempts * 100).toFixed(0) : "0";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4",
        "data-oid": "f8697g9",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto",
            "data-oid": "zsbcvr0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-8",
                    "data-oid": "i:0uob8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-6xl mb-4",
                            "data-oid": "1sps7jr",
                            children: exercise.icon
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-4xl font-bold text-white mb-2",
                            "data-oid": "p-31mmr",
                            children: "Session Complete!"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-400",
                            "data-oid": "5ke2qsb",
                            children: exercise.name
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid md:grid-cols-3 gap-4 mb-8",
                    "data-oid": "0h4ib6d",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center",
                            "data-oid": "1d:c:j7",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-5xl font-bold text-green-400 mb-2",
                                    "data-oid": ".6es6c0",
                                    children: validReps
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                    lineNumber: 175,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400",
                                    "data-oid": "oa-z_5a",
                                    children: "Clean Reps"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center",
                            "data-oid": ":gf__2y",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-5xl font-bold text-blue-400 mb-2",
                                    "data-oid": "n:k.shg",
                                    children: [
                                        accuracy,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400",
                                    "data-oid": "b:er7r:",
                                    children: "Form Accuracy"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                            lineNumber: 185,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center",
                            "data-oid": "lyu-jyd",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-5xl font-bold text-purple-400 mb-2",
                                    "data-oid": "bas1-hm",
                                    children: sessionData.feedback.length
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                    lineNumber: 203,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400",
                                    "data-oid": "ec0vaye",
                                    children: "Form Cues"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                    lineNumber: 170,
                    columnNumber: 9
                }, this),
                correctivePlan.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8",
                    "data-oid": "mdu8tzc",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-white mb-4 flex items-center gap-2",
                            "data-oid": "tmbzhbv",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-7 h-7 text-yellow-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    "data-oid": "00u4g9f",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                                        "data-oid": "v2u1kdr"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/summary/page.tsx",
                                        lineNumber: 232,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                    lineNumber: 225,
                                    columnNumber: 15
                                }, this),
                                "Your Corrective Plan"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                            lineNumber: 221,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-400 mb-6",
                            "data-oid": "fgp90eg",
                            children: "Based on your form analysis, here are targeted exercises to improve your technique:"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                            lineNumber: 242,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            "data-oid": "ex4pidt",
                            children: correctivePlan.map((plan, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-slate-900/50 rounded-lg p-5",
                                    "data-oid": "jxo7ze-",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start justify-between mb-3",
                                            "data-oid": "kk9ya:b",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    "data-oid": "kboh0jz",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-lg font-semibold text-white mb-1",
                                                            "data-oid": "qm30avi",
                                                            children: plan.issue
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                                                            lineNumber: 259,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-400",
                                                            "data-oid": "uf:49n:",
                                                            children: plan.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                                                            lineNumber: 265,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `px-3 py-1 rounded-full text-xs font-semibold ${plan.priority === "high" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`,
                                                    "data-oid": "639iwln",
                                                    children: plan.priority === "high" ? "High Priority" : "Medium Priority"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                                            lineNumber: 254,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "data-oid": "w.9ekg5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-500 uppercase tracking-wider mb-2",
                                                    "data-oid": "42vyu5i",
                                                    children: "Corrective Exercises"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "space-y-2",
                                                    "data-oid": "6mlwxk2",
                                                    children: plan.exercises.map((ex, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "text-gray-300 flex items-start gap-2",
                                                            "data-oid": "pqr10n-",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-green-400 font-semibold",
                                                                    "data-oid": "x4t1qho",
                                                                    children: "✓"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                                                    lineNumber: 296,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    "data-oid": "w5onplk",
                                                                    children: ex
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                                                    lineNumber: 302,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, i, true, {
                                                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                                                            lineNumber: 291,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                                            lineNumber: 282,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                    lineNumber: 249,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                            lineNumber: 247,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                    lineNumber: 217,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8",
                    "data-oid": "k_gitgk",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-white mb-4 flex items-center gap-2",
                            "data-oid": "opdf205",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-7 h-7 text-blue-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    "data-oid": "nu91.5w",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                                        "data-oid": ".by1ame"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/summary/page.tsx",
                                        lineNumber: 329,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                    lineNumber: 322,
                                    columnNumber: 13
                                }, this),
                                "Session Feedback"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                            lineNumber: 318,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-h-64 overflow-y-auto space-y-2",
                            "data-oid": "fj4vt0p",
                            children: sessionData.feedback.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 text-center py-4",
                                "data-oid": "f1_r:9l",
                                children: "Perfect form! No corrections needed."
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/summary/page.tsx",
                                lineNumber: 345,
                                columnNumber: 15
                            }, this) : sessionData.feedback.slice(0, 20).map((fb, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `p-3 rounded-lg flex items-start gap-3 ${fb.severity === "error" ? "bg-red-500/10 border-l-4 border-red-500" : fb.severity === "warning" ? "bg-yellow-500/10 border-l-4 border-yellow-500" : "bg-green-500/10 border-l-4 border-green-500"}`,
                                    "data-oid": "jqj2ivd",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xl",
                                            "data-oid": "k6g7-oh",
                                            children: fb.severity === "error" ? "❌" : fb.severity === "warning" ? "⚠️" : "✓"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                                            lineNumber: 361,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            "data-oid": "-6s0_i_",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-200",
                                                    "data-oid": "nesv0.c",
                                                    children: fb.message
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                                    lineNumber: 369,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-500 mt-1",
                                                    "data-oid": "hcbcqrz",
                                                    children: new Date(fb.timestamp).toLocaleTimeString()
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                                    lineNumber: 372,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                                            lineNumber: 368,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                                    lineNumber: 350,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                            lineNumber: 340,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                    lineNumber: 314,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row gap-4",
                    "data-oid": ":udnufl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/exercises",
                            className: "flex-1 px-6 py-4 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors text-center",
                            "data-oid": "61dhe86",
                            children: "Try Another Exercise"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                            lineNumber: 387,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.push(`/workout/${sessionData.exerciseId}`),
                            className: "flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg",
                            "data-oid": "esh82l0",
                            children: "Do It Again"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/summary/page.tsx",
                            lineNumber: 394,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                    lineNumber: 386,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 text-center",
                    "data-oid": "u5mp9jy",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 text-sm",
                        "data-oid": "ld-:8c.",
                        children: [
                            "💡 Pro tip: Do your corrective exercises before your next",
                            " ",
                            exercise.name,
                            " session"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/summary/page.tsx",
                        lineNumber: 405,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/summary/page.tsx",
                    lineNumber: 404,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/app/summary/page.tsx",
            lineNumber: 155,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/summary/page.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=frontend_src_0685c52b._.js.map