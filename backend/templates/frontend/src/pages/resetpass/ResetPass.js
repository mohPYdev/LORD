import React, {useState, useEffect} from 'react'
import {useFetch} from '../../hooks/useFetch'
import {LocalUrl} from '../../urls/urls'

export default function ResetPass() {

  const [email,
    setEmail] = useState('')
  const [data,
    setData] = useState(false)

    
  const handleSubmit = async(e) => {
    e.preventDefault()
    const options = {
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email}),
    }
    const res = await fetch(LocalUrl + 'auth/users/reset_password/', options)
    if (res.status === 204){
      setData(true)
      console.log(res.status)
    }

    else
      setData(false)
  }


  return (
    <div className="auth-wrapper login">
      <div className="auth-inner">
        {data && <h4>check your email</h4>}
        {!data && <> 
          <p>Please enter your email address</p>
          <form className='mt-3' onSubmit={handleSubmit}>
              <input className='form-control' type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email'/>
              <button className='btn btn-dark mt-3' type='submit'>Submit</button>
          </form>
        </>}
      </div>
    </div>

  )
}
