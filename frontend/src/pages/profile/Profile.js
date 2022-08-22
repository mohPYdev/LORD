import React, {useEffect, useState} from 'react'

import './Profile.css'
import {useAuthContext} from '../../hooks/useAuthContext'
import {useFetch} from '../../hooks/useFetch'
import {LocalUrl} from '../../urls/urls'
import DownLoadBTN from '../../components/DownLoadBTN'

import {useNavigate} from 'react-router-dom'


export default function Profile() {

  const {user} = useAuthContext()
  const {data: systems} = useFetch(LocalUrl + "systems/")  

  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/systems/${id}`) 
  }

  

  return (
    <div className='profile'>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-sm-7">
            <div className="card mb-5">
              <div className="card-body p-4">
                <h3 className="mb-3">Personal Information</h3>
                <hr className="my-4"/>
                <div className="align-items-center">
                  <ul className="list-group list-group-light">
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center">
                       Username
                      <p>{user
                          ?.username}</p>
                    </li>
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center">
                      Email
                      <p>{user
                          ?.email}</p>
                    </li>
                  </ul>
                  <div className='d-flex justify-content-center mt-3'>
                    <button type="button" className="btn btn-primary">Change password</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card my-card">
              <div className="card-body p-4 ">
                <h3 className="mb-3">Your Systems</h3>
                <hr className="my-2"/>
                <div className='rows align-items-center '>
                  
                  {systems && systems.map((sys) => (
                    <div key={sys.id} className='row mt-3'>
                      <div className='col'>
                         {sys.name}
                      </div>
                      <div className='col'>
                        <button className='btn btn-primary btn-sm' onClick={(e) => handleClick(sys.id)}>edit</button>
                        <DownLoadBTN id={sys.id} /> 
                      </div>
                    </div>
                  ))}

                  {/* <div className='row mt-3'>
                    <div className='col'>
                      بیمارستان سینما
                    </div>
                    <div className='col'>
                      <button className='btn btn-primary'>edit</button>
                    </div>
                  </div> */}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
