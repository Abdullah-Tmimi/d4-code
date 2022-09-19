import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom"
import { NavLink } from 'react-router-dom';
import  logo  from "../assits/imgs/logo.png"
import arrow from "../assits/imgs/arrow_up.svg"
import { motion, AnimatePresence } from "framer-motion"



export default function Headre() {
  const header = useRef()
  const [isActive, setIsActive] = useState(false)
  
  function goTop() {
    window.scrollTo(0,0)
  }

  function closeMenu() {
    setIsActive(false)
  }

  return (
    <>
    <div ref={header} className='header' id="#">
      <div className={isActive ? `hamburger active`: "hamburger"} onClick={() => setIsActive(prev => !prev)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul>
        <NavLink to={"/"}><li>Work</li></NavLink>
        {/* <NavLink to={"/fresh"}><li>Fresh</li></NavLink> */}
        <NavLink to={"/contact"}><li>Contact</li></NavLink>
      </ul>
      <Link to={"/"}><img className='logo'  src={logo} alt="logo" /></Link>
    </div>
      <AnimatePresence>

      {isActive &&
       <motion.div className='menu'
       initial={{
         height:0,
        }}
        animate={{
          height:"100vh"
        }}
        exit={{
          height:0
        }}
       >
        <ul>
          <NavLink onClick={closeMenu}  to={"/"}><li>Work</li></NavLink>
          {/* <NavLink onClick={closeMenu} to={"/fresh"}><li>Fresh</li></NavLink> */}
          <NavLink onClick={closeMenu} to={"/contact"}><li>Contact</li></NavLink>
        </ul>
      </motion.div>
      }

      </AnimatePresence>
      <div onClick={goTop} className='arrow' ><img src={arrow} alt="arrow"/></div>
    </>
  )
}
