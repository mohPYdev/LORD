import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import {useNavigate} from 'react-router-dom'
import {useFetch} from '../../hooks/useFetch'
import {LocalUrl} from '../../urls/urls'

export default function SystemDetail() {

  const {id} = useParams()

  const navigate = useNavigate()
  const {putData, data} = useFetch(LocalUrl + `systems/${id}/`, 'PUT')
  const {data: system} = useFetch(LocalUrl + `systems/${id}/`)

  const [name,
    setName] = useState(system
    ?.name)
  const [type,
    setType] = useState(system
    ?.type)
  const [theme,
    setTheme] = useState(system
    ?.theme)
  const [description,
    setDescription] = useState(system
    ?.description)

  const [has_price,
    setHasPrice] = useState(system
    ?.has_price)
  const [has_img_item,
    setHasImgItem] = useState(system
    ?.has_img_item)
  const [has_img_service,
    setHasImgService] = useState(system
    ?.has_img_service)
  const [has_email,
    setHasEmail] = useState(system
    ?.has_email)
  const [has_description_service,
    setHasDescService] = useState(system
    ?.has_description_service)
  const [has_description_item,
    setHasDescItem] = useState(false)
  const [has_large_number,
    setHasLargeNum] = useState(false)
  const [email,
    setEmail] = useState('')
  const [password,
    setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    putData({
      name,
      type,
      theme,
      description,
      has_price,
      has_description_item,
      has_description_service,
      has_email,
      has_img_item,
      has_img_service,
      has_large_number,
      email,
      password
    })
  }

  useEffect(() => {
    if (data) {
      navigate('/profile')
    } else if (system) {
      setName(system.name)
      setDescription(system.description)
      setType(system.type)
      setTheme(system.theme)
      setHasPrice(system.has_price)
      setHasImgItem(system.has_img_item)
      setHasImgService(system.has_img_service)
      setHasEmail(system.has_email)
      setHasDescService(system.has_description_service)
      setHasDescItem(system.has_description_item)
      setHasLargeNum(system.has_large_number)
      setEmail(system.email)
      setPassword(system.password)
    }

  }, [data, navigate, system])

  return (
    <div>
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className='col-sm-10'>
            <div className="card ">
              <div className="card-body p-3">
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
                        <div className="form-group mt-3">
                          <label for="exampleFormControlTextarea1">Description</label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}/>
                        </div>
                        
                        {has_email && <div>
                          <div className='row mt-2'>
                            Fill this information according to your admin email credential.
                          </div>
                          <div className='row mt-2'>
                            <div className='col'>
                              email
                              <input className='form-control' type='email' onChange={(e) => setEmail(e.target.value) } value={email} />
                            </div>
                            <div className='col'>
                              password
                              <input type='password' className='form-control' onChange={(e) => setPassword(e.target.value)} value={password} />
                            </div>
                          </div>
                        </div>}

                        
                        

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
                              <p className=''>Theme</p>
                            </div>
                            <div className='col something'>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="themeradio"
                                  id="radiotheme1"
                                  onClick={(e) => setTheme('light')}
                                  checked={theme === 'light'}/>
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
                                  onClick={(e) => setTheme('dark')}
                                  checked={theme === 'dark'}/>
                                <label className="form-check-label" for="radiotheme2">
                                  Dark
                                </label>
                              </div>
                            </div>
                          </div>

                        </div>

                        <div className='form-group mt-4'>
                          <div className='row'>
                            <div className='col'>
                              <p className='mt-2'>Type of system</p>
                            </div>
                            <div className='col-sm-5 something'>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="typeradio"
                                  id="radiotype1"
                                  onClick={(e) => setType('place')}
                                  checked= {type === 'place'}/>
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
                                  onClick={(e) => setType('person')}
                                  checked={type === 'person'}/>
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
                                  onClick={(e) => setType('resource')}
                                  checked = {type === 'resource'}/>
                                <label className="form-check-label" for="radiotype3">
                                  Resource
                                </label>
                              </div>
                            </div>
                          </div>

                        </div>

                      </div>

                      {/* row */}
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm mt-2">Update</button>
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