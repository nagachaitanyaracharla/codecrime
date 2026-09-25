# CODECRIME — Debug. Investigate. Solve.

> **An interactive cybersecurity investigation game and developer debugging platform.**  
> Created by **NAGA CHAITANYA RACHARLA**  
> Computer Science Engineering Student

---

## 1. Project Overview

**CodeCrime** is a high-impact, interactive coding and cybersecurity investigation platform that transforms traditional programming exercises into immersive cyber forensic investigations. Players act as code detectives—inspecting suspect subroutines, analyzing forensic evidence cards, referencing test suites, and patching real-world vulnerabilities across Python, JavaScript, SQL, Java, and C++.

---

## 2. Features

- **Cybersecurity Detective Theme**: Futuristic HUD interface with deep charcoal tones, electric cyan and neon green accents, glassmorphic panels, and monospace telemetry.
- **Interactive 3-Panel Investigation Dashboard**:
  - **Left Panel (Suspect Code)**: Syntax-styled code editor with real-time line numbering, code reset, copy-to-clipboard, and error highlight pointers.
  - **Center Panel (Evidence Board)**: Interactive forensic clue cards that link directly to suspicious lines in the code with contextual inspector breakdowns.
  - **Right Panel (Terminal & Output)**: Cyber console displaying execution logs, test case matrices (inputs, expected values, actual outputs), and pass/fail telemetry.
- **6 Realistic Bug & Security Scenarios**:
  - `CASE #001`: **The Broken Calculator** (Python arithmetic operator anomaly)
  - `CASE #002`: **The Vanishing User** (JavaScript block-scoping ReferenceError)
  - `CASE #003`: **The Silent Database** (SQL inverted condition filter)
  - `CASE #004`: **The Infinite Loop** (Java loop decrement divergence)
  - `CASE #005`: **The Memory Leak** (C++ unfreed dynamic heap allocation)
  - `CASE #006`: **The Hidden Injection** (SQL injection via raw string concatenation)
- **3-Tier Forensic Hint Protocol**: Progressive clue unlocking with XP deduction penalties.
- **Cinematic Solved / Failed Outcome Modals**: Root-cause diagnostic briefings, elapsed time metrics, accuracy ratings, and earned XP rewards.
- **Detective Profile & Badges**: Tracks detective rank (`CODE DETECTIVE`), live XP, total cases solved, accuracy percentage, active streaks, and achievement badges (`Bug Hunter`, `Evidence Master`, `Fast Detective`, `Logic Master`, `CVE Slayer`).
- **Simulated Leaderboard**: Tabbed rankings (`GLOBAL`, `WEEKLY`, `LOCAL`) highlighting your live performance.
- **Web Audio API Synthesizer**: Subtle synthesized sci-fi sound effects (muted by default with a quick toggle in the navigation bar).
- **Zero-Dependency Security**: Safe client-side case validation without unsafe `eval()`.
- **100% Free Stack**: Built entirely with free, open-source technologies without paid APIs or subscriptions.

---

## 3. Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/) (Free open-source icon suite)
- **Audio**: Web Audio API (native browser synthesizer, no heavy assets)
- **Styling**: Vanilla CSS (Tailored cyber glassmorphism design tokens)
- **Typography**: Google Fonts (*JetBrains Mono*, *Inter*, *Space Grotesk*)
- **State Storage**: Native browser `localStorage` persistence

---

## 4. Folder Structure

```
pt/
├── index.html                  # HTML5 shell with fonts and metadata
├── package.json                # Project dependencies and npm scripts
├── README.md                   # Comprehensive documentation
│
└── src/
    ├── main.jsx                # Application root mount
    ├── App.jsx                 # View router and state coordinator
    ├── index.css               # Cyber HUD design system & tokens
    │
    ├── components/
    │   ├── Navbar.jsx          # Top navigation, SFX toggle, and XP badge
    │   ├── Hero.jsx            # Cinematic landing page with typing terminal
    │   ├── CaseCard.jsx        # Individual case card with status tags
    │   ├── CaseSelection.jsx   # Case repository grid with language filter
    │   ├── CaseInvestigation.jsx # 3-panel HUD investigation workspace
    │   ├── CodeEditor.jsx      # Line-numbered suspect code editor
    │   ├── EvidenceBoard.jsx   # Interactive clickable forensic clue cards
    │   ├── Terminal.jsx        # Telemetry logs and test verification matrix
    │   ├── HintSystem.jsx      # 3-level progressive hint modal
    │   ├── Profile.jsx         # Detective profile, skills, and badges
    │   ├── Leaderboard.jsx     # Tabbed rankings board
    │   ├── HowItWorks.jsx      # 4-stage investigative methodology
    │   ├── About.jsx           # Project dossier and creator profile
    │   └── Footer.jsx          # Tagline, creator credits, and placeholders
    │
    ├── data/
    │   └── cases.js            # Master case files database
    │
    └── utils/
        ├── gameState.js        # LocalStorage state management
        ├── validation.js       # Safe case validation engine (no eval)
        └── sound.js            # Web Audio API sound synthesizer
```

---

## 5. How to Run Locally

### Prerequisites
- Node.js (version 18+ or 20+)
- npm (version 9+)

### Installation & Launch
```bash
# 1. Clone repository or navigate to project folder
cd pt

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173/` to launch **CodeCrime**.

---

## 6. How to Build for Production

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

The optimized static files will be compiled into the `dist/` directory.

---

## 7. How to Deploy for Free

### Option A: Vercel (Recommended)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) (Free Tier).
3. Click **Add New...** -> **Project**.
4. Import your GitHub repository.
5. Framework preset is automatically detected as **Vite**.
6. Click **Deploy**.

### Option B: Netlify
1. Log in to [Netlify](https://www.netlify.com/) (Free Tier).
2. Click **Add new site** -> **Import an existing project**.
3. Choose your GitHub repository.
4. Set Build Command: `npm run build` and Publish Directory: `dist`.
5. Click **Deploy Site**.

### Option C: GitHub Pages
1. In `vite.config.js`, set `base: '/<repository-name>/'`.
2. Run `npm run build`.
3. Use the free `gh-pages` npm package or GitHub Actions to publish the `dist` directory.

---

## 8. How to Add New Cases

Open `src/data/cases.js` and add a new case object following this schema:

```javascript
{
  id: "case-007",
  caseNumber: "CASE #007",
  title: "THE RACE CONDITION",
  difficulty: "ADVANCED",
  language: "JavaScript",
  crime: "Asynchronous state mutation",
  status: "AVAILABLE",
  reward: 350,
  timeLimit: 360,
  description: "Detailed case background...",
  initialCode: `// Suspect starter code here`,
  evidence: [
    {
      id: "ev-01",
      label: "EVIDENCE #01",
      title: "Timing Trace",
      detail: "Race window opened between Promise.all callbacks.",
      type: "log",
      connectedLine: 3
    }
  ],
  hints: [
    { level: 1, cost: 30, text: "Examine await placement." }
  ],
  testCases: [
    { id: 1, inputLabel: "Concurrency test", inputs: {}, expected: "Resolved" }
  ],
  bugIdentified: "Unsynchronized state update",
  rootCause: "Concurrent async function mutating shared reference",
  explanation: "Using mutex lock or atomic reducer resolves the mutation race."
}
```

Then, add corresponding verification rules inside `src/utils/validation.js` under `case "case-007"`.

---

## 9. How to Replace Social & Contact Placeholders

In `src/components/Footer.jsx`, replace the marked placeholders with your actual profiles:

```jsx
// Replace YOUR_GITHUB_URL with your GitHub profile username:
href="https://github.com/YOUR_GITHUB_URL"

// Replace YOUR_LINKEDIN_URL with your LinkedIn profile identifier:
href="https://linkedin.com/in/YOUR_LINKEDIN_URL"

// Replace YOUR_EMAIL with your direct email address:
href="mailto:YOUR_EMAIL"
```

---

## 10. Creator & Credits

Created by **NAGA CHAITANYA RACHARLA**  
*Computer Science Engineering Student*

© 2026 NAGA CHAITANYA RACHARLA. Built with 100% free and open-source technologies.
