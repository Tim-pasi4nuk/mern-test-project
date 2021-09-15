import React, { useContext, useEffect } from 'react'
import { NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
export const NavbarLogin = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    useEffect(() => {
        var elems = document.querySelectorAll('.sidenav');
        var instances = window.M.Sidenav.init(elems,'');
        elems = document.querySelectorAll('.dropdown-trigger');
        instances = window.M.Dropdown.init(elems, '');
        
    }, [])

    return (
        <>
         <nav> 
            <div className="nav-wrapper #c62828 red darken-3 white-text" >
            <img src="logoTruck.png" style={{
                                        height: '100%',
                                        width: 'auto',
                                       
                                    }}/>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink className="sidenav-close" to ="/loginCreate" >Создать объявление</NavLink></li>
                <li><NavLink className="sidenav-close" to ="/search">Поиск</NavLink></li>
                <li><NavLink className="sidenav-close" to ="/login">Войти</NavLink></li>
                <li><NavLink className="sidenav-close" to ="/register">Зарегистрироваться</NavLink></li>
                </ul><a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>             
            </div>
         </nav>
         
            <ul id="slide-out" className="sidenav #c62828 red darken-3 darken-1 ">
                    <li><img src="logoTruck.png" style={{
                                        height: '100%',
                                        width: '100%',
                                       
                                    }}/></li>
                    <li><NavLink className="sidenav-close white-text" to ="/search"><i      className="material-icons white-text">search</i>Поиск</NavLink></li>
                    <li><NavLink className="sidenav-close white-text" to ="/loginCreate"><i className="material-icons white-text">add_to_queue</i>Создать объявление</NavLink></li>
                    <li><NavLink className="sidenav-close white-text" to ="/login"><i       className="material-icons white-text">person</i>Войти</NavLink></li>
                    <li><NavLink className="sidenav-close white-text" to ="/register"><i    className="material-icons white-text">person_add</i>Зарегистрироваться</NavLink></li>
            </ul>
    
        </>
    )
}