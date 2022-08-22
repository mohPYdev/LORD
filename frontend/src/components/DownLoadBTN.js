import React from 'react'
import { LocalUrl } from '../urls/urls'

export default function DownLoadBTN({id}) {

    // const {data} = useFetch(LocalUrl + `generate/${id}/`)
    // const handleDownload = async (e) => {
    //     const url = LocalUrl + `generate/${id}/`
    //     const  res = await fetch(url)
    // }

  return (
    // <button className='btn btn-primary btn-sm mx-2' onClick={handleDownload} download>Download</button>
    <>
        <a href={`${LocalUrl}generate/${id}/`} className='btn btn-primary btn-sm mx-2' download >Download</a>
    </>
  )
}
