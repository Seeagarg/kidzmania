import React from 'react'
import classes from './navbar.module.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import kidzMania from '../../images/kidzmania.png'
import  logout  from '../../Animations/logout.json'
import Lottie from 'lottie-react'
const Navbar = () => {

  const navigate = useNavigate();

  const LogOut=()=>{
    localStorage.removeItem("PIN")
    navigate('/')
  }

  

  return (
    <div className={`${classes.navbar}`}>
    <div className="image">
    <img src={kidzMania} alt="" />
    </div>
    <div>
    <button className={`${classes.btnLogout}`} onClick={LogOut}>
    <h5>LogOut</h5>&nbsp; &nbsp;
    <Lottie
      animationData={logout}
      className={`${classes.logoutAnimation}`}
    />
    </button>
    
    </div>
    </div>
  )
}

export default Navbar;
