import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCbr-ROxS1WMnsCcp7GXtwUXTBE_XkVGgs",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "safus-fb5c6.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "safus-fb5c6",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "safus-fb5c6.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "455736910364",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:455736910364:web:ce6c6390fd9a1e4bb0f5d9",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-W4Q5G9S3X1"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication & Social Providers
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Initialize Analytics conditionally
export const analyticsPromise = isSupported().then((supported) => supported ? getAnalytics(app) : null);
