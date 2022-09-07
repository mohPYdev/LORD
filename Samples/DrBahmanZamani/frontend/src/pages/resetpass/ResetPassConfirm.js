import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { LocalUrl } from '../../urls/urls'

export default function ResetPassConfirm() {

    const {token , uid} = useParams()
    const [new_password, setNewPass] = useState('')
    const [data, setData] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = async(e) => {
        e.preventDefault()
        const options = {
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid,
            token,
            new_password,
          }),
        }
        const res = await fetch(LocalUrl + 'auth/users/reset_password_confirm/', options)
        if (res.status === 204){
          setData(true)
          console.log(res.status)
        }
        else
          setData(false)
    }


    useEffect(() => {
        if (data) {
            navigate('/login')
        }
    }, [data])

  return (
    <div className="auth-wrapper login">
      <div className="auth-inner">
        <p>Please enter your new password</p>
        <form className='mt-3' onSubmit={handleSubmit}>
            <input className='form-control' type='password' value={new_password} onChange={(e) => setNewPass(e.target.value)} placeholder='New password'/>
            <button className='btn btn-dark mt-3' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}
