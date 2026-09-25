# CODECRIME

### DEBUG. INVESTIGATE. SOLVE.

> **An interactive cybersecurity investigation game and developer debugging platform.**  
> Created by **NAGA CHAITANYA RACHARLA**  
> Computer Science Engineering Student

---

## ABOUT THE PROJECT

**CodeCrime** is an interactive coding and cybersecurity investigation platform that turns debugging practice into real forensic challenges. Instead of standard algorithmic puzzles, developers investigate broken software cases, evaluate forensic evidence, detect security vulnerabilities, inspect execution logs, and submit patches to pass automated test suites.

### Core Features
- **Cyberpunk HUD Interface**: Glassmorphic panels, monospace telemetry, terminal-style diagnostics, and dark aesthetic.
- **3-Panel Investigation Dashboard**: Suspect Code Editor, Interactive Evidence Board, and System Terminal with regression matrix.
- **6 Realistic Bug Cases**:
  - `CASE #001`: **The Broken Calculator** (Python - Arithmetic operator anomaly)
  - `CASE #002`: **The Vanishing User** (JavaScript - Block scope variable leakage)
  - `CASE #003`: **The Silent Database** (SQL - Inverted query filtering)
  - `CASE #004`: **The Infinite Loop** (Java - Counter decrement divergence)
  - `CASE #005`: **The Memory Leak** (C++ - Unfreed dynamic heap memory)
  - `CASE #006`: **The Hidden Injection** (SQL - SQL injection via raw string concatenation)
- **3-Level Hint System**: Progressive clue reveal with XP penalty deductions.
- **Detective Profile & Badges**: Real-time progress, XP rewards, accuracy calculation, and unlockable achievement citations.
- **Interactive Leaderboard**: Simulated global and weekly detective standings.
- **Native Web Audio API**: Subtle synthesized cyber effects (muted by default with a header toggle).
- **Safe Client-Side Execution**: Zero `eval()`, zero paid APIs, zero backend requirements, 100% free open-source technologies.

---

## LOCAL SETUP

```bash
npm install
```

```bash
npm run dev
```

---

## PRODUCTION BUILD

```bash
npm run build
```

The production bundle will be generated in the `dist/` directory.

---

## RENDER DEPLOYMENT

1. Push the project to GitHub.
2. Open Render (https://render.com).
3. Create a new Static Site.
4. Connect the GitHub repository.
5. Use:

**Build Command:**
```bash
npm install && npm run build
```

**Publish Directory:**
```
dist
```

*(Optional: In Render's **Redirects/Rewrites** settings, add a rewrite rule from `/*` to `/index.html` with Action `Rewrite` to support client-side routing).*

6. Deploy.

---

## TECH STACK

- **Frontend**: React 19 + Vite
- **Styling**: Vanilla CSS (Tailored cyber tokens & glassmorphism)
- **Icons**: Lucide React
- **Audio**: Web Audio API (Native browser synthesizer)
- **State Storage**: Native `localStorage` persistence

---

## CREATOR

Created by **NAGA CHAITANYA RACHARLA**  
Computer Science Engineering Student • Code Detective

© 2026 NAGA CHAITANYA RACHARLA. Built with 100% free technologies.
