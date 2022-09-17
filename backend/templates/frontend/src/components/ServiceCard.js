import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './ServiceCard.css'

import SelectTime from './SelectTime';
import Payment from './Payment';
import { LocalUrl } from '../urls/urls'
import { useFetch } from '../hooks/useFetch'
import ShowItem from './ShowItem';

export default function ServiceCard({shift, serv_id}) {

  const navigate = useNavigate()

  const {data: res, postData} = useFetch(LocalUrl + "reservations/", "POST")

  const [start_t,
    setStart_t] = useState("date");
  const [end_t,
    setEnd_t] = useState("date");
  const [date,
    setDate] = useState("date");
  const [time,
    setTime] = useState(null);
  
  const [pay_code,
    setPayCode] = useState('');

  const [timePicked,
    setTimePicked] = useState(false)
  const [available,
    setAvailable] = useState(true)
  const [is_full,
    setIsFull] = useState(false)


  const handleReserve = () => {
    postData({
      "item": shift.item,
      "time_date": time,
      "service": serv_id,
      "shift": shift.id,
      'pay_code': pay_code,
    })
  }

  useEffect(() => {
    if (shift){
      const d = new Date(`${shift.start_date.slice(0, 16)}`)
      const faDate = new Intl.DateTimeFormat("en", {
        month:"long",
        weekday:"long",
        day:"numeric",
      }).format(d);
      setDate(faDate)

      const sd = new Date(`${shift.start_date.slice(0, 16)}`)
      const faStart = new Intl.DateTimeFormat("en", {
        hour:"numeric",
        hour12:false,
        minute:"numeric",
      }).format(sd);
      setStart_t(faStart)

      const ed = new Date(`${shift.end_date.slice(0, 16)}`)
      const faEnd = new Intl.DateTimeFormat("en", {
        hour:"numeric",
        hour12:false,
        minute:"numeric",
      }).format(ed);
      setEnd_t(faEnd)

      if (!shift.is_available) {
        setAvailable(false)
      }

    }
  },[shift])
  


  useEffect(() => {
    if(res){
      navigate('/profile')
    }
  },[navigate, res])

  return (
    
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{date}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{start_t} - {end_t}</h6>
          {available && !is_full && <span className='btn btn-success btn-sm disabled'>available</span>}
          {!available && !is_full && <span className='btn btn-danger btn-sm disabled '>unavailable</span>}
          {is_full && <span className='btn btn-danger btn-sm disabled '>full</span> }
          <hr></hr>
          <ShowItem doc_id={shift?.item} />
          {available && !is_full && <SelectTime id={shift.id} setIsFull={setIsFull} service_id={serv_id} setTime={setTime} setTimePicked={setTimePicked} /> }
          {timePicked && <label className='float-right btn btn-outline-dark btn-sm'>{time}</label>}

        </div>
        {timePicked && <button className='btn btn-success' onClick={handleReserve}>save</button>}
        {timePicked && <Payment 
                        handleReserve={handleReserve}
                        serv_id={serv_id}
                        setPayCode={setPayCode} pay_code={pay_code}
                      />}      
        </div>
  )
}
