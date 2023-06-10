import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firebase';
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDD-TDxumOH7bXn-t-f6hIzNv9DDTMWWiU",
  authDomain: "olx-clone-react-47d31.firebaseapp.com",
  projectId: "olx-clone-react-47d31",
  storageBucket: "olx-clone-react-47d31.appspot.com",
  messagingSenderId: "574837047121",
  appId: "1:574837047121:web:195c3db7745d1f046add70",
  measurementId: "G-VMW2Y8XJRY"
};

  export default firebase.initializeApp(firebaseConfig)