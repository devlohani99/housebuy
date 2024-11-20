// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "housebuy-59e61.firebaseapp.com",
  projectId: "housebuy-59e61",
  storageBucket: "housebuy-59e61.firebasestorage.app",
  messagingSenderId: "618535179754",
  appId: "1:618535179754:web:caaf8f6f8c975474288e93"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);