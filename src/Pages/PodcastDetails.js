import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Button from '../Components/Button'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { doc,getDoc } from "firebase/firestore"
import { auth } from '../firebase'
import { db } from '../firebase'
import { onSnapshot } from 'firebase/firestore'
import { collection, query } from "firebase/firestore"
import { toast } from 'react-toastify'
import EpisodeDetails from '../Components/EpisodeDetails.js'
import "../App.css"
import AudioPlayer from '../Components/AudioPlayer.js'


function PodcastDetails() {
const {id} = useParams()
console.log(id)

let[podcastObject,setPodcastObject] = useState({})
let[episodes,setEpisodes] = useState([])
const[playingAudio,setPlayingAudio] = useState("")
const navigate = useNavigate()

useEffect(()=>{
  if(id)
  {
    getData()
  }

  
},[id])


const getData = async ()=>{
try{

    const docRef = doc(db,"podcasts",id)
    const docSnap = await getDoc(docRef)
  
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      setPodcastObject({id: id, ...docSnap.data()})
      //toast.success("Podcast Found")
      
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      toast.error("Np Podcast Found")
      navigate("/podcast")
    }
    console.log(podcastObject)
  
  }

catch(error)
{
  toast.error(error.message)
}
}

useEffect(()=>{

  const listenAudioData = onSnapshot(
    query(collection(db, "podcasts",id,"episodes")),
    (querySnapshot)=>{
      const episodesData = [];
      querySnapshot.forEach((doc)=>{
        episodesData.push({id:doc.id,...doc.data()})
      });
       setEpisodes(episodesData)

    },
    (error)=>{
      console.error("Error fetching podcasts:",error)
    }
  )

  return()=>{
    listenAudioData()
  }
},[id])








  return (
    <div>
      <Header></Header>
      <div className='input-wrapper' style={{marginTop:"0.5rem"}}>
      {podcastObject.id && (
        
        <>
        <div style={{display:"flex",justifyContent:"space-between",width:"100%",textAlign:"center"}}>
        <h2 style={{width:"100%", textAlign:"left"}}>{podcastObject.title}</h2>
        {
          podcastObject.createdBy == auth.currentUser.uid && (

            <Button text={"Create Episode"} onClick={()=>{navigate(`/podcast/${id}/create-episode`)}} width="200px"></Button>
          )
        }
       
        </div>
        
        <div className='banner-wrapper'>
        <img src={podcastObject.BannerImage} ></img>
        </div>
        <p className='podcast-description'>{podcastObject.description}</p>
         <h2 className='podcast-title-heading'>Episodes</h2> 
         {
          episodes.length >0 ?
          (
            
              episodes.map((item,index)=>(
                <> 
              
                <EpisodeDetails  title={item.title} key={index} index={index+1} description={item.description} audioFiles={item.AudioFile} onClick={(file)=> setPlayingAudio(file)} ></EpisodeDetails>
               
               
                
                </>
              ))
            
          )
          :
            (
              <p>No Episodes Found</p>
            )
          
            
          
         }
        </>
          
         
        
      )}
      </div>
      {
        playingAudio && (
          <AudioPlayer audiosrc={playingAudio} podcasticon={podcastObject.DisplayImage}></AudioPlayer>
        )
      }
      
      
    </div>
  )
}

export default PodcastDetails
