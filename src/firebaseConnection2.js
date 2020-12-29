import firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
  apiKey: "-",
  authDomain: "-",
  databaseURL: "-",
  projectId: "-",
  storageBucket: "-",
  messagingSenderId: "-",
  appId: "-"
};
  // Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
