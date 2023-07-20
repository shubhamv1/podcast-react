import React from 'react'
import { Link ,useLocation} from 'react-router-dom'
import "./styles.css"


function Header() {
  
    const location = useLocation();
    const currentPath = location.pathname

  return (
    <div className='navbar'>
        <div className='gradient'></div>
        <div className='Links'>
          <Link to="/" className={currentPath == "/" ? "active": ""}>SignUp </Link>
          <Link to="/podcast" className={currentPath == "/podcast" ? "active":""}>Podcast</Link>
          <Link to="/start" className={currentPath == "/start"? "active": ""}>Start a Podcast</Link>
          <Link to="/profile" className={currentPath == "/profile"? "active": ""}>Profile</Link>
        </div>
     
    </div>
  )
}

export default Header
