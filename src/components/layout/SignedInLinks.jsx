import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AppContext } from '../../Context'
import { logOut } from '../../functions/logOut'

const SignedInLinks = () => {

  const { profile } = useContext(AppContext)

  return (
    <div>
      <ul className="right">
        <li><NavLink to='/'>Inicio</NavLink></li>
        <li><NavLink to='/create'>Ticket</NavLink></li>
        <li><NavLink to='/create'>Notificacion</NavLink></li>
        <li><a onClick={logOut}>Salir</a></li>
        <li><NavLink to='/' className="btn btn-floating blue lighten-1">
          {profile.initials}
        </NavLink></li>
      </ul>
    </div>
  )
}

export default SignedInLinks