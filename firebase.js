// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTiBiOVF-uSb9lofatok5hhhHQfU0Eu2c",
  authDomain: "nextjs-twitter-clone-31bb8.firebaseapp.com",
  projectId: "nextjs-twitter-clone-31bb8",
  storageBucket: "nextjs-twitter-clone-31bb8.appspot.com",
  messagingSenderId: "388702282510",
  appId: "1:388702282510:web:b858b7b33ede3256ff2d5f",
};

// Initialize Firebase
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const firebaseDb = getFirestore();
const storage = getStorage();

export default firebaseApp;
export { firebaseDb, storage };
