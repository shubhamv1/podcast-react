import React,{useEffect} from "react"
import { Route,Routes, useNavigate } from 'react-router-dom'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Profile from "./Pages/Profile"
import Podcast from "./Pages/Podcast"
import CreatePodcast from "./Pages/CreatePodcast"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"
import { onAuthStateChanged } from "firebase/auth"
import { auth,db } from "./firebase"
import { setUser } from "./Slice/Userslice"
import { doc } from "firebase/firestore"
import { onSnapshot } from "firebase/firestore"
import { useDispatch } from "react-redux"
import PrivateRoute from "./Components/PrivateRoute"
import PodcastDetails from "./Pages/PodcastDetails"
import CreateEpisode from "./Pages/CreateEpisode"



function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
//As if we have already signed up user we are not going to redirect it to sign up page , using use effect to check if user already exists
// so below  whole code is about if user alredy loggeed in then show his profile there
useEffect(()=>{

  const unSubscribeAuth = onAuthStateChanged(auth,(user)=>{

    if(user)
    {
      const unSubscribeSnapShot = onSnapshot(
        doc(db,"users",user.uid),
        (userDoc)=>{
          if(userDoc.exists())
          {
            const userData = userDoc.data()

            dispatch(setUser({
              Name:userData.Name,
              Email:userData.Email,
              UID:userData.UID

            }))

           // navigate("/profile")

          }
        },
        (error)=>{
          console.log(error.message)
        }
      )

      return()=>{
        unSubscribeSnapShot()
      }
    }

  })

  return ()=>{
    unSubscribeAuth()
  }

},[])


  return (
    <div>
      <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"></ToastContainer>

      <Routes>
        <Route path="/" element={<SignUp></SignUp>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route element={<PrivateRoute></PrivateRoute>}>
          
        
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/podcast"  element={<Podcast></Podcast>}></Route>
        <Route path="/start"  element={<CreatePodcast></CreatePodcast>}></Route>
        <Route path="/podcast/:id" element={<PodcastDetails></PodcastDetails>}></Route>
        <Route path="/podcast/:id/create-episode" element={<CreateEpisode></CreateEpisode>}></Route>


        </Route>
        
      </Routes>
      
    </div>
  )
}

export default App
