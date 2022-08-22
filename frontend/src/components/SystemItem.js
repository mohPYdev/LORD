import React from 'react'
import { useFetch } from '../hooks/useFetch'
import { LocalUrl } from '../urls/urls'

export default function SystemItem({id}) {

    const {data:system} = useFetch(LocalUrl + `systems/${id}/`)

  return (
    <div className='row mt-3'>
      <div className='col'>
        {system?.name} 
      </div>
      <div className='col'>
        edit
      </div>
    </div>
  )
}
