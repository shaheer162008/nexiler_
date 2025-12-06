import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2MPkLSehhP7o6ObXBvYUFT0ySBHfe3OU",
  authDomain: "nexiler.firebaseapp.com",
  projectId: "nexiler",
  storageBucket: "nexiler.firebasestorage.app",
  messagingSenderId: "1057091897732",
  appId: "1:1057091897732:web:64747c8811285e426235d1",
  measurementId: "G-VK07E4WPDE"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);