import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDgrcmDZl_-3uSxgzhaTztajEzYhbfjK-s",
    authDomain: "tutorial-udemy-firebase.firebaseapp.com",
    projectId: "tutorial-udemy-firebase",
    storageBucket: "tutorial-udemy-firebase.appspot.com",
    messagingSenderId: "121963524917",
    appId: "1:121963524917:web:25fa864a923e733816d27c",
    measurementId: "G-EZ6RZ7XV69"
  };

const fire = firebase.initializeApp(firebaseConfig)
const auth = fire.auth()
const db = fire.firestore()
export { auth, db }