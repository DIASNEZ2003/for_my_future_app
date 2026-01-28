// src/firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCnv7NGWI6v0ewTIRa_XrDlzf3oN_a7y-U",
  authDomain: "final-future-d1547.firebaseapp.com",
  projectId: "final-future-d1547",
  storageBucket: "final-future-d1547.firebasestorage.app",
  messagingSenderId: "850139505584",
  appId: "1:850139505584:web:bcb8ff6fb33c502a06ac75",
  measurementId: "G-70TMS8TLXZ",
  databaseURL: "https://final-future-d1547-default-rtdb.firebaseio.com/"
};

// 1. Initialize Firebase App (prevents double-initialization error)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 2. Initialize Auth with Persistence for Mobile
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// 3. Initialize Realtime Database
const db = getDatabase(app);

// Export everything for your login and monitoring screens
export { app, auth, db };