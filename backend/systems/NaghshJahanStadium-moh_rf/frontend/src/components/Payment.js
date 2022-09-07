import React, {useState} from 'react'
import './Payment.css'

import Modal from 'react-bootstrap/Modal';
import { useFetch } from '../hooks/useFetch';
import { LocalUrl } from '../urls/urls';

export default function Payment({
    serv_id,
    handleReserve,


  }){

    const {data:service} = useFetch(LocalUrl + `services/${serv_id}/`)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
    <div className='payment hello'>
      <button className='btn btn-primary btn-block' onClick={handleShow}>
        Payment
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        {service && <Modal.Body>
            <h1>{service.price}$</h1>          

        </Modal.Body>}
        <Modal.Footer>
          <button className='btn btn-success' onClick={handleReserve}>
            accept
          </button>
          <button className='btn btn-danger' onClick={handleClose}>
            decline
          </button>        
        </Modal.Footer>
      </Modal>
    </div>
  )
}
