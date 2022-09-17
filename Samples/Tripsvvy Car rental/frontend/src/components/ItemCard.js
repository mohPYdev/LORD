import React from 'react'
import './ItemCard.css'
import { LocalUrl } from '../urls/urls'

import { useFetch } from '../hooks/useFetch'
import { Link } from 'react-router-dom'

export default function ItemCard({id}) {

    const {data:service, isPending, error} = useFetch(LocalUrl + `services/${id}/`)

  return (
    <div className='service-card'>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{service?.name}</h5>
          <p className='card-subtitle text-muted'>{service?.subtitle}</p>

          <p className="card-text">duration : {service?.duration}</p>
          <p className="card-text">price : {service?.price}$</p>

          <Link to={`/reservation/${id}`} className="btn btn-primary">choose</Link>
        </div>
      </div>
    </div>
  )
}
