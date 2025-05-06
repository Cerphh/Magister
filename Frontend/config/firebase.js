import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoYeb2idqdSJn8bDQ9arPAgEkt9cyGmxE",
  authDomain: "magister-1ad61.firebaseapp.com",
  projectId: "magister-1ad61",
  storageBucket: "magister-1ad61.firebasestorage.app",
  messagingSenderId: "696631914106",
  appId: "1:696631914106:web:b272bcbea9414115fd95c3",
  measurementId: "G-3QWY1ZWTFD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, db }; 
