import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBbG7kfpyaNQx3c1RsHIBXvx3-tTclGuvk",
    authDomain: "fir-kurationai.firebaseapp.com",
    projectId: "fir-kurationai",
    storageBucket: "fir-kurationai.firebasestorage.app",
    messagingSenderId: "252861477448",
    appId: "1:252861477448:web:06cffec1ebaffe6e76de7d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// / Initialize Firestore
const db = getFirestore(app); // Get the Firestore instance


export { auth , db};
