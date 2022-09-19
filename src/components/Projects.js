import React from 'react'
import PROJECT_CARD from './PROJECT_CARD'

export default function Projects({ data }) {

  const cards = data.map(e => <PROJECT_CARD key={e.id} {...e} /> )
  
  return (
    <div className='projects-container'>
      {cards}    
    </div>
  )
}
