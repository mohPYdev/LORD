import React, {useState, useEffect} from 'react'
import './Reservation.css'

import { useParams } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination';
import SelectTime from '../../components/SelectTime'
import ServiceCard from '../../components/ServiceCard';
import { useFetch } from '../../hooks/useFetch';
import { LocalUrl } from '../../urls/urls';

export default function Reservation() {

  const {id} = useParams()
  const [page_number, setPageNumber] = useState(1)
  const [items, setItems] = useState([])
  const {data: shifts} = useFetch(LocalUrl + `shifts/${id}/service/?page=${page_number}`)
  // const {data: doctor} = useFetch(LocalUrl + `doctors/${id}/`)

  const handleClick = (e) => {
    setPageNumber(e.target.text)
  }

  const calculatePages = (count) => {
    const n = Math.ceil(count / 12);
    let active = page_number;
    let items = [];
    for (let number = 1; number <= n; number++) {
      items.push(
        <Pagination.Item key={number} active={number == active}>
          {number}
        </Pagination.Item>,
      );
    }
    setItems(items)
    window.scrollTo(0,0)
  }

  useEffect(() => {
    if (shifts){
      calculatePages(shifts.count)
    }
  }, [shifts, page_number])
  
  return (
    <div className='reservation'>
      <div className='container'>
        <div className='d-flex justify-content-center mt-4'>
          {/* {doctor && <h3>{doctor.name}</h3>} */}
        </div>

        {shifts?.results?.length === 0 && <h3 className='d-flex justify-content-center text-white mt-5'>Not Availbale Now !</h3>}
        <div className='row'>
          {shifts && shifts.results?.map((item) => (
          // {doctor && doctor.services.map((item) => (
            <div key={item.id} className='col-md-4'>
              <ServiceCard shift={item} serv_id={id} />
            </div>
          ))}
        </div>
        <div className='container d-flex justify-content-center mt-2'>
          <Pagination onClick={handleClick}>{items}</Pagination>
        </div>
      </div>
    </div>
  )
}
