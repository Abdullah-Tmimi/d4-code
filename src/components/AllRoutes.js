import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Route, useLocation, Routes } from "react-router-dom"
import { collection, onSnapshot } from 'firebase/firestore';
import db from './Firebase';
import Welcome from "./Welcome"
import Projects from "./Projects"
import Footer from "./Footer";
import Project from "./Project";
import ADD_PROJECT from "./ADD_PROJECT";
import Contact from "./Contact"
import Admin from "./Admin"

export default function AllRoutes() {
  const location = useLocation()

  const fadeInOut = {
    fadeIn: {
      opacity:1
    },
    fadeOut: {
      opacity:0 // -1 try this
    }
  }
  const [data, setData] = useState()

  useEffect(() => {
    onSnapshot(collection(db, "dafor"), (res) => {
      setData(res.docs.map(e => (  {...e.data(), id: e.id}  )))
    })
  },[])


  const EntryAnimation = ({elements}) =>
   <motion.div
    variants={fadeInOut}
    initial="fadeOut"
    animate="fadeIn"
    exit="fadeOut">{elements}</motion.div>

  return (
    <AnimatePresence exitBeforeEnter={true}>
      <Routes location={location} key={location.pathname} >
        <Route path="/" element={
        <EntryAnimation elements={<><Welcome /> { data && <Projects data={data} /> } <Footer /></>} />
        }/>
        <Route path="/projects/:name" element={
        <EntryAnimation elements={<>{data && <Project data={data} />}<Footer /></>}/>
        }/>
        <Route path="/contact" element={<EntryAnimation elements={<><Contact /></>}/>
        }/>
       <Route path="/add" element={ <EntryAnimation elements={ <ADD_PROJECT />}/>}/>
       <Route path="/admin" element={<EntryAnimation elements={<> <ADD_PROJECT /> { data && <Admin data={data}/> } <Footer /> </>}/>}/>
      </Routes>
      </AnimatePresence>
  )
}
