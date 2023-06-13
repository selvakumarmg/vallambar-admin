import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPWz3y_yUC6-5yIrOzX9p0emPcIpVnbCQ",
  authDomain: "vallambarsamugam-60850.firebaseapp.com",
  databaseURL: "https://vallambarsamugam-60850-default-rtdb.firebaseio.com",
  projectId: "vallambarsamugam-60850",
  storageBucket: "vallambarsamugam-60850.appspot.com",
  messagingSenderId: "1068295389486",
  appId: "1:1068295389486:web:06cbc2df88a3c20fda7abf",
  measurementId: "G-XL4VNGZR4K"
};

firebase.initializeApp(firebaseConfig);

// Export the auth object
export const auth = firebase.auth();

// You can also export other Firebase services if needed
// For example:
export const db = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
