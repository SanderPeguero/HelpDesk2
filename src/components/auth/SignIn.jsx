
import { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { signIn } from '../../store/actions/authActions'

import { signIn } from '../../functions/signIn'
import { AppContext } from '../../Context'

function SignIn(){

    // const [email, setemail] = useState('')
    // const [password, setpassword] = useState('')
    
    const { authError, auth } = useContext(AppContext)

    const [state, setstate] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setstate({
            ...state,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        signIn(state.email, state.password)
    }

    if (auth.uid) return <Navigate to='/' />
    return (
      <div className="container">
        <form className="white" onSubmit={handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={handleChange} />
          </div>
          <div className="input-field">
            <button className="btn blue lighten-1 z-depth-0">Login</button>
            <div className="center red-text">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    )

}



export default SignIn