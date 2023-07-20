import React from 'react'
import Button from '../Button'
import "./styles.css"
function EpisodeDetails({title,description,audioFiles,onClick,index}) {
  return (
    <div style={{width:"100%"}}>
      <h3 style={{textAlign:"left",marginBottom:"0px"}}>{index}. {title}</h3>
      <p style={{textAlign:"left",fontSize:"13.5px",paddingLeft:"20px"}} className='episode-description'>{description}</p>
      <Button text="Play" onClick={()=>onClick(audioFiles)} width={"60px"} ></Button>
    </div>
  )
}

export default EpisodeDetails
