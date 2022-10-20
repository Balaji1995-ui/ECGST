import React,{useState} from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Login from "./Component/Login";
import Register from "./Component/Register";
import {Route,Routes} from "react-router-dom";
import Home from "./Component/Home";
import Forget from "./Component/Forget";
import ScrolltoTop from "./Component/ScrolltoTop";
import Backup from "./Component/backup";

const App=()=> {

  const [user, setUser]=useState(false);
  // const [viewOtpForm, setViewOtpForm]=useState(false);



  const firebaseConfig = {
    apiKey: "AIzaSyBiOYuA3lYXfvZFY3DhmZCvLRJIfZ8v-qw",
    authDomain: "react-contactform-ac03d.firebaseapp.com",
    projectId: "react-contactform-ac03d",
    storageBucket: "react-contactform-ac03d.appspot.com",
    messagingSenderId: "856591891080",
    appId: "1:856591891080:web:31110b237cc21bc38a7d3d"
  };



  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  const auth = firebase.auth();

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    }
  });

  const otpSubmit = (e) => {
    e.preventDefault();
    let opt_number = e.target.otp_value.value;
    window.confirmationResult
      .confirm(opt_number)
      .then((confirmationResult) => {
        console.log(confirmationResult);
        console.log("success");
     window.open("/", "_self");
    
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        alert(error.message);
      });
  };



  return(
    <>
    <Routes>
      <Route path="/Forget" element={<Forget/>}></Route>
      <Route path="/backup" element={<Backup/>}></Route>
      <Route path="/" element={<Login  title="login"/>}/>
      <Route path="/home" element={<Home   />}></Route>
      <Route path="/Login" element={<Login  scrolltoTop={ScrolltoTop}/>}/>
      <Route path="/Register" element={<Register 

       otpSubmit={otpSubmit}
       auth={auth}
      />}/>
    </Routes>
    </>
  )
}

export default App

