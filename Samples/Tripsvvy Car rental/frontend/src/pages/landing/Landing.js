import React from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <header className="landing h-100">
      <div className="container px-4 px-lg-5 h-100">
        <div
          className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
          <div className="col-lg-8 align-self-end">
            <h1 className="text-white font-weight-bold"> 
Tripsvvy Car rental
            </h1>
            <hr className="divider"/>
          </div>
          <div className="col-lg-8 align-self-baseline">
            <p className="text-white mb-5">
a rental company
            </p>
            <Link className="btn btn-primary btn-xl" to={'/home'} >Book now</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
