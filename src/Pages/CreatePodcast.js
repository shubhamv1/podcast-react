import React,{useState} from 'react'
import Header from '../Components/Header'
import Input from '../Components/Inputs'
import Button from '../Components/Button'
import Fileinput from '../Components/Inputs/Fileinput'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {uploadBytes,ref, getDownloadURL} from "firebase/storage"
import { getStorage } from 'firebase/storage'
import { auth,db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'
function CreatePodcast() {

    let[podcastTitle,setPodcastTitle] = useState("")
    let[podcastdescription,setPodcastTDescription] = useState("")
    let[displayimg,setDisplayImage] = useState()
    let[bannerimg,setBannerImage] = useState()
    let[loading,setLoading] = useState(false)
    const storage = getStorage()
    const navigate =  useNavigate()


    const handeSubmit = async()=>{

      // toast.warn("Handling Form")

      if(podcastTitle && podcastdescription && displayimg &&  bannerimg)
      {
            setLoading(true)
        try{

        //upload banner and diplay image file in firebase storage
        const  bannerImageRef = ref(storage,`Podcast/${auth.currentUser.uid}/${Date.now()}` )                            

        const banneruploaded = await uploadBytes(bannerImageRef, bannerimg)
        
         //Now after upload images to firebase storage we need to create downloadable url which we use publivally
        const downloadURL =  await getDownloadURL(bannerImageRef)
        console.log(downloadURL)

        //same for displayimage upload
        const  displayImageRef = ref(storage,`Podcast/${auth.currentUser.uid}/${Date.now()}` )

        const displayuploaded = await uploadBytes(displayImageRef, displayimg)

        const downloaddisplayURL =  await getDownloadURL(displayImageRef)

        console.log(downloaddisplayURL)

        //Now we will create document name podcst in firebase db 

        const podcastData = {
          title:podcastTitle,
          description:podcastdescription,
          createdBy: auth.currentUser.uid,
          BannerImage: downloadURL,
          DisplayImage:downloaddisplayURL
        }
           
         const docRef = await addDoc(collection(db,"podcasts"),podcastData)

         //after that set all the input field null or empty

         setPodcastTitle("")
         setPodcastTDescription("")
         setBannerImage(null)
         setDisplayImage(null)
           
         setLoading(false)

         toast.success("Podcast has been Created ")
         navigate("/podcast")
          
        }
        catch(e)
        {
          toast.error(e.message)
          console.log(e.message)
          setLoading(false)
        }

       
      }
      else{
        toast.error("Please Fill Complete Details")
        setLoading(false)
      }
     
    }

    const bannerimage = (file)=>{
      
        setBannerImage(file)
        console.log(file)
    }

    const displayimage = (file)=>{
      setDisplayImage(file)
      console.log(file)
    }
    

  return (
    <div>
       <Header></Header>
      <div className='input-wrapper'>
        <h1 style={{textAlign:"center",fontSize:"1.5rem" ,fontWeight:"500"}}>Create Podcast</h1>
        <Input state={podcastTitle} setState={setPodcastTitle} placeholder={"Podcast Title"} type="text" required={true}></Input>
        <Input state={podcastdescription} setState={setPodcastTDescription} placeholder={"Podcast Description"} type="text" required={true}></Input>
        {/* <Input state={displayimg} setState={setDisplayImage} placeholder={"Display Image"} type="file" required={true}></Input> */}
        <Fileinput accept="image/*" id="banner-image-input" filehandel={bannerimage} name={"Banner Image"} ></Fileinput>
        <Fileinput accept="image/*" id="display-image-input" filehandel={displayimage} name={"Display Image"}></Fileinput>
        <Button text={loading?"Loading...":"Create Now"} onClick={handeSubmit} disable={loading}></Button>
        </div>
    </div>
  )
}

export default CreatePodcast

