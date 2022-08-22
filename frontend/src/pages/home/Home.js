import React, {useEffect, useState} from 'react'
import './Home.css'

import {useFetch} from '../../hooks/useFetch'
import {LocalUrl} from '../../urls/urls'

import {useNavigate} from 'react-router-dom'

export default function Home() {

  const navigate = useNavigate()
  const {postData, data} = useFetch(LocalUrl + 'systems/', 'POST')

  const [name,
    setName] = useState('')
  const [type,
    setType] = useState('place')
  const [theme,
    setTheme] = useState('dark')
  const [description,
    setDescription] = useState('')

  const [has_price,
    setHasPrice] = useState(false)
  const [has_img_item,
    setHasImgItem] = useState(false)
  const [has_img_service,
    setHasImgService] = useState(false)
  const [has_email,
    setHasEmail] = useState(false)
  const [has_description_service,
    setHasDescService] = useState(false)
  const [has_description_item,
    setHasDescItem] = useState(false)
  const [has_large_number,
    setHasLargeNum] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    postData({
      name,
      type,
      theme,
      description,
      has_price,
      has_description_service,
      has_description_item,
      has_email,
      has_img_item,
      has_img_service,
      has_large_number,
    })
  }

  useEffect(() => {
    if (data) {
      navigate('/profile')
    }
  }, [data, navigate])

  return (
    <div className='home'>

      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className='col-sm-10'>
            <div className="card  mb-4">
              <div className="card-body p-4">
                <h3 className="mb-2">Generation Form</h3>
                <hr className="my-2"/>
                <div className='d-flex justify-content-center mt-2'>
                  <form className='col-md-11' onSubmit={handleSubmit}>
                    <div className='row '>

                      {/* col */}
                      <div className="col col-sm-5 ">
                        <div className="form-group mt-2">
                          <label for="exampleFormControlInput1">
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="name"/>
                        </div>
                        <div className="form-group mt-4">
                          <label for="exampleFormControlTextarea1">Description</label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}/>
                        </div>

                        <div className='form-group mt-2'>
                          <div className='row'>
                            <div className='col'>
                              <p className='title something mt-2'>Type of system</p>
                            </div>
                            <div className='col-sm-5 something'>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="typeradio"
                                  id="radiotype1"
                                  onClick={(e) => setType('place')}/>
                                <label className="form-check-label" for="radiotype1">
                                  Place
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="typeradio"
                                  id="radiotype2"
                                  onClick={(e) => setType('person')}/>
                                <label className="form-check-label" for="radiotype2">
                                  Human
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="typeradio"
                                  id="radiotype3"
                                  onClick={(e) => setType('resource')}/>
                                <label className="form-check-label" for="radiotype3">
                                  Resource
                                </label>
                              </div>
                            </div>
                          </div>

                        </div>

                      </div>

                      {/* col */}
                      <div className='col col-sm-4 '>

                        <div className='form-group mt-2'>
                          <div className="form-check">
                            <div className='row'>
                              <div className='col'>
                                <p className='something'>Add price to services</p>
                              </div>
                              <div className='col-sm-1'>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => setHasPrice(!has_price)}
                                  checked={has_price}/>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='form-group mt-2'>
                          <div className="form-check">
                            <div className='row'>
                              <div className='col'>
                                <p className='something'>Add description to services</p>
                              </div>
                              <div className='col-sm-1'>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => setHasDescService(!has_description_service)}
                                  checked={has_description_service}/>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='form-group mt-2'>
                          <div className="form-check">
                            <div className='row'>
                              <div className='col'>
                                <p className='something'>Add description to items</p>
                              </div>
                              <div className='col-sm-1'>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => setHasDescItem(!has_description_item)}
                                  checked={has_description_item}/>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='form-group mt-2'>
                          <div className="form-check">
                            <div className='row'>
                              <div className='col'>
                                <p className='something'>Send email after reservation</p>
                              </div>
                              <div className='col-sm-1'>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => setHasEmail(!has_email)}
                                  checked={has_email}/>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='form-group mt-2'>
                          <div className="form-check">
                            <div className='row'>
                              <div className='col'>
                                <p className='something'>Large number of reservation items which are identical e.g. stadium seats</p>
                              </div>
                              <div className='col-sm-1'>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => setHasLargeNum(!has_large_number)}
                                  checked={has_large_number}/>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                      <div className='col col-sm-3 '>
                        <div className='form-group mt-2'>
                          <div className="form-check">
                            <div className='row'>
                              <div className='col'>
                                <p className='something'>Add image for service
                                </p>
                              </div>
                              <div className='col-sm-1'>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => setHasImgService(!has_img_service)}
                                  checked={has_img_service}/>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='form-group mt-2'>
                          <div className="form-check">
                            <div className='row'>
                              <div className='col'>
                                <p className='something'>Add image for items
                                </p>
                              </div>
                              <div className='col-sm-1'>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => setHasImgItem(!has_img_item)}
                                  checked={has_img_item}/>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='form-group mt-2'>
                          <div className='row'>
                            <div className='col'>
                              <p className='title'>Theme</p>
                            </div>
                            <div className='col something'>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="themeradio"
                                  id="radiotheme1"
                                  onClick={(e) => setTheme('light')}/>
                                <label className="form-check-label" for="radiotheme1">
                                  Light
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="themeradio"
                                  id="radiotheme2"
                                  onClick={(e) => setTheme('dark')}/>
                                <label className="form-check-label" for="radiotheme2">
                                  Dark
                                </label>
                              </div>
                            </div>
                          </div>

                        </div>

                      </div>

                      {/* row */}
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm mt-2">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}