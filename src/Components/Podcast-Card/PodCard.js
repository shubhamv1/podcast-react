import React from 'react'
import "./styles.css"
import { Link } from 'react-router-dom'

function PodCard({id,title,DisplayImage}) {

  return (
    <Link to = {`/podcast/${id}`}>
    <div className='podcast-card'>
      <img src={DisplayImage} className='displayimage-podcast'></img>
      <p className='title-podcast' style={{textAlign:"center"}}>{title}</p>
    </div>
    </Link>
    
  )
}

export default PodCard
