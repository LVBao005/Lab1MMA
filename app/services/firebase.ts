import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

// Firebase configuration for lab1mma-1c30a
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "AIzaSyA49hMGIV50a2_FdX7ql3h4hCS-mvlQ-DU",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "lab1mma-1c30a.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "lab1mma-1c30a",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "lab1mma-1c30a.firebasestorage.app",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "229731585536",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:229731585536:web:bd109ca440e21a67e612e5",
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-8K8LDG97GP",
};

// Initialize Firebase (avoid duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with long polling enabled for React Native / Expo network compatibility
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export default app;
