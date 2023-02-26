import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {initializeApp} from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, getDoc, getFirestore, query, onSnapshot, updateDoc, setDoc, doc, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import SignIn from './components/SignIn';
import ChatRoomsList from './components/ChatRoomsList';
import SignOut from './components/SignOut';

const firebaseConfig = {
  apiKey: "AIzaSyD4zRINg7Kdci1bjPgL5-vedbZ6frmTX9U",
  authDomain: "chatapp-dd6a6.firebaseapp.com",
  projectId: "chatapp-dd6a6",
  storageBucket: "chatapp-dd6a6.appspot.com",
  messagingSenderId: "1028266815760",
  appId: "1:1028266815760:web:fbb7fb0748ca9dfd0eb595"
};

const myFirebase = initializeApp(firebaseConfig)
const auth = getAuth(myFirebase);
const db = getFirestore(myFirebase);
let previousUserUID;


function App() {
  const [user] = useAuthState(auth);

  // const usersList = [];

  // Une piste de solution serait de partir sur des custom hooks comme useCallBack pour gérer 
  //  useEffect(() => {
  //     const colRef = collection(db, "users")
  //     //real time update
  //     onSnapshot(colRef, (snapshot) => {
  //         snapshot.docs.forEach((doc) => {
  //             setUsers(() => doc.data())
  //             console.log(users);
  //         })
  //     })
  //   }, [users, setUsers])


  //Firebase veut que je parte sur Node.js pour gérer les utilisateurs xD 
  //et le async aime pas le setState sans promesse donc voilà !

  return (
    <div className="App">
      <header>
      </header>
      <section>
        <>
        <div>{user? <SignOut auth={auth}/>: null}</div>
        <div>
        {user ? <ChatRoomsList user={user} firestore={db} auth={auth}/> : < SignIn auth={auth} firebase={myFirebase}/>}
        </div>
        </>
      </section>
    </div>
  )
}

export default App
