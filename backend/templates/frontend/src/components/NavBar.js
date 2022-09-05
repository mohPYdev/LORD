import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout} from '../hooks/useLogout'

export default function NavBar() {

  const {user} = useAuthContext()
  const {logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <a class="navbar-brand" href="/">
              <img src="logo.jpg" width="40" height="40" alt="" />
            </a>
            <Link className="navbar-brand" to={'/login'}>
               Sina Hospital
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                  { user && 
                  <Link className='nav-link' to={'/home'}>
                   home
                  </Link>}

                </li>
                
                <li className="nav-item">
                  { !user ? <Link className="nav-link" to={'/login'}>
                    login
                  </Link> 
                  :
                  <Link className='nav-link' to={'/profile'}>
                   Profile
                  </Link>}

                </li>
                <li className="nav-item">
                  { !user ? <Link className="nav-link" to={'/signup'}>
                   Sign up
                  </Link>
                  :
                  <button onClick={handleClick} className=" btn nav-link">Logout</button>
                  }
                </li>
              </ul>

              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  { user && 
                  
                   user.username }
                </li>
              </ul>
            </div>
          </div>
        </nav>
  )
}
