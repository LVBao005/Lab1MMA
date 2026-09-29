# TaskFlow — Task Management App

> Practical Exam 1 · Mobile and Multi-Platform Application Development

A mobile task management application built with **React Native (Expo)** and **Firebase Firestore**. TaskFlow lets anyone create, view, edit, and delete tasks in real time — no login required.

---

## What The App Does

TaskFlow is a public (no authentication) task management app where users can:

- **Create** new tasks with a title, description, status, priority, and due date
- **View** all tasks in a live-updating list fetched directly from Firebase Firestore
- **Edit** any existing task's title, description, status, or priority
- **Delete** tasks with a confirmation prompt
- **Filter** tasks by status (All / To Do / In Progress / Done)
- **Pull to refresh** the task list manually
- See a **progress bar** and **statistics card** (total, in-progress, done) at a glance

The app has three tabs:
- **Home** — main task list and CRUD interface
- **Teams** — "Coming Soon" placeholder (to be built in Exam 2)
- **Profile** — "Coming Soon" placeholder (to be built in Exam 2)

---

## Firestore Data Model

### Collection: `tasks`

Each document in the `tasks` collection has the following fields:

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Auto-generated Firestore document ID |
| `title` | `string` | Task title (required) |
| `description` | `string` | Optional detailed description |
| `status` | `string` | `"todo"` · `"in-progress"` · `"done"` |
| `priority` | `string` | `"low"` · `"medium"` · `"high"` |
| `dueDate` | `string \| null` | Due date in `YYYY-MM-DD` format (optional) |
| `createdAt` | `Timestamp` | Firestore server timestamp when created |
| `teamId` | `string \| null` | Team ID — reserved for Exam 2, `null` for now |
| `assigneeId` | `string \| null` | Assignee ID — reserved for Exam 2, `null` for now |

### ERD Diagram

```
+----------------------------------+
|       tasks (collection)         |
+----------------------------------+
| id          : string (doc ID)    |
| title       : string             |
| description : string             |
| status      : "todo" |           |
|               "in-progress" |   |
|               "done"            |
| priority    : "low" |            |
|               "medium" | "high"  |
| dueDate     : string | null      |
| createdAt   : Timestamp          |
| teamId      : string | null -----+--> [teams] (Exam 2)
| assigneeId  : string | null -----+--> [users] (Exam 2)
+----------------------------------+
```

`teamId` and `assigneeId` are pre-defined in the schema but set to `null` in Exam 1. They will be wired up to `teams` and `users` collections in Practical Exam 2.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | React Native · Expo SDK 57 (TypeScript) |
| Navigation | React Navigation v7 — Bottom Tabs |
| Backend / DB | Firebase Cloud Firestore (Web SDK v12) |
| UI Components | `react-native-paper` · `@expo/vector-icons` (MaterialIcons) |
| Code Quality | ESLint · Prettier |
| Version Control | Git · GitHub |

---

## Folder Structure

```
Lab1MMA/
├── app/
│   ├── components/
│   │   ├── TaskCard.tsx          # Individual task card with Edit & Delete actions
│   │   └── TaskFormModal.tsx     # Create / Edit task bottom-sheet modal
│   ├── hooks/
│   │   └── useTasks.ts           # Custom hook: real-time task list + CRUD handlers
│   ├── navigation/
│   │   └── AppNavigator.tsx      # Bottom tab navigator (Home / Teams / Profile)
│   ├── screens/
│   │   ├── HomeScreen.tsx        # Main screen: stats, filter, task list, FAB
│   │   ├── TeamsScreen.tsx       # Coming Soon placeholder
│   │   └── ProfileScreen.tsx    # Coming Soon placeholder
│   ├── services/
│   │   ├── firebase.ts           # Firebase app init + Firestore instance
│   │   ├── taskService.ts        # Firestore CRUD: subscribe, create, update, delete
│   │   └── firebaseConfig.example.ts  # Config template (no real secrets)
│   └── types/
│       └── index.ts              # TypeScript interfaces: Task, CreateTaskInput, etc.
├── assets/                       # App icons and images
├── .env                          # Firebase secrets (git-ignored)
├── .env.example                  # Config key template (safe to commit)
├── .eslintrc.js                  # ESLint config
├── .prettierrc                   # Prettier config
├── .gitignore
├── App.tsx                       # Root component
├── app.json                      # Expo project config
├── firestore.rules               # Firestore security rules (public read/write for Exam 1)
└── package.json
```

---

## Quick Start

### Prerequisites

- Node.js >= 18
- Expo Go app on your phone (or Android/iOS emulator)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/LVBao005/Lab1MMA.git
cd Lab1MMA

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your own Firebase project credentials

# 4. Start the development server
npx expo start
```

Scan the QR code in the terminal with **Expo Go** on your phone, or press `a` for Android emulator / `i` for iOS simulator.

---

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com) and create a new project.
2. Enable **Cloud Firestore** (test mode is fine for Exam 1).
3. In **Project Settings -> Your Apps -> SDK setup**, copy the config values.
4. Paste them into your `.env` file:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## Available Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Open on Android emulator
npm run ios        # Open on iOS simulator
npm run lint       # Run ESLint checks
npx tsc --noEmit   # TypeScript type-check
npx expo-doctor    # Diagnose dependency issues
```

---

## Features Summary

| Feature | Status |
| :--- | :--- |
| Create task (title, description, status, priority, due date) | Done |
| Real-time task list via Firestore `onSnapshot` | Done |
| Edit existing task | Done |
| Delete task with confirmation | Done |
| Client-side title validation | Done (Bonus) |
| Status filter chips (All / To Do / In Progress / Done) | Done (Bonus) |
| Pull-to-refresh | Done (Bonus) |
| Task statistics & progress bar | Done (Bonus) |
| Bottom tab navigation (Home / Teams / Profile) | Done |
| Teams & Profile placeholder screens | Done |
| UI component library (react-native-paper) | Done (Bonus) |

---

## Author

**LVBao005** — Practical Exam 1 submission  
Repository: [github.com/LVBao005/Lab1MMA](https://github.com/LVBao005/Lab1MMA)
