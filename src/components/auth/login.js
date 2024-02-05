import React, { useState } from 'react'
import Navbar from '../navbar/navbar'
import { useNavigate } from 'react-router-dom'
import './login.css';
import kidzmania from '../../images/kidzmania.png'
import giphy from '../../images/giphy.gif'
import login from '../../Animations/login.json'
import Lottie from 'lottie-react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Login = () => {

  const url = "https://tsel.kiddzmania.com/api/v1/login"

  const navigate = useNavigate();

  const [pin,setPin] = useState("");


  const Submit=async()=>{
    const data = {PIN: pin}

    console.log("pin  ",pin)
    console.log("url",url,"data",data);
    const response =await axios.post(url,data)
    console.log("response",response.data)
    if(response.data.message == "Login Successfully"){
      localStorage.setItem("PIN",pin)
      navigate('/home')
    }
    if(response.data.message == "Invalid PIN"){
      alert("Incorrect Pin")
    }
    
  }





  
  return (
    <div className="loginContainer">
    <div className="main bg-black">
    <motion.div
    initial={{y:"-1000px"}}
    animate={{y:"0px"}}
     className="container-1">
    <Lottie
      animationData={login}
      className='image'
    />
    </motion.div>
    <div className="container-2">
    <div className="form">
    <div className="logo">
    <motion.img
    initial={{x:"2000px"}}
    animate={{x:"0"}}
     className='logo-image' src={kidzmania} alt="" />
    </div>
    
    <div className="input">
      <label>Enter Pin</label><br />
      <input type="text" className='input-box' value={pin} onChange={(e)=>{setPin(e.target.value)}} />
    </div>
    <div className="btn-submit">
      <button className='btn' onClick={Submit}>Submit</button>
    </div>
    </div>
    
    </div>
    </div>
  </div>
  )
}

export default Login
