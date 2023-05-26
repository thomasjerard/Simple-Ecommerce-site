//create a firebase config object for the eommerce1 app
//this is the config object that is used to initialize firebase
//I need to store images and other data in firebase

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDPPDksoceICbeWnClRgc5qdgm6IXAOSRI",
    authDomain: "clone-d23e2.firebaseapp.com",
    projectId: "clone-d23e2",
    storageBucket: "clone-d23e2.appspot.com",
    messagingSenderId: "1097555910711",
    appId: "1:1097555910711:web:31e3dbbf4a9dc263089fb2"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
