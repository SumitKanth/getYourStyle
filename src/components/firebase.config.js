import { initializeApp } from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDi1Ue5NJ_YfzfFojVwmtRD0YfY4LbgDZk",
  authDomain: "admin-auth-b887f.firebaseapp.com",
  projectId: "admin-auth-b887f",
  storageBucket: "admin-auth-b887f.appspot.com",
  messagingSenderId: "105577141435",
  appId: "1:105577141435:web:0f5d342cffbce9e597459e",
  measurementId: "G-HJS4JVCBDV"
};


const app = initializeApp(firebaseConfig);

export {app};