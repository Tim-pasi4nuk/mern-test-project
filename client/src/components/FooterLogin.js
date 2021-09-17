import React from 'react'
import { NavLink} from 'react-router-dom'
export const FooterLogin = () => {
  return (
    <footer className="page-footer #c62828 red darken-3">
      <div className="container">
        <div className="row">
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Dogruz777</h5>
            <ul>
            <li><NavLink className="sidenav-close white-text" to ="/loginCreate" >Создать объявление</NavLink></li>
            <li><NavLink className="sidenav-close white-text" to ="/search">Поиск</NavLink></li>
            <li><NavLink className="sidenav-close white-text" to ="/login">Войти</NavLink></li>
            <li><NavLink className="sidenav-close white-text" to ="/register">Зарегистрироваться</NavLink></li>
            <li><NavLink className="sidenav-close white-text" to ="/about">Про нас</NavLink></li>
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