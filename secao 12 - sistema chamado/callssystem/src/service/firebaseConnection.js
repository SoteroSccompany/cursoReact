import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyTdP1mMJrfCvT4Fos9kvk8_khC7ZWV98",
  authDomain: "callsystem-28a73.firebaseapp.com",
  projectId: "callsystem-28a73",
  storageBucket: "callsystem-28a73.appspot.com",
  messagingSenderId: "259106981760",
  appId: "1:259106981760:web:22765dea7eb61329bae365"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;