import React, {useContext, useEffect, useState } from 'react'
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
       
        </>
    )
}