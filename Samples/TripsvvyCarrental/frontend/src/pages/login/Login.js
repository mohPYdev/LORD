import React, {useState} from 'react';
import './Login.css'

import { useLogin } from '../../hooks/useLogin'

const Login = () => {

  const {login, isPending, error} = useLogin()

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

    <div className="auth-wrapper login">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>login</h3>
          <div className="mb-3">
            <label>username</label>
            <input type="text" className="form-control" placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
          </div>
          <div className="mb-3">
            <label>password</label>
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary">
              login
            </button>
          </div>
          <p className="forgot-password text-right">
            <a href='#'>
               forgot password ?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
