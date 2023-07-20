import React,{useState} from 'react'
import Header from '../Components/Header'
import Input from '../Components/Inputs';
import Fileinput from '../Components/Inputs/Fileinput';
import Button from '../Components/Button';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDownloadURL, uploadBytes,ref } from 'firebase/storage';
import { auth,storage,db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';



function CreateEpisode() {

    const {id} = useParams()

    let[title,setTitle] = useState("");
    let[description,setDescription] = useState("")
    let[audiofile,setAudiofile] = useState()
    let[loading,setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch =  useDispatch()

const audiofileHandel = (file)=>{

    setAudiofile(file)
    console.log(file)
}

const episodehandel = async()=>{
    setLoading(true)

    if(title && description && audiofile){

        try{
  
            const audioRef = ref(storage,`podcast-episodes/${auth.currentUser.uid}/${Date.now()}`)
            await uploadBytes (audioRef,audiofile)
            const audioURL = await getDownloadURL(audioRef)
            const episodeData = {
                title:title,
                description : description,
                AudioFile: audioURL
            }
            await addDoc(
                collection(db,"podcasts",id,"episodes"),
                episodeData
            )
          toast.success("Your Episode has been Created")
          setLoading(false)
          navigate(`/podcast/${id}`)
          setTitle("")
          setDescription("")
          setAudiofile()
        }catch(error){
            toast.error(error.message)
            setLoading(false)
        }
    
        
      
        
    }
    else{
     toast.error("Please Fill All Details")
     setLoading(false)
    }
    
     
}



  return (
    <div>
      <Header></Header>
      <div className='input-wrapper'>
      <h2>Create An Episode</h2>
      <Input state={title} setState={setTitle} placeholder={"Title"} type="text" required={true}></Input>
    <Input state={description} setState={setDescription} placeholder={"Description"} type="text" required={true}></Input>
    <Fileinput accept="audio/*" id="audio-file-input" filehandel={audiofileHandel} name={"Audio File"} ></Fileinput>
    <Button text={loading?"Loading....":"Create Episode"} onClick={episodehandel} disable={loading}></Button>


      </div>
      
    </div>
  )
}

export default CreateEpisode

