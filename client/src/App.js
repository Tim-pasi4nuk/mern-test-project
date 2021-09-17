import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { NavbarLogin } from './components/NavbarLogin'
import { Loader } from './components/Loader'
import { Footer } from './components/Footer'
import { FooterLogin } from './components/FooterLogin'
import 'materialize-css'
function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if(!ready){
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
        token, login, logout, userId, isAuthenticated
      }}>
      <Router>
        {isAuthenticated && <Navbar />}
        {!isAuthenticated && <NavbarLogin />}
        <main>
          <div className="container">
            {routes}
          </div>
        </main>
        
        {isAuthenticated && <Footer />}
        {!isAuthenticated && <FooterLogin />}
        
      </Router>
    </AuthContext.Provider>
  )
}

export default App
