import React, {useRef, useState} from 'react'

export default function Welcome() {
  const [spaceY, setSpaceY ] = useState(0)
  const head = useRef()

  window.onscroll = () => {
    setSpaceY(window.scrollY)
  }

  return (
  <div ref={head} className='welcome' style={{opacity: 1 - (spaceY * .004) }}>
    <h1> اهلاً بِك</h1>
    <p>ينتظرك المزيد في الأسفل</p>
    <span></span>
  </div>
  )
}
