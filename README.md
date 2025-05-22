# LeetClone

A Next.js + TypeScript “LeetCode‐style” coding playground with authentication, Firebase integration, and customizable editor settings.

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Getting Started](#getting-started)  
5. [Project Structure](#project-structure)  
6. [Roadmap](#roadmap)  
7. [Learning Video](#learning-video)  
8. [License](#license)  

---

## Project Overview

LeetClone is a full-stack coding challenge platform inspired by LeetCode. Users can browse problems, write and run JavaScript solutions in a CodeMirror editor, track completion status, and customize their editor experience (font size, fullscreen mode, etc.). Authentication and state are backed by Firebase.

---

## Features

- **Static + Client-Only Rendering**  
  - Ensures hydration-safe dynamic UI with a `<ClientOnly>` wrapper.  
- **Authentication & Authorization**  
  - Sign up / log in / password reset using Firebase Auth and `react-firebase-hooks`.  
- **Problem Browser**  
  - **Scaffolded** homepage with embedded YouTube link per problem.  
  - Prev / Next navigation in the topbar.  
  - Redirect to LeetCode if no internal problem page.  
- **Local & Remote Data**  
  - Local mock DB for problem metadata (title, description, examples, constraints).  
  - Firebase Firestore for persisting users, likes/dislikes, stars, solved flags.  
- **Interactive Playground**  
  - Code editor (CodeMirror) with “Run” and “Submit” buttons.  
  - Dynamic code execution via `Function` constructor and handler functions.  
  - Loading skeleton animation while data loads.  
- **Editor Customization**  
  - Full-screen toggle for distraction-free coding.  
  - Font-size dropdown (12px–18px) persisted in state and applied to the editor.  
- **Stateful UI**  
  - Like / Dislike / Star buttons only for signed-in users, with Firestore transactions.  
  - Real-time update of problem `likes`, `dislikes`, and `solved` counts.  
  - Home page clearly shows which problems are solved vs. unsolved.

---

## Tech Stack

- **Framework:** Next.js (App Router, “use client” components)  
- **Language:** TypeScript, React  
- **Styling:** Tailwind CSS  
- **Editor:** @uiw/react-codemirror + CodeMirror 6 (JavaScript mode, `vscodeDark` theme)  
- **Authentication:** Firebase Auth + react-firebase-hooks  
- **Database:** Firebase Firestore (users, problems)  
- **State Management:** React `useState` / custom hooks  
- **Hosting:** (e.g. Vercel / Firebase Hosting)  

---

## Getting Started

1. **Clone the repo**  
   ```bash
   git clone https://github.com/YuhangZhangz/leetcode-clone-app.git
   cd leetcode-clone-app
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Configure Firebase**  
   - Create a Firebase project, enable Auth and Firestore.  
   - Copy your config into `src/firebase/firebase.ts`.

4. **Environment Variables**  
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=…
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=…
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=…
   …etc.
   ```

5. **Run in dev mode**  
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
/src
├─ /components
│  ├─ PreferenceNav.tsx        # topbar settings & fullscreen toggle
│  ├─ SettingsModal.tsx        # font-size dropdown UI
│  ├─ EditorFooter.tsx         # Run / Submit buttons
│  ├─ /Skeletons               # loading skeleton components
│  └─ /Workspace
│     ├─ ProblemsTable.tsx     # problem list
│     └─ ProblemDescription.tsx# detailed view with like/dislike/star
├─ /mockProblems               # placeholder problem data
├─ /pages                      # Next.js routes
│  └─ /problems/[pid].tsx      # problem detail + playground
├─ /utils
│  └─ /types/problem.ts        # Problem & DBProblem interfaces
├─ firebase/firebase.ts        # Firebase initialization
├─ globals.css                 # Tailwind imports & overrides
└─ next.config.js              # Next.js config
```

---

## Roadmap

- [ ] Persist editor settings (font size, theme) to Firestore or localStorage  
- [ ] Add more challenge metadata: difficulty tags, acceptance rate, tags  
- [ ] Implement discussion/comments per problem  
- [ ] Dark mode toggle for entire app  
- [ ] Mobile-friendly layout adjustments  

---

## Learning Video

Watch the detailed walkthrough and tutorial here:

[📺 Learning Video](https://www.youtube.com/watch?v=GnodscC2p-A&t=25299s)

---

## License

MIT © YuhangZhangz
