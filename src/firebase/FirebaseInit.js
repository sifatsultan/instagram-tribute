import fb from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseApp = fb.initializeApp({
    apiKey: "AIzaSyCPktHWlUZqbJ2pdfbfAkQmBOP_YWHe2e0",
    authDomain: "instagram-trinb.firebaseapp.com",
    projectId: "instagram-trinb",
    storageBucket: "instagram-trinb.appspot.com",
    messagingSenderId: "606584278207",
    appId: "1:606584278207:web:1d34b11e479dc5d195ca0a",
    measurementId: "G-L5PS0HF3GL"
  });

const db = firebaseApp.firestore();
const auth = fb.auth();
const storage = fb.storage();

export { db, auth, storage, fb };