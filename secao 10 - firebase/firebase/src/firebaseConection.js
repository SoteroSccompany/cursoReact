

import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcVrS-aJnFlauUGSPzcKwURQFnwkC40PI",
    authDomain: "aulafirebase-54330.firebaseapp.com",
    projectId: "aulafirebase-54330",
    storageBucket: "aulafirebase-54330.appspot.com",
    messagingSenderId: "244676320263",
    appId: "1:244676320263:web:f3b1ddd52e3bdb14819ea2"
  };

const firebaseapp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseapp)
const auth = getAuth(firebaseapp)

export {db, auth}