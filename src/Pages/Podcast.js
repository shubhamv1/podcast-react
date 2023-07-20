import React,{useEffect, useState} from 'react'
import Header from '../Components/Header'
import { getDoc,doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useSelector,useDispatch } from 'react-redux'
import { collection, query } from "firebase/firestore"
import { setPodcast } from '../Slice/Podcastslice'
import PodCard from '../Components/Podcast-Card/PodCard'
import "../App.css";
import { auth } from '../firebase';
import Input from '../Components/Inputs'

function Podcast() {

const dispatch = useDispatch();
const getpodcast = useSelector((state)=>state.podcast.podcast)
const [search,setSearch] = useState("")
const[filtered,setFiltered] = useState(true)


useEffect(()=>{
console.log("checking for dispatch dependencies")
  const listenData = onSnapshot(
    query(collection(db, "podcasts")),
    (querySnapshot)=>{
      const podcastData = [];
      querySnapshot.forEach((doc)=>{
        podcastData.push({id:doc.id,...doc.data()})
       
      });
      console.log(podcastData[0].createdBy)
      
     
       dispatch(setPodcast(podcastData))
       
    },
    (error)=>{
      console.error("Error fetching podcasts:",error)
    }
  )
  console.log("checking for dispatch dependencies222000")
  return()=>{
    listenData()
  }
},[])


var filterData = getpodcast.filter((item)=>item.createdBy.includes(auth.currentUser.uid))
//console.log(filterData)
var filterArray = filterData.filter((item)=> item.title.toLowerCase().includes(search.toLowerCase()))
//console.log(filterArray)
 
  return (
    <div>
      <Header></Header>
      <div className='input-wrapper' style={{marginTop:"3rem"}}>
        <h2>Discover Podcasts</h2>
        <Input placeholder={"Search Podcast"} setState={setSearch} state={search} type="text"></Input>  
        
      
        {filterArray.length>0 ? (
        
          
              <div className='podcast-flex' style={{marginTop:"1.2rem"}}>
                
                
                 { filterArray.map((item)=>(
                
                <PodCard id={item.id} title={item.title} DisplayImage={item.DisplayImage} key={item.id} ></PodCard>
                 ))
                  
                }
                </div>
              
                 ):(<p> {search?"No Podcast Found":"Please Add Podcasts"}</p>)}
      
    </div>
    </div>
  )
}

export default Podcast
