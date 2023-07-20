import React,{useState} from 'react'
import Input from '../Components/Inputs'
import Header from '../Components/Header'
import Button from '../Components/Button'
import { auth,db,storage } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {  signInWithEmailAndPassword } from "firebase/auth";
import "../App.css"
import { getDoc,doc } from 'firebase/firestore'
import { setUser } from '../Slice/Userslice'
import { toast } from 'react-toastify'
function Login() {
   
    
    let[email,setEmail] = useState("")
    let[password,setPassword] = useState("")
    let[loading,setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const login = async ()=>{

      setLoading(true)

      if(email && password)
      {
        try{
          const loggedUser = await signInWithEmailAndPassword(auth,email,password)
          const user = loggedUser.user
          
  
          const userDoc = await getDoc(doc(db,"users",user.uid))  //this get doc is retreveiwing that data added to collecction while sigging up
            
            const userData = userDoc.data()
            //console.log("UserData",userData)
  
            dispatch(setUser({
              Name:userData.Name,
              Email:userData.Email,
              UID:userData.UID
            }))
  
            navigate("/profile")
            setLoading(false)
          }
          catch(error)  {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
            toast.error("Incorrect Password")
            setLoading(false)
            
          };
      }
      else{
        setLoading(false)
        toast.error("Please Enter Details")
      }
   
      

      
      

    }
    // {
    //     console.log("hello how are khana kha ke jana")
    // }

    function signup()
    {
        navigate("/")
    }
  return (
    <div>
        
      <Header></Header>
      <div className='input-wrapper'>
        <h1 style={{textAlign:"center",fontSize:"1.5rem" ,fontWeight:"500"}}>Login</h1>
        
        <Input state={email} setState={setEmail} placeholder={"Email Id"} type="email" required={true}></Input>
        <Input state={password} setState={setPassword} placeholder={"Password"} type="text" required={true}></Input>
       
        <Button text={loading?"Loading...":"Login"} onClick={login} disable={loading}></Button>
        <p style={{cursor:"pointer"}} onClick = {signup} >Don't Have Account? Click Here to SignUp</p>
      </div>
    </div>
  )
}

export default Login

