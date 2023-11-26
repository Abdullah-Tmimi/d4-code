import React, { useEffect, useState, useRef } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import db from './Firebase';
import { storage } from './Firebase';
import { useNavigate } from 'react-router-dom';

export default function ADD_PROJECT() {

  const [imgSours, setImgSours] = useState()
  const imgInput = useRef()
  const [isError, setIsError] = useState(false)
  const goTo = useNavigate()


  const [formData, setFormData] = useState({
    name:"",
    date:"",
    img:""
  })

  useEffect(() => {
    setFormData(prev => ({...prev, img:imgSours}))
  },[imgSours])


  function dataHandler(event) {
    setFormData(prev => ({
      ...prev,
      [event.target.name]:event.target.name === "img" ? null : event.target.value
    }))
  }

  function uploadFile(event) {
    if (!event.target.files[0]) return;

    const file = event.target.files[0]
    const refrance = ref(storage, `images/${file.name}_${file.size}`)
    uploadBytes(refrance, file)
    getDownloadURL(refrance).then(res => setImgSours(res))
    
  }
  function addProject() {
    if (formData.date.length > 1 && formData.name.length > 1 && formData.img.length > 1 ) {
      addDoc(collection(db, "dafor"),formData)
      goTo("/")
      setIsError(false)      
    }else {
      setIsError(true)
    }
  }

  const checkError = {
    borderColor:isError && "#ee4040"
  }

  return (
    <div className='add-form'>
      <div className='row-1'>
        <label >
          <p>Project Name</p>
          <input onChange={dataHandler} onKeyPress={e => e.key === "Enter" && addProject()} style={checkError} placeholder="Project name" type="text" name='name' value={formData.name}/>
        </label>
        <label>
          <p>Finsh Date </p>
          <input onChange={dataHandler} onKeyPress={e => e.key === "Enter" && addProject()} style={checkError} placeholder="2000/0/0" type="text" name='date'/>
        </label>
      </div>
      <label className='row-2'>
        { imgSours && <img src={imgSours} alt="imag" /> }
        <p>upload image</p>
        <input ref={imgInput} onChange={(e) => {
          if (imgSours) return;
          uploadFile(e)
          dataHandler(e)
          }} type="file"  name="img" accept='images' />
      </label>
      
      <button onClick={addProject}>Add</button>
    </div>
  )
}
