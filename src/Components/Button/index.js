import React from 'react'
import "./styles.css"
function Button({onClick,text,disable,width,height}) {
  return (
    <div>
      <div onClick={onClick} className='btn' disable={disable} style={{width:width}}>{text}</div>
    </div>
  )
}

export default Button
