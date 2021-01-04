import React from 'react'
import './App.sass'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'
import './assets/icofont/icofont.min.css'

import useRoutes from './routes'
import useAuth from './hooks/auth.hook'
import {BrowserRouter} from 'react-router-dom'
import AuthContext from './context/AuthContext'
import Navbar from './components/Navbar/Navbar'
import Loader from './components/Loader/Loader'

function App() {
  const {token, userId, login, logout, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{
        token, userId, login, logout, isAuthenticated
      }}>
        {isAuthenticated && <Navbar />}
        <div className="container">
          {routes}
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App
