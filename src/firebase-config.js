import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA9n8kwpzME1Pp7SHd6j4r0oJV9admDjtc",
  authDomain: "cormas-website.firebaseapp.com",
  projectId: "cormas-website",
  storageBucket: "cormas-website.appspot.com",
  messagingSenderId: "795853378308",
  appId: "1:795853378308:web:7350b8b4633180f74b3651",
  measurementId: "G-GZ3DHK8MJY"
};

const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const db = getFirestore();

export { auth, provider, db };