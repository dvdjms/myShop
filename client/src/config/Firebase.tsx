// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile, 
    fetchSignInMethodsForEmail } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, doc, setDoc } from 'firebase/firestore';
import { GoogleAuthProvider, TwitterAuthProvider, FacebookAuthProvider } from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_AUTH_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

let firebaseApp;

try {
  firebaseApp = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Error initializing Firebase app:", error);
}


if (!firebaseApp) {
    console.error("Frebase app not initialised propperly")
}


const uiConfiguration = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    // {
    //   provider: EmailAuthProvider.PROVIDER_ID,
    //   fullLabel: "Continue with email",
    // },
    {
      provider: GoogleAuthProvider.PROVIDER_ID,
      fullLabel: "Continue with Google",
    },
    {
      provider: TwitterAuthProvider.PROVIDER_ID,
      fullLabel: "Continue with Twitter",
    },
    {
      provider: FacebookAuthProvider.PROVIDER_ID,
      fullLabel: "Continue with Facebook",
    }
  ],
  // Other config options...
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

// Firebase services
const auth = getAuth(firebaseApp);
export const uiConfig = uiConfiguration;

export { auth, getAuth, onAuthStateChanged, collection, doc, addDoc, setDoc, getDoc,
    signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword, 
    updateProfile, fetchSignInMethodsForEmail };
export const db = getFirestore();
