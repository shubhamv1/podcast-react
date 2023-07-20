import React, { useRef,useState,useEffect } from 'react'
import "./styles.css"
import {FaPlay,FaPause,FaVolumeUp,FaVolumeMute} from 'react-icons/fa'

function AudioPlayer({audiosrc,podcasticon}) {
    const audioRef = useRef()
    const[isPlaying,setIsPlaying] = useState(true) 
    const[ismute,setIsMute] = useState(true)
    const[duration,setDuration] = useState("")
    const[volume,setVolume] = useState("")


    const handelRange = (event)=>{
      setDuration(event.target.value)
    }

    const togglePlay = ()=>{
      if(isPlaying){
      
         setIsPlaying(false)
      }
      else{
        
        setIsPlaying(true)
      }
    }
    const toggleMute = ()=>{
      if(ismute){
      
         setIsMute(false)
      }
      else{
        
        setIsMute(true)
      }
    }

    const handelVolume = (event)=>{
      setVolume(event.target.value)
      audioRef.current.volume = event.target.value
    }

    useEffect(()=>{

      if(isPlaying)
      {
        audioRef.current.play()
      }
      else{
        audioRef.current.pause()
      }

    },[isPlaying])

    useEffect(()=>{

      if(ismute)
      {
        audioRef.current.volume = 1;
        setVolume(1)
      }
      else{
        audioRef.current.volume = 0
        setVolume(0)
      }

    },[ismute])

  return (
    <div className='custom-audio-player'>
      <img src={podcasticon} className='podcast-icon'></img> 
      <audio ref={audioRef} src={audiosrc}></audio>
      
      <p onClick={togglePlay}>{
        isPlaying?<FaPause></FaPause>:<FaPlay></FaPlay>
      }</p>
      
      <div className='duration-timer'>
        
        <p style={{fontSize:"12px"}}>0:00</p>
        <input type="range" onChange={handelRange}  className='duration-range'></input>
        <p style={{fontSize:"12px"}}>-21:00</p>
        <p onClick={toggleMute}>{
        ismute?<FaVolumeUp></FaVolumeUp>:<FaVolumeMute></FaVolumeMute>
      }</p>
       <input type="range" value={volume} max={1} min={0} step={0.01}  onChange={handelVolume}  className='duration-volume'></input>
      </div>
     
      

    </div>
  )
}

export default AudioPlayer
