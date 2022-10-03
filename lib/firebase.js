// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyAYcEl7laBDcHIoJ0hVQ0hytg3zM9cE3Ek",
  authDomain: "snapmed-c6009.firebaseapp.com",
  databaseURL: "https://snapmed-c6009-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "snapmed-c6009",
  storageBucket: "snapmed-c6009.appspot.com",
  messagingSenderId: "863816787220",
  appId: "1:863816787220:web:5be202bba098e9ad514e01"
});

export const auth = app.auth();
export default app;