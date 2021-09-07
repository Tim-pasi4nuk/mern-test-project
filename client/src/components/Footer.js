import React from 'react'
import { NavLink} from 'react-router-dom'
export const Footer = () => {
  return (
    <footer className="page-footer #6d4c41 brown darken-1">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Footer Content</h5>
            <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <ul>
            <li><NavLink className="sidenav-close white-text" to ="/loginCreate" >Создать объявление</NavLink></li>
            <li><NavLink className="sidenav-close white-text" to ="/search">Поиск</NavLink></li>
            <li><NavLink className="sidenav-close white-text" to ="/login">Войти</NavLink></li>
            <li><NavLink className="sidenav-close white-text" to ="/register">Зарегистрироваться</NavLink></li>
            </ul> 
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
        © 2014 Copyright Text
        <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
        </div>
      </div>
    </footer>
  )
}