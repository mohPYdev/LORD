import React, {useState} from 'react'
import './Reservation.css'

import { useParams } from 'react-router-dom'

import SelectTime from '../../components/SelectTime'
import ServiceCard from '../../components/ServiceCard';
import { useFetch } from '../../hooks/useFetch';
import { LocalUrl } from '../../urls/urls';

export default function Reservation() {

  const {id} = useParams()
  const {data: shifts} = useFetch(LocalUrl + `shifts/${id}/service/`)
  // const {data: doctor} = useFetch(LocalUrl + `doctors/${id}/`)
  
  return (
    <div className='reservation'>
      <div className='container'>
        <div className='d-flex justify-content-center mt-4'>
          {/* {doctor && <h3>{doctor.name}</h3>} */}
        </div>

        {shifts?.length === 0 && <h3 className='d-flex justify-content-center text-white mt-5'>Not Availbale Now !</h3>}
        <div className='row'>
          {shifts && shifts.map((item) => (
          // {doctor && doctor.services.map((item) => (
            <div key={item.id} className='col-md-4'>
              <ServiceCard shift={item} serv_id={id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
