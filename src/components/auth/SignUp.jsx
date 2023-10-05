import { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { signUp } from '../../functions/signUp'
import { AppContext } from '../../Context'


function SignUp(){

  const { authError, auth } = useContext(AppContext)

  const [state, setstate] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })

  const handleChange = (e) => {
    setstate({
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signUp(state)

  }

  if (auth.uid) return <Redirect to='/' /> 
  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Sign Up</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id='email' onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id='password' onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id='firstName' onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id='lastName' onChange={handleChange} />
        </div>
        <div className="input-field">
          <button className="btn blue lighten-1 z-depth-0">Sign Up</button>
          <div className="center red-text">
            { authError ? <p>{authError}</p> : null }
          </div>
        </div>
      </form>
    </div>
  )

}

export default SignUp