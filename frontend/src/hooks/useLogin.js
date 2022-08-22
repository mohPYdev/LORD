import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import { LocalUrl } from '../urls/urls'


export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const navigate = useNavigate()

  const LOGIN_URL = LocalUrl + 'auth/token/login/'
  const ME_URL = LocalUrl + 'auth/users/me/'
  const login = async (username, password) => {
    setError(null)
    setIsPending(true)
  
    try {
      // login
      
      const res = await axios.post(LOGIN_URL, {username, password})

  

      
      // set headers
      axios.defaults.headers.common['Authorization'] = `Token ${res.data.auth_token}`
      
      const config = {
        headers: {
          'Authorization': `Token ${res.data.auth_token}`,
        }
      }

      // get user
      const res2 = await axios.get(ME_URL, config )

      //set token in local storage
      localStorage.setItem('token', JSON.stringify(res.data.auth_token))

      // set user in local storage
      localStorage.setItem('user', JSON.stringify(res2.data))


      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res2.data })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
        navigate('/home')

      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.response.data['non_field_errors'])
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, isPending, error }
}