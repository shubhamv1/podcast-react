// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDYt3LA1geCfi6Vb3l5w8fF3LTUUhGs7b8",
  authDomain: "podcast-react-app.firebaseapp.com",
  projectId: "podcast-react-app",
  storageBucket: "podcast-react-app.appspot.com",
  messagingSenderId: "181334447956",
  appId: "1:181334447956:web:0e8618d76601edc52d9ac1",
  measurementId: "G-1RLLPB577B",
  databaseURL:"https://podcast-react-app-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app);

//export {auth,db,storage}
//export default app
export {app,auth,db,storage}