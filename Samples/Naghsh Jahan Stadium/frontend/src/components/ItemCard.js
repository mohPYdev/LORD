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
          <div className='img-container'><img className="card-img-top" src={service?.image} alt="Card image cap" /></div>
          <p className="card-text">duration : {service?.duration}</p>
          <p className="card-text">price : {service?.price}$</p>
          <p className="card-text">{service?.description}</p>
          <Link to={`/reservation/${id}`} className="btn btn-primary">choose</Link>
        </div>
      </div>
    </div>
  )
}
