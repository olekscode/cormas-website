import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp();
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const db = getFirestore();

export { auth, provider, db };