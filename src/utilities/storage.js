import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyByeS4duLSFDYFY0Y5ZqrnjBod4a1aHo5k",
  authDomain: "img-logic.firebaseapp.com",
  projectId: "img-logic",
  storageBucket: "img-logic.appspot.com",
  messagingSenderId: "791192255509",
  appId: "1:791192255509:web:5fcd4036c94676ce2de21c",
  measurementId: "G-7L00TDHTMB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };