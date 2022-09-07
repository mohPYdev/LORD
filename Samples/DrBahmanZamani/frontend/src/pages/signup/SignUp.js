import React from 'react'
import './SignUp.css'

import {useSignup} from '../../hooks/useSignup'

import {useState} from 'react';

export default function SignUp() {

  const {signup, isPending, error} = useSignup()

  const [fname,
    setFname] = useState('');
  const [lname,
    setLname] = useState('');
  const [username,
    setUsername] = useState('');
  const [email,
    setEmail] = useState('');
  const [password,
    setPassword] = useState('');
  const [phone_number,
    setPhoneNumber] = useState('');

  const clearForm = () => {
    setFname('')
    setLname('')
    setUsername('')
    setEmail('')
    setPassword('')
    setPhoneNumber('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, username, fname, lname, phone_number)
    clearForm()
  }

  return (
    <div className="auth-wrapper signup">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign up</h3>

          <div className='row mt-4'>
            <div className='col'>
              <div className="mb-3">
                <label>
                  username
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}/>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label>email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label>password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label>Phone number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="phone number"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}/>
              </div>
            </div>
          </div>
          <div className="d-grid mt-3">
            <button type="submit" className="btn btn-primary">
              register
            </button>
          </div>
          <p className="forgot-password text-right">
            already registered?
            <a href='#'>login</a>
          </p>
        </form>
      </div>
    </div>
  )
}
