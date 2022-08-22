import React from 'react'
import './Signup.css'

import {useSignup} from '../../hooks/useSignup'

import { useState } from 'react';

export default function Signup() {

  const {signup, isPending, error} = useSignup()

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const clearForm = () => {
    setFname('')
    setLname('')
    setUsername('')
    setEmail('')
    setPassword('')
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      signup(email, password, username, fname, lname)
      clearForm()
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <hr></hr>
          <div className="mb-3">
            <label>Username
            </label>
            <input type="text" className="form-control" placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-dark mt-3">
              Register
            </button>
          </div>
          <p className="forgot-password text-right">   
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  )
}
