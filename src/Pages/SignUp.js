import React,{useState} from 'react'
import Input from '../Components/Inputs'
import Header from '../Components/Header'
import Button from '../Components/Button'
import { auth,db,storage } from '../firebase'
import { useDispatch } from 'react-redux'
import { setDoc,doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"


import { useNavigate } from 'react-router-dom'
import "../App.css"
import { setUser } from '../Slice/Userslice'


function SignUp() {
   
    let[name,setName] = useState("")
    let[email,setEmail] = useState("")
    let[password,setPassword] = useState("")
    let[confirmpassword,setConfirmpassword] =useState("")
    let[loading,setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handelogin  = async ()=>{

      setLoading(true)

      if(password==confirmpassword && password.length>=6)
      {
        try{
          //Creating a User
       const userDetails = await  createUserWithEmailAndPassword(
         auth,
         email,
         password
         )
     
           const user = userDetails.user
           console.log("My User",user)
     
           //Add user details to firebase database
           await setDoc(doc(db,"users",user.uid),{    //setdoc is setting document which is storing data in firestore db as a collection name of "users"
             Name:name,                               //and document  is uniquely identified by uid
             Email:email,
             UID:user.uid
           })
       
         //now dispatch the data to redux store
         dispatch(setUser({
           Name:name,
           Email:email,
           UID:user.uid
         }))
           

         navigate("/profile")
         setLoading(false)
         toast.success("User has been Successfully Created")
     
     }   
     catch(error)  {
               const errorCode = error.code;
               const errorMessage = error.message;
               console.log(errorCode)
               console.log(errorMessage)
               
             };
         }

         else{

          if(password !== confirmpassword)
          {
            toast.error("Your Password Doesnot Matches")
          }
          
         
         else if(password.length<6)
         {
          toast.error("Your Password is Weak")
         }
      }
      setLoading(false)
    }



    function login()
    { 
        navigate("/login")
    }
  return (
    <div>
        
      <Header></Header>
      <div className='input-wrapper'>
        <h1 style={{textAlign:"center",fontSize:"1.5rem" ,fontWeight:"500"}}>SignUp</h1>
        <Input state={name} setState={setName} placeholder={"Full Name"} type="text" required={true}></Input>
        <Input state={email} setState={setEmail} placeholder={"Email Id"} type="email" required={true}></Input>
        <Input state={password} setState={setPassword} placeholder={"Password"} type="text" required={true}></Input>
        <Input state={confirmpassword} setState={setConfirmpassword} placeholder={"Confirm Password"} type="password" required={true}></Input>
        <Button text={loading?"Loading....":"SignUp"} onClick={handelogin} disable={loading}></Button>
        <p style={{cursor:"pointer"}} onClick={login}>Already Have Account? Click Here to Login</p>
      </div>
    </div>
  )
}

export default SignUp
