import { motion } from 'framer-motion'
import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import deleteIcon from "../assits/imgs/trash.svg"
import db from "./Firebase"


export default function Admin({ data }) {

  function Project( { img, id } ) {
    
    function deleteProject(id) {
      deleteDoc(doc(db, "dafor", id))
    }
    return (
      <motion.div layout transition={{type:'spring'}} className='project-card'>
        <motion.div className='overlay'>
          <img onClick={() => deleteProject(id)} src={deleteIcon} className="trash-icon" alt="delete icon" />
        </motion.div>
        <div className='img' style={{backgroundImage: `url(${img})`}}/>
      </motion.div>
    )
  }




  const cards = data.map(d => <Project {...d} key={d.id} /> )
  
  return (
    <section>
      <div className='admin-container'>
        {cards}
      </div>
    </section>
  )
}
