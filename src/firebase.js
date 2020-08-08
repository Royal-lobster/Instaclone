import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBqtRngXcFfq88nra9Jp7JMdFlX6ZBJuvQ",
  authDomain: "royal-lobster-instagram-clone.firebaseapp.com",
  databaseURL: "https://royal-lobster-instagram-clone.firebaseio.com",
  projectId: "royal-lobster-instagram-clone",
  storageBucket: "royal-lobster-instagram-clone.appspot.com",
  messagingSenderId: "128191372434",
  appId: "1:128191372434:web:5365c133cbe5d414e09a4b",
  measurementId: "G-3QQ5RGE5J1",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
