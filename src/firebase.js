// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDWzk2AgMxRaWs16AuxThU7rONQRP3Tg0U",
    authDomain: "hsvp-41c45.firebaseapp.com",
    databaseURL: "https://hsvp-41c45-default-rtdb.firebaseio.com",
    projectId: "hsvp-41c45",
    storageBucket: "hsvp-41c45.appspot.com",
    messagingSenderId: "1092739596712",
    appId: "1:1092739596712:web:4e6d5f07b353038bb11d9d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


export default app;