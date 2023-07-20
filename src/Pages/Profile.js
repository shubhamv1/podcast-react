import React from 'react'
import { useSelector } from 'react-redux'
import {signOut } from "firebase/auth";
import { auth } from '../firebase';
import Header from '../Components/Header'
import Button from '../Components/Button';
import Input from '../Components/Inputs';
function Profile() {

    const userStore = useSelector((state)=> state.user.user)

    const handelLogout = ()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });

          

    }
    //console.log(selector)
    if(!userStore){
    
      return <p>Loading....</p>
    }
  return (
    <div>
        <Header></Header>
        <div className='input-wrapper'>
        <h1 style={{textAlign:"center",fontSize:"1.5rem" ,fontWeight:"500"}}>Profile</h1>
        <Input type="text"  placeholder={userStore.Name} edit={true}></Input>
        <Input type="text"  placeholder={userStore.Email} edit={true}></Input>
        <Input type="text"  placeholder={userStore.UID} edit={true}></Input>
      {/* <h1>{userStore.Name}</h1>
      <h1>{userStore.Email}</h1>
      <h1>{userStore.UID}</h1> */}
       
       <Button text={"Logout"} onClick={handelLogout}></Button>
      
    </div>
    </div>
  )
}

export default Profile
