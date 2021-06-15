import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.ENV,
    authDomain: process.ENV,
    projectId: process.ENV,
    storageBucket: process.ENV,
    messagingSenderId: process.ENV,
    appId: process.ENV,
    measurementId: process.ENV
  };

const fire = firebase.initializeApp(firebaseConfig)
const auth = fire.auth()
const db = fire.firestore()
export { auth, db }
