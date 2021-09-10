import React, { useCallback, useContext, useEffect, useState } from 'react'
import { NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
export const Navbar = () => {
    const history = useHistory()
    const {request, error, clearError} = useHttp()
    const {token} = useContext(AuthContext)
    const auth = useContext(AuthContext)
    const [sub, setSub] = useState()
    const logoutHandler = event =>{
        
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    const checkSub = useCallback( async () => {
        try{
            const IsUserSub = await request('/api/auth/checkSub', 'POST', null, {
                Authorization: `Bearer ${token}`
            })
            setSub(IsUserSub.IsSub)
            
        }
        catch(e){}
    },[token,request])

    useEffect(() => {
        checkSub()
        var elems = document.querySelectorAll('.sidenav');
        var instances = window.M.Sidenav.init(elems,'');
        elems = document.querySelectorAll('.dropdown-trigger');
        instances = window.M.Dropdown.init(elems, '');
        
    }, [checkSub])

    return (

        <>
         <nav> 
            <div className="nav-wrapper #6d4c41 brown darken-1 " >
                <span className="brand-logo" style={{padding:'0 2rem'}}>Лого</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {!sub && <li><NavLink to ="/SubscribePage">Купить подписку</NavLink></li>}
                    <li><NavLink className="sidenav-close" to ="/search">Поиск</NavLink></li>
                    <li><NavLink className="sidenav-close" to ="/cargo">Создать груз</NavLink></li>
                    <li><NavLink className="sidenav-close" to ="/vehile">Создать транспорт</NavLink></li>
                    <li><NavLink className="sidenav-close" to ="/cabinet">Кабинет</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul><a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                
            </div>
         </nav>

        <ul id="slide-out" className="sidenav #6d4c41 brown white-text darken-1">
            <li><span className="brand-logo" style={{padding:'0 2rem'}}>Лого</span></li>
            {!sub && <li><NavLink className="sidenav-close white-text" to ="/SubscribePage">Купить подписку</NavLink></li>}
            <li><NavLink className="sidenav-close white-text" to ="/search"><i className="material-icons white-text">search</i>Поиск</NavLink></li>
            <li><NavLink className="sidenav-close white-text" to ="/cargo"><i className="material-icons white-text">add_to_queue</i>Создать груз</NavLink></li>
            <li><NavLink className="sidenav-close white-text" to ="/vehile"><i className="material-icons white-text">add_to_queue</i>Создать транспорт</NavLink></li>
            <li><NavLink className="sidenav-close white-text" to ="/cabinet"><i className="material-icons white-text">person</i>Кабинет</NavLink></li>
            <li><a       className="sidenav-close white-text" href="/" onClick={logoutHandler}><i className="material-icons white-text">exit_to_app</i>Выйти</a></li>
    </ul>
    
        </>
    )
}