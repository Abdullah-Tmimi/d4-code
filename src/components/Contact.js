import React, { useState } from 'react'
import emailJs from "@emailjs/browser"

export default function Contact() {
  const [responseText, setResponseText] = useState();

  const errorStyle = {
    border: "1px #e63946 solid",
    boxShadow: "0px 0px 7px 2px #e63946f0"
  }
  
  const submitForm = (e) => {
    e.preventDefault()
    let inputValidated = true;
    const formElement = e.currentTarget;
    
    const formData = {
      name: formElement.name.value,
      message: formElement.message.value,
      email: formElement.email.value
    }

    Object.entries(formData).forEach((e) => {
      const currentInput = formElement[e[0]];

      if (e[1].length <= 1) { 
        console.log("error")
        currentInput.style.boxShadow = errorStyle.boxShadow
        
        inputValidated = false;
      } else {
        currentInput.style.border = ""
        currentInput.style.boxShadow = ""
      }

      console.log(e)  
    })

    if (!inputValidated) return 

    emailJs.sendForm("service_u4deuig", "template_zks4yge", formElement, "pwlF6__6QkyVCOvcm")
    .then((res) => {
      console.log(res.status)
      console.log(res.text)
      console.log("Sent")
      setResponseText("Email sent 👍")
      formElement.name.value = ""
      formElement.message.value = ""
      formElement.email.value = ""
    }).catch((err) => {
      
      console.log(err);
    })

    console.log(formData);
  }

  return (
    <div className='contact-container'>
      <form onSubmit={submitForm} className="contact-form">
      {responseText && <h2>{responseText}</h2>}
        <label>
          <p>Name *</p>
          <input name='name' type="text" placeholder='Your Name...' />
        </label>
        <label>
          <p>Email Address *</p>
          <input name="email" type="text" placeholder='Your Email Address...' />
        </label>
        <label>
          <p>Message *</p>
          <textarea name='message' placeholder='Your Message...'/>
        </label>
        <button>Submit</button>
      </form>
    </div>
  )
}
