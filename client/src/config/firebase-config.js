
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBXfdfqeqq1k2VnTJBMchSL1eZ2qXvt-6Y",
  authDomain: "vigilai-110d5.firebaseapp.com",
  projectId: "vigilai-110d5",
  storageBucket: "vigilai-110d5.appspot.com",
  messagingSenderId: "823347750616",
  appId: "1:823347750616:web:ba5d09b28573f4848ed9ad",
  measurementId: "G-7LHL0DJKMK"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export  {app, db, auth}