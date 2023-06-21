import React from 'react'
import Main from './scenes/Main'
import firebase from 'firebase/compat/app';
import { Provider } from 'react-redux';
import store from './services/redux/store';


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
const App = () => {
  return (
   <Provider store={store}>
     <Main/>
   </Provider>
  )
}

export default App