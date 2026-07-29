import React, { useState } from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup function executed", email);
    let responseData;
    await fetch('http://localhost:4000/newsletter', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
    .then((response) => response.json())
    .then((data) => responseData = data);

    if (responseData.success) {
      alert(responseData.message);
      setEmail("");
    } else {
      alert(responseData.errors);
    }
  }

  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated </p>
      <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Your Email' required />
      <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

export default NewsLetter;