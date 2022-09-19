import React from 'react'

export default function Contact() {
  return (
    <div className='contact-container'>
      <div className="contact-form">
        <label>
          <p>Name *</p>
          <input type="text" placeholder='Your Name...' />
        </label>
        <label>
          <p>Email Address *</p>
          <input type="text" placeholder='Your Email Address...' />
        </label>
        <label>
          <p>Message *</p>
          <textarea placeholder='Your Message...'/>
        </label>
        <button>Submit</button>
      </div>
    </div>
  )
}
