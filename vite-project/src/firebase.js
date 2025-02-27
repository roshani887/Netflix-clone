
import { initializeApp } from "firebase/app";
import { 
     createUserWithEmailAndPassword,
     getAuth,
     signInWithEmailAndPassword,
     signOut} from "firebase/auth";
import {
    addDoc,
    collection, 
    getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyB1pr769S1fAX7CdyKt2R0KGLJi_-wehsM",
  authDomain: "netflix-clone-8f85c.firebaseapp.com",
  projectId: "netflix-clone-8f85c",
  storageBucket: "netflix-clone-8f85c.firebasestorage.app",
  messagingSenderId: "917641291044",
  appId: "1:917641291044:web:630ae61b64fb8e4fffffb1",
  measurementId: "G-VYZYN1X7WN"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
      try {
     const res =   await createUserWithEmailAndPassword(auth,email,password);
     const user = res.user;
     await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider:"local",
        email,
     });
      } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(""));
      }
}

const login = async (email,password)=>{
    try {
         await signInWithEmailAndPassword(auth, email, password);
      }  catch (error) {
        console.log(error);
        alert(error)
        toast.error(error.code.split('/')[1].split('-').join(""));
       }        
    } 


const logout = ()=>{
     signOut(auth);
}
export {auth, db, login, signup, logout};