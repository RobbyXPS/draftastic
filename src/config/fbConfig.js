import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC-2H75cPZzxSahxBeetwbBdAdfrNxhs-Q",
  authDomain: "draftastic-55c1a.firebaseapp.com",
  databaseURL: "https://draftastic-55c1a.firebaseio.com",
  projectId: "draftastic-55c1a",
  storageBucket: "",
  messagingSenderId: "63994024355",
  appId: "1:63994024355:web:cb878101302b3aae"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
