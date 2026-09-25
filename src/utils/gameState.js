// LocalStorage Game State Management
// Tracks player profile, XP, solved cases, badges, and time limits

const STORAGE_KEY = "codecrime_detective_state_v1";

const DEFAULT_STATE = {
  detectiveName: "NAGA CHAITANYA RACHARLA",
  role: "Computer Science Engineering Student",
  rank: "CODE DETECTIVE",
  baseXp: 1250,
  earnedXp: 0,
  solvedCaseIds: ["case-001"], // Pre-solved or initial baseline
  caseStats: {
    "case-001": { solved: false, hintsUsed: 0, timeTaken: null, bestScore: 0 }
  },
  evidenceDiscovered: ["ev-01", "ev-02"],
  streak: 5,
  totalSubmissions: 12,
  successfulSubmissions: 11,
  badges: [
    {
      id: "bug-hunter",
      title: "BUG HUNTER",
      icon: "🐞",
      desc: "First bug solved and quarantined in live production",
      unlocked: true,
      unlockedAt: "2026-09-20"
    },
    {
      id: "evidence-master",
      title: "EVIDENCE MASTER",
      icon: "🔎",
      desc: "Analyzed 10 suspect forensic evidence clues",
      unlocked: true,
      unlockedAt: "2026-09-21"
    },
    {
      id: "fast-detective",
      title: "FAST DETECTIVE",
      icon: "⚡",
      desc: "Solved a case under 2 minutes without hesitation",
      unlocked: true,
      unlockedAt: "2026-09-22"
    },
    {
      id: "logic-master",
      title: "LOGIC MASTER",
      icon: "🧠",
      desc: "Solved 5 cases without requesting any hints",
      unlocked: true,
      unlockedAt: "2026-09-23"
    },
    {
      id: "cve-slayer",
      title: "CVE SLAYER",
      icon: "🛡️",
      desc: "Neutralized an active SQL Injection vulnerability",
      unlocked: false,
      unlockedAt: null
    }
  ],
  soundEnabled: false
};

export function loadGameState() {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
      return DEFAULT_STATE;
    }
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch (e) {
    console.error("Failed to load CodeCrime state from localStorage:", e);
    return DEFAULT_STATE;
  }
}

export function saveGameState(state) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to persist CodeCrime state to localStorage:", e);
  }
}

export function recordCaseSolved(caseId, rewardXp, hintsUsedCount, timeSpentSeconds) {
  const current = loadGameState();
  const caseStats = current.caseStats || {};
  const isFirstTime = !current.solvedCaseIds.includes(caseId);

  // Compute XP with hint penalty: each hint costs 25-50 XP, min 25 XP
  const hintPenalty = Math.min(rewardXp - 25, hintsUsedCount * 25);
  const finalReward = Math.max(25, rewardXp - hintPenalty);

  const updatedSolvedIds = isFirstTime 
    ? [...current.solvedCaseIds, caseId] 
    : current.solvedCaseIds;

  const newEarnedXp = isFirstTime ? current.earnedXp + finalReward : current.earnedXp;

  // Check badges
  const updatedBadges = current.badges.map(b => {
    if (b.id === "fast-detective" && timeSpentSeconds && timeSpentSeconds < 120) {
      return { ...b, unlocked: true, unlockedAt: new Date().toISOString().split("T")[0] };
    }
    if (b.id === "cve-slayer" && caseId === "case-006") {
      return { ...b, unlocked: true, unlockedAt: new Date().toISOString().split("T")[0] };
    }
    return b;
  });

  const nextState = {
    ...current,
    earnedXp: newEarnedXp,
    solvedCaseIds: updatedSolvedIds,
    caseStats: {
      ...caseStats,
      [caseId]: {
        solved: true,
        hintsUsed: hintsUsedCount,
        timeTaken: timeSpentSeconds,
        bestScore: finalReward
      }
    },
    totalSubmissions: current.totalSubmissions + 1,
    successfulSubmissions: current.successfulSubmissions + 1,
    badges: updatedBadges
  };

  saveGameState(nextState);
  return { nextState, finalReward, hintPenalty };
}

export function recordFailedSubmission() {
  const current = loadGameState();
  const nextState = {
    ...current,
    totalSubmissions: (current.totalSubmissions || 0) + 1
  };
  saveGameState(nextState);
  return nextState;
}

export function resetGameState() {
  saveGameState(DEFAULT_STATE);
  return DEFAULT_STATE;
}
