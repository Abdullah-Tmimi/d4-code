import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Project_Card({img, id, date, name}) {
  return (
    <Link to={`/projects/${name}`}>
      <motion.div className='project-card'
        initial={{opacity:0}}
        animate={{opacity:1}}

      >
        <div className='overlay' />
        <div className='img' style={{backgroundImage: `url(${img})`}} />
        <div className='card-footer'>
          <h3>{name}</h3>
          <p>{date}</p>
        </div>
      </motion.div>
    </Link>
  )
}
