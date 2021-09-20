import React from 'react'
import { NavLink} from 'react-router-dom'
export const Footer = () => {
  return (
    <footer className="page-footer #c62828 red darken-3">
      <div className="container">
        <div className="row">
          <div className="col l4 offset-l2 s12">
          <NavLink className="sidenav-close white-text" to ="/about" ><h5 className="white-text">Dogruz777</h5></NavLink>
            
            <ul>
            <li><NavLink className="sidenav-close white-text" to ="/search" >Поиск</NavLink></li>
            <li><NavLink className="sidenav-close white-text" to ="/vehile" >Создать груз</NavLink></li>
            <li><NavLink className="sidenav-close white-text" to ="/vehile" >Создать транспорт</NavLink></li>
            <li><NavLink className="sidenav-close white-text" to ="/about"  >О нас</NavLink></li>
            </ul> 
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
        © 2015 Dogruz777.com
        </div>
      </div>
    </footer>
  )
}