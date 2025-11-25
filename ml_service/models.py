"""
Data models for the ML service interface.
"""

from dataclasses import asdict, dataclass, field
from typing import Any, Dict, List


class ErrorCodes:
    """Canonical error codes to avoid typos between analyzer and backend."""

    SHALLOW_DEPTH = "shallow_depth"
    KNEES_CAVING = "knees_caving"
    BACK_ROUNDING = "back_rounding"


@dataclass
class AnalysisRequest:
    """
    Input contract between backend and ML service.
    """

    session_id: str
    user_id: str
    exercise: str
    video_path: str


@dataclass
class RepFeedback:
    """
    Per-rep quality assessment and detected issues.
    """

    rep_index: int
    ok: bool
    issues: List[str] = field(default_factory=list)


@dataclass
class SessionFeedback:
    """
    Aggregated session-level feedback returned by the ML service.
    """

    exercise: str
    reps_total: int
    reps_good: int
    reps_bad: int
    errors_aggregated: Dict[str, int]
    per_rep: List[RepFeedback]
    next_session_plan: List[str]

    def to_dict(self) -> Dict[str, Any]:
        """
        Convert feedback to a plain dict suitable for JSON serialization.
        """
        return asdict(self)
