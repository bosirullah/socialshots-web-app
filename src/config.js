import { initializeApp } from 'firebase/app';
// import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth'; 

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBYobYaoxR2lsKO-Vuqlkw8Cd30oI7GYh0",
    authDomain: "social-shots-9f1a6.firebaseapp.com",
    projectId: "social-shots-9f1a6",
    storageBucket: "social-shots-9f1a6.appspot.com",
    messagingSenderId: "407778492450",
    appId: "1:407778492450:web:3418501a75f4923e3b8a7b",
    measurementId: "G-N415QGBG10",
    databaseURL: "https://social-shots-9f1a6-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const storage = getStorage(app);

export {db,auth,storage};

