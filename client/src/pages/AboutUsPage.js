import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

export const AboutUsPage = () => {

  useEffect(() => {
    
    var elems = document.querySelectorAll('.card-tabs')
    var instances = window.M.Sidenav.init(elems,'')
    
}, [])

    return (
        <>
        <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="logoTruck.jpg"/>
            </div>
            <div class="card-content">
          <p>Компания Dogruz777 успешно работает на рынке грузовых автомобильных перевозок с 2015 г. Вы можете найти перевозщика по Украине на нашем сайте прямо сейчас!</p>
        </div>
        <div class="card-action">
        <NavLink className="sidenav-close red-text" to ="/search">НАЙТИ</NavLink>
        </div>
        </div>

        <div class="card">
                        <div class="card-content center">
                        <span ></span>
                        </div>
                        <div class="card-tabs">
                        <ul class="tabs tabs-fixed-width">
                            <li class="tab"><a class="active" href={`#tab1}`}>Габариты</a></li>
                            <li class="tab"><a href={`#tab2`}>Тип машины</a></li>
                            <li class="tab"><a href={`#tab3`}>Контакты</a></li>
                        </ul>
                        </div>
                        <div class="card-content grey lighten-4">
                        <div id={`#tab1`}>1</div>
                        <div id={`#tab2`}>2<tag></tag></div>
                        <div id={`#tab3`}>3</div>
                        </div>
                    </div>
        </>
    )
}