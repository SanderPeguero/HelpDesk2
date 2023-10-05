import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './components/layout/Navbar'

import { AppContext } from "./Context"

import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'


function App() {

  const [auth, setauth] = useState({ uid: null })
  const [authError, setauthError] = useState(null)
  const [projects, setprojects] = useState([])
  const [profile, setprofile] = useState(null);

  return (
    <AppContext.Provider value={{ auth, setauth, authError, setauthError, projects, setprojects, profile, setprofile }}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            {/* <Route exact path='/'component={Dashboard} /> */}
            {/* <Route path='/project/:id' component={ProjectDetails} /> */}
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/signup' element={<SignUp/>} />
            {/* <Route path='/create' component={CreateProject} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
