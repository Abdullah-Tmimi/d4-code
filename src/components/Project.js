import React from 'react'
import { useParams } from "react-router-dom"

export default function Project({ data }) {
  const { name } = useParams() 

  const projectData = data.filter(e => e.name === name)[0]

  return (
    <div className='project'>
      <h1>{projectData.name}</h1>
      <img src={projectData.img} alt="imag" />
    </div>
  )
}
