import React, {useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { SelectOptionTypeVehile } from '../components/SelectOptionTypeVehile'
import {SelectOptionCity} from '../components/SelectOptionCity'
import 'materialize-css'
import IMask from 'imask';
export const VehilePage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const today = new Date();
      
    const  [form, setForm] = useState({
        dateFrom:today.toISOString().substring(0, 10), dateTo:today.toISOString().substring(0, 10), regionFrom:'Украина', regionTo:'Украина', cityFrom:'', cityTo:'', codeVehile:'', typeVehile:'', amountCar:'', value:'', valuta:'', phone:'', email:'', about:'', capacity:'', userName:''
    })

    
    useEffect(() => {
        var phoneMask = IMask(
            document.getElementById('phone'), {
              mask: '+{38}(000)000-00-00'
            });
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(()=>{
        
        window.M.updateTextFields()
        
        var elems = document.querySelectorAll('select')
        window.M.FormSelect.init(elems, '')

        var elemsAuto = document.querySelectorAll('.autocomplete')
        window.M.Autocomplete.init(elemsAuto,'')
        var data = {
        "Apple": null,
        "Microsoft": null,
        "Google": 'https://placehold.it/250x250'
        }
        elemsAuto = document.querySelectorAll('.autocomplete')
        
        var instances = window.M.Autocomplete.init(elemsAuto,data)
        console.log(instances)

        // const instance = window.M.Autocomplete.getInstance(elemsAuto)
        
        // const updatedata = () => instances.updateData({
        //     "Apple": null,
        //     "Microsoft": null,
        //     "Google": 'https://placehold.it/250x250'
        //   });
        //   console.log(instances)
        //   const opensautocomplete = () => instance.open();
    }, [])

    const changeHandler = even => {
            form.about = 'Ширина:' + form.aboutWidth +' Висота:' + form.aboutHeigth +' Глубина:'+ form.aboutDepth

            setForm ({...form, [even.target.name]: even.target.value})
        
    }

    const addHandler = async () => {
        try {
            console.log({...form})
            const data = await request('/api/vehile/addVehile', 'POST', {...form}, {
                Authorization: `Bearer ${auth.token}`
            })
            message(data.message)
        }
         catch (e){}
    }


    return(
    <div className="row">
    {/* <form className="col s1"></form> */}
    {/* ДАТА И ГОРОД */}
    <div className="row s12 m12"><h3>Добавление заявки на транспорт</h3></div>
    <form className="col s11 m11 center" style={{border:'2px solid'}} >
        <div className="row" ></div>
        <div className="row" >
            <div className="input-field col s6 m6">
                <input 
                type="date" 
                id="dateFrom" 
                name="dateFrom" 
                min = {Date.now()} 
                max="2030-01-01" 
                value={form.dateFrom}
                onChange={changeHandler} 
                />
                <label htmlFor="dateFrom">Погрузка с</label>
            </div>
            
            <div className="input-field col s6 m6">
            
                <input 
                type="date" 
                name="dateTo" 
                id="dateTo" 
                min={Date.now()} 
                max="2030-01-01" 
                value={form.dateTo}
                onChange={changeHandler} 
                />
                <label htmlFor="dateTo">Погрузка по</label>
            </div>
        </div>
        <div className="row" >
            <div className="input-field col s12 m6">
            <select
                placeholder="Погрузка в"
                id="regionFrom" 
                type="text" 
                name="regionFrom"
                className="autocomplete" 
                value={form.regionFrom}
                onChange={changeHandler}  
                >
                    <SelectOptionCity></SelectOptionCity>
                </select>
                <label htmlFor="regionFrom">Нас. пункт погрузки</label>
            </div>
            <div className="input-field col s12 m6">
            <select
                className="CityTo"
                id="regionTo" 
                type="text" 
                name="regionTo"
                className="autocomplete" 
                value={form.regionTo}
                onChange={changeHandler} 
                >
                    <SelectOptionCity></SelectOptionCity>
                </select>
                <label htmlFor="regionTo">Нас. пункт вигрузки</label>
            </div>
        </div> 
           

        {/* ТИП ТРАНСПОРТА ВЕС ОБ'ЄМ */}
        <div className="row" style={{borderTop:'1px solid'}} >
        <div className="input-field col s6 m4">
        <select 
            className="typeVehile" 
            id="typeVehile" 
            name="typeVehile" 
            onChange={changeHandler} 
            value={form.typeVehile}
            >
            <SelectOptionTypeVehile />
        </select>
        <label htmlFor="typeVehile">Тип транспорта</label>
        </div> 
        <div className="input-field col s6 m2">
                <input 
                placeholder="1"
                id="amountCar" 
                type="number" 
                name="amountCar"
                className="validate" 
                onChange={changeHandler} 
                value={form.amountCar}
                
                />
                <label htmlFor="amounCar">Количество машин</label>
            </div>

            {/* ГАБАРИТЫ */}
            <div className="input-field col s4 m2">
                <input 
                placeholder="Высота"
                id="about" 
                type="number" 
                name="aboutHeigth" 
                value={form.aboutHeigth}
                onChange={changeHandler} 
                />
                <label htmlFor="aboutHeight">Высота</label>
            </div> 
            <div className="input-field col s4 m2">
                <input 
                placeholder="Ширина"
                id="capasity" 
                type="number" 
                name="aboutWidth"
                value={form.aboutWidth}
                onChange={changeHandler} 
                
                />
                <label htmlFor="aboutWidth">Ширина</label>
            </div> 
            <div className="input-field col s4 m2">
                <input 
                placeholder="Глубина"
                id="volume" 
                type="number"
                name="aboutDepth" 
                value={form.aboutDepth}
                onChange={changeHandler} 
                
                />
                <label htmlFor="aboutDepth">Глубина</label>
            </div>
            {/* <div className="input-field col s2 m3" style={{marginLeft:'1%'}} >
                <label>
                    <input type="checkbox" />
                    <span>Указать габариты транспортного стредства(м)</span>
                </label>
            </div>*/}
         
        
        {/* ТРАНСПОРТ */}
        
           
            {/* <div className="input-field col s3 m3">
            <select 
                class="typeVehile" 
                id="typeVehile" 
                name="typeVehile" 
                onChange={changeHandler} 
                value={form.typeVehile}
                >
                <SelectOptionTypeVehile />
                </select>
                <label htmlFor="typeVehile">Тип транспорта</label>
            </div>  */}
            <div className="input-field col s6 m3">
                    <input 
                    placeholder="Вес"
                    id="capacity" 
                    type="number"
                    name="capacity" 
                    className="validate" 
                    value={form.capacity}
                    onChange={changeHandler} 
                    
                    />
                    <label htmlFor="capacity">Грузоподъёмность</label>
                </div> 
                <div className="input-field col s6 m3">
                    <input 
                    placeholder="Объём груза"
                    id="obem" 
                    type="number" 
                    name="obem"
                    className="validate" 
                    value={form.obem}
                    onChange={changeHandler} 
                    
                    />
                    <label htmlFor="obem">Полезный объём (м<sup>3</sup>)</label>
                </div>
            
            <div className="input-field col s6 offset-m2 m2">
                <input 
                placeholder="1000"
                id="value" 
                type="number" 
                name="value"
                className="validate" 
                onChange={changeHandler}
                value={form.value} 
               
                />
                <label htmlFor="value">Стоимость перевозки</label>
            </div>
            
            <div className="input-field col s6 m2">
                <select 
                class="valuta" 
                id="valuta" 
                name="valuta" 
                onChange={changeHandler} 
                value={form.valuta}
                >
                    <option value="Грн" selected>Грн</option>
                    <option value="Грн/км">Грн/км</option>
                </select>
            <label htmlFor="valuta">Грн/грн/км</label>
            </div>
            </div>
        <div className="row" style={{borderTop:'1px solid'}}>
            <div className="input-field col s12 m3">
                <input 
                placeholder="Имя"
                id="userName" 
                type="text" 
                name="userName"
                value={form.userName}
                onChange={changeHandler} 
                
                />
                <label htmlFor="userName">Имя или назва компании</label>
            </div>
            <div className="input-field col s12 m3">
                <input 
                placeholder="Email"
                id="email" 
                type="email" 
                name="email"
                value={form.email}
                onChange={changeHandler}  
                
                />
                <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12 m3">
                <input 
                placeholder="Телефон"
                id="phone" 
                type="text"
                name="phone" 
                value={form.phone}
                onChange={changeHandler}  
                
                />
                <label htmlFor="phone">Телефон</label>
            </div>
        </div>       
        <div className="row center">
            <div className="card-action ">
                <button 
                className="btn white-text #c62828 red darken-1"
                onClick={addHandler}
                disabled={loading}
                >
                Опубликовать
                </button>
            </div>
        </div>
</form>
</div>

    )
}