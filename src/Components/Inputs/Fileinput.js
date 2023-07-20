import React,{useState} from 'react'
import "./styles.css"
function Fileinput({accept,id,filehandel,name}) {

    let[uploadfile,setUploadFile] = useState(false)
    
    
const onchange = (event)=>{

  console.log(event.target.files)  
  //console.log(event.target.files.length) 
  filehandel(event.target.files[0]) 
  setUploadFile(true)
  
  //console.log(event.target.files[0].name)
}



  return (
    <>
      <label htmlFor={id} className ={`fileinput ${!uploadfile ? "label-input" : "active"}`} >{uploadfile? "Image Uploaded":`Upload ${name}`}</label>
      <input type="file" accept={accept} id={id} style={{display:"none"}} onChange={onchange} ></input>
      
    </>
    
      
      
  )
}

export default Fileinput

