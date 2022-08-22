import React, { useEffect, useState } from 'react'

import './Profile.css'
import {useAuthContext} from '../../hooks/useAuthContext'
import {useFetch} from '../../hooks/useFetch'
import {LocalUrl} from '../../urls/urls'
import ReservationItem from '../../components/ReservationItem'

export default function Profile() {

  const {user} = useAuthContext()
  const {data: reservations} = useFetch(LocalUrl + "reservations/")
  const [reserveList, setReserveList] = useState([])

  const deleteItem = (id) => {
    setReserveList((reserveList) => reserveList.filter((i) => i.id !== id))
  }

  useEffect(() => {
    if (reservations) {
      setReserveList(reservations)
    }
  }, [reservations])

  return (
    <div className='profile'>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card mb-5">
              <div className="card-body p-4">
                <h3 className="mb-3">Personal Information</h3>
                <hr className="my-4"/>
                <div className="align-items-center">
                  <ul className="list-group list-group-light">
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center">
                      username
                      <p>{user
                          ?.username}</p>
                    </li>
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center">
                      email
                      <p>{user
                          ?.email}</p>
                    </li>
                  </ul>
                  <div className='d-flex justify-content-center mt-3'>
                    <button type="button" className="btn btn-primary">change password</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body p-4">
                <h3 className="mb-3">Reservations</h3>
                <hr className="my-4"/>
                <table className="table align-middle mb-0 mt-5 bg-white">
                  <thead className="bg-light">
                    <tr>
                      <th>Item</th>
                      <th>Service</th>
                      <th>Time</th>
                      <th>code</th>
                    </tr>
                  </thead>
                  <tbody>

                    {reserveList && reserveList.map((reserv) => (
                      
                      
                      <ReservationItem

                        key={reserv.id}
                        res_id={reserv.id}
                        doc_id={reserv.item} 
                        shift_id={reserv.shift} 
                        service_id={reserv.service} 
                        time={reserv.time}
                        code={reserv.code}
                        
                        deleteItem={deleteItem}
                        
                      />
                      

                    ))}

                    

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
