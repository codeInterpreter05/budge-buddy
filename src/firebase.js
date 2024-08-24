import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpWkIKU9bGefEIjnz-jVIkv72qL5QAkIQ",
  authDomain: "bugdebuddy.firebaseapp.com",
  projectId: "bugdebuddy",
  storageBucket: "bugdebuddy.appspot.com",
  messagingSenderId: "518823536520",
  appId: "1:518823536520:web:3292caabb8a7ae28737c3d",
  measurementId: "G-91PEWEBKMJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {db, auth, provider, doc, setDoc}