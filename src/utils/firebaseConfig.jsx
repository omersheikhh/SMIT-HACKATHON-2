import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyABjAsAQ6QGr_mv-tmugsfEasl7-BhkxZY",
//   authDomain: "chat-app-c8166.firebaseapp.com",
//   projectId: "chat-app-c8166",
//   storageBucket: "chat-app-c8166.appspot.com",
//   messagingSenderId: "826985002073",
//   appId: "1:826985002073:web:4d3a3be102046ef23f6d48",
//   measurementId: "G-J5RVMPBBC8"
// };


const firebaseConfig = {
  apiKey: "AIzaSyBp5-taM1NfqBlXNgqIaYOcgH4NbUYHfbU",
  authDomain: "chat-app-531e8.firebaseapp.com",
  projectId: "chat-app-531e8",
  storageBucket: "chat-app-531e8.appspot.com",
  messagingSenderId: "206015280688",
  appId: "1:206015280688:web:cf82bfaa587bdb925cdff5",
  measurementId: "G-G4074W51HD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);