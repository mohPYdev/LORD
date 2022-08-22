import React, {useState} from 'react';
import './Login.css'

import { useLogin } from '../../hooks/useLogin'

const Login = () => {

  const {login} = useLogin()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  const clearForm = () => {
    setUsername('')
    setPassword('')
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      login(username, password)
      clearForm()
  }




  return (

    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <hr></hr>
          <div className="mb-3">
            <label>Username</label>
            <input type="text" className="form-control" placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-dark mt-3">
              login
            </button>
          </div>
          <p className="forgot-password text-right">
            <a href='#'>
              Forgot your password ?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
