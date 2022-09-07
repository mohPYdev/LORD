import React, { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { LocalUrl } from '../urls/urls'

export default function ShowItem({doc_id}) {

    const {data:item} = useFetch(LocalUrl + `items/${doc_id}/`)

    // const [sumDes, setSumDes] = useState()
    
    
    // useEffect(() => {
    //   if (item) {
    //     setSumDes(item.description.substring(0,30))
    //   }
    // }, [item])

  return (
    <div>

        <p className="h5">{item?.first_name  item?.last_name}</p>
        <p className="card-subtitle text-muted">{item?.category}</p>

        <p>{item?.address}</p>
        <p>{item?.phone_number}</p>
        <p>{item?.email}</p>
    </div>
  )
}
