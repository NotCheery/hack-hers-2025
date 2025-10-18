import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCbc8Ez9QvHYDYGDLdW7RtR8JnycEfJTkw",
  authDomain: "clutch-20040.firebaseapp.com",
  projectId: "clutch-20040",
  storageBucket: "clutch-20040.firebasestorage.app",
  messagingSenderId: "200259366491",
  appId: "1:200259366491:web:7cfa71e1c3d03045d1597e",
  measurementId: "G-G8H2G41HSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
