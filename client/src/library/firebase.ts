import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5WiFjpe8JvPEjrkglyPDLypdlDFoikAE",
  authDomain: "book-store-app-26970.firebaseapp.com",
  projectId: "book-store-app-26970",
  storageBucket: "book-store-app-26970.firebasestorage.app",
  messagingSenderId: "202977415978",
  appId: "1:202977415978:web:523c9dabe553f32b724453",
  measurementId: "G-NWLD14K1WC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
