import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
// import Navbar from './components/layout/Navbar2'

import MuiAlert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'

import { ContextVariable } from "./Context"

import SignIn from './layout/SignIn/Signin'
import Login from './layout/LogIn/Login'
import Sidebar from './layout/Sidebar/Sidebar'
import Reports from './layout/Reports/Reports'
import Users from './layout/Users/Users'
import AllTickets from './layout/AllTickets/AllTickets'
// import SignUp from './components/auth/SignUp'

import { Analytics } from '@vercel/analytics/react';

const Home = () => {
  return (
    <div>
      Home
    </div>
  )
}


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function App() {

  const [auth, setauth] = useState(null)
  const [user, setuser] = useState(null)
  const [alert, setalert] = useState({
    open: false,
    severity: 'success',
    message: 'Default'
  })
  const [state, setState] = useState({
    open: alert.open,
    Transition: SlideTransition,
    vertical: 'bottom',
    horizontal: 'right',
  })
  const { vertical, horizontal, open } = state;

  const db = getFirestore()
  const FirebaseAuth = getAuth();

  const getUser = async (data) => {

    const docRef = doc(db, "Users", data.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      setuser({...docSnap.data(), 'id': docSnap.id})

    } else {

      console.log("No such user document!");

    }

  }

  const handleClose = () => {
    setState({
      ...state,
      open: false,
      vertical: 'bottom',
      horizontal: 'right'
    })
  }

  useEffect(() => {

    onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) {

        setauth(user)
        getUser(user)

      } else {
        // User is signed out
        setauth(null)
      }
    })

  }, []);

  useEffect(() => {
    setState({
      ...state,
      open: alert.open
    })

  }, [alert]);

  return (
    <ContextVariable.Provider value={{ user, alert, setalert, auth, setauth }}>
      <Router>
        <div className='App'>
          <Analytics/>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={4000}
            open={state.open}
            onClose={handleClose}
            TransitionComponent={state.Transition}
          >
            <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
          {/* <Sidebar /> */}
          {auth ? <Sidebar /> : <Navigate to='/login' />}
          <div className={`${!auth ? '' : 'ml-[12rem] md:ml-[16rem] mr-4'}`}>
            <Routes>
              {/* <Route exact path='/' element={<SignIn/>} />∏ */}
              {/* <Route path='/project/:id' component={ProjectDetails} /> */}

              {!auth ? <Route path='/login' element={<Login />} /> : null}
              {
                user ? user.role == 'admin' ?
                  (
                    <>
                      <Route exact path='/ticketsdash' element={<Home />} />
                      <Route exact path='/signin' element={<SignIn />} />
                      <Route exact path='/' element={<AllTickets />} />
                      <Route exact path='/reports' element={<Reports />} />
                      <Route exact path='/users' element={<Users />} />
                      <Route exact path='*' element={<Navigate to='/' />} />
                      {/* <Route exact path='/dashboardsparkle' element={<Dashboard />} />
                      <Route exact path='/activationsdash' element={<ActivationsDash />} /> */}
                    </>
                  )
                  : <Route path='*' element={<Navigate to='/' />} />
                  : <Route path='*' element={<Navigate to='/login' />} />
              }
              {/* <Route path='*' element={<Navigate to='/login' />} /> */}
            </Routes>
          </div>
        </div>
      </Router>
    </ContextVariable.Provider>
  )
}

export default App
