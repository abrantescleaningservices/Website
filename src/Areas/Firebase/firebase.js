import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import getStorage

const firebaseConfig = {
    apiKey: "AIzaSyD0uqH37so4-YKNOd-jNzErxDEgHG0c34U",
    authDomain: "abrantescs-8ab12.firebaseapp.com",
    projectId: "abrantescs-8ab12",
    storageBucket: "abrantescs-8ab12.appspot.com",
    messagingSenderId: "25517173240",
    appId: "1:25517173240:web:836926e1fb020207138e0d",
    measurementId: "G-FNHXVHYXLS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { db, storage };