import React, {useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { SelectOptionTypeVehile } from '../components/SelectOptionTypeVehile'
import {SelectOptionCity} from '../components/SelectOptionCity'
import 'materialize-css'

export const CargoPage = () => {
    
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const today = new Date()
    const [userInfo, setUserInfo] = useState({email:'', links:[], subscribe:'', dateSubscribe:'', phone:'', userName:''})
    const  [form, setForm] = useState({
        dateFrom:today.toISOString().substring(0, 10), dateTo:today.toISOString().substring(0, 10), regionFrom:'Украина', regionTo:'Украина', cityFrom:'', cityTo:'', typeItem:'', type0:'', type1:'',type2:'',type3:'', type4:'', amountCar:'', value:'', valuta:'', phone:'', email:'', userName:'', capacity:'', obem:'', about:' ', aboutHeigth:' ', aboutWidth:' ', aboutDepth:' '
    })

    
    useEffect(() => {
        
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(()=>{
        
        window.M.updateTextFields()
        addUserInfo()
        var elems = document.querySelectorAll('select');
        window.M.FormSelect.init(elems, '');

        elems = document.querySelectorAll('.autocomplete');
        window.M.Autocomplete.init(elems,'');

    }, [])


    const addUserInfo = async () =>{
        try{
            const user = await request('/api/auth/userInfo', 'POST', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setUserInfo(user.user)

        }
        catch(e){}
    }

    const changeHandler = even => {
        form.email=userInfo.email
        form.phone=userInfo.phone
        form.userName=userInfo.userName
        setForm ({...form, [even.target.name]: even.target.value})
    }

    const addHandler = async () => {  
       
        form.about = 'Шир:' + form.aboutWidth +' Выс:' + form.aboutHeigth +' Глуб:'+ form.aboutDepth
        console.log(form)
        try {
            const data = await request('/api/cargo/generate', 'POST', {...form}, {
                Authorization: `Bearer ${auth.token}`
            })
            message(data.message)
        }catch (e)
        {}
    }

    const changeSelector = () =>{
    }
 const mindata = Date.now()

    return(
    <div className="row">
        {/* <form className="col s1"></form> */}
        {/* ДАТА И ГОРОД */}
        <div className="row">
            <h3>Добавление заявки на перевозку груза</h3>
        </div>
        <form className="col s12 m11 center" style={{border:'2px solid'}} onSubmit="return false" >
            <div className="row" ></div>
            <div className="row" >
                <div className="input-field col s6 m6">
                    <input 
                    type="date" 
                    id="dateFrom" 
                    name="dateFrom" 
                    min = {mindata} 
                    max="2030-01-01" 
                   
                    value={form.dateFrom}
                    onChange={changeHandler} 
                    />
                    <label htmlFor="dateFrom">ПОГРУЗКА C</label>
                </div>
                <div className="col s1 m1"></div>
                <div className="input-field col s6 m6">
                
                    <input 
                    type="date" 
                    id="dateTo" 
                    name="dateTo" 
                    min={mindata} 
                    max="2030-01-01" 
                    value={form.dateTo}
                    onChange={changeHandler, changeSelector} 
                    />
                    <label htmlFor="dateTo">ПОГРУЗКА ПО</label>
                </div>
            </div>
            <div className="row" >
                <div className="input-field col s12 m6">
                <select
                    placeholder=""
                    id="regionFrom" 
                    type="text" 
                    name="regionFrom"
                    className="autocomplete" 
                    value={form.regionFrom}
                    onChange={changeHandler}  
                    >
                        <SelectOptionCity></SelectOptionCity>
                    </select>
                    <label htmlFor="regionFrom">ОБЛАСТЬ ОТБЫТИЯ</label>
                </div> 
                <div className="input-field col s12 m6">
                    <input 
                    id="cityFrom" 
                    type="text" 
                    name="cityFrom"
                    className="validate" 
                    value={form.cityFrom}
                    onChange={changeHandler} 
                    />
                    <label htmlFor="cityFrom">ГОРОД</label>
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
                    <label htmlFor="regionTo">ОБЛАСТЬ ПРИЕЗДА</label>
                </div>
               
                <div className="input-field col s12 m6">
                    <input 
                    id="cityTo" 
                    type="text" 
                    name="cityTo"
                    className="validate" 
                    value={form.cityTo}
                    onChange={changeHandler} 
                    />
                    <label htmlFor="cityTo">ГОРОД</label>
                </div>
            </div> 
            
           
            {/* ГРУЗ ВЕС ОБ'ЄМ */}
            <div className="row" style={{borderTop:'1px solid'}} >
                <div className="input-field col s6 m6">
                    <input 
                    placeholder="Запчасти"
                    id="typeItem" 
                    type="text" 
                    name="typeItem"
                    className="validate" 
                    value={form.typeItem}
                    onChange={changeHandler} 
                    />
                    <label htmlFor="typeItem">Характер груза</label>
                </div> 
                <div className="input-field col s3 m3">
                    <input 
                    placeholder="10"
                    id="capacity" 
                    type="number"
                    name="capacity" 
                    className="validate" 
                    value={form.capacity}
                    onChange={changeHandler} 
                    min="1"
                    />
                    <label htmlFor="capacity">Вес груза</label>
                </div> 
                <div className="input-field col s3 m3">
                    <input 
                    placeholder="124"
                    id="obem" 
                    type="number" 
                    name="obem"
                    className="validate" 
                    value={form.obem}
                    onChange={changeHandler} 
                    min="1"
                    />
                    <label htmlFor="obem">Объём груза (м<sup>3</sup>)</label>
                </div>
                {/* ГАБАРИТЫ */}
                <div className="input-field col s4 m2">
                        <input 
                        placeholder="3"
                        id="aboutHeigth" 
                        type="number" 
                        name="aboutHeigth"
                        className="validate" 
                        value={form.aboutHeigth}
                        onChange={changeHandler} 
                        />
                        <label htmlFor="aboutHeigth">Высота</label>
                </div> 
                <div className="input-field col s4 m2 ">
                    <input 
                    placeholder="5"
                    id="aboutWidth" 
                    type="number" 
                    name="aboutWidth"
                    className="validate" 
                    value={form.aboutWidth}
                    onChange={changeHandler} 
                    min="1"
                    />
                    <label htmlFor="aboutWidth">Ширина</label>
                </div> 
                <div className="input-field col s4 m2">
                    <input 
                    placeholder="4"
                    id="aboutDepth" 
                    type="number"
                    name="aboutDepth" 
                    className="validate" 
                    value={form.aboutDepth}
                    onChange={changeHandler} 
                    min="1"
                    />
                    <label htmlFor="aboutDepth">Глубина</label>
                </div>
                {/* <div className="input-field col s2 m2" style={{marginLeft:'1%'}} >
                    <label>
                        <input type="checkbox" />
                        <span>Добавить габариты (м)</span>
                    </label>
                </div> */}
            </div>
            
            {/* ТРАНСПОРТ */}
            <div class="row" style={{borderTop:'1px solid'}} >
               
                <div className="input-field col s12 m3">
                    
                    <select 
                    class="typeCar0" 
                    id="typeCar0" 
                    name="typeCar0" 
                    onChange={changeHandler} 
                    value={form.type0}
                    >
                        <SelectOptionTypeVehile />
                    </select>
                    <label htmlFor="typeCar0">Тип транспорта</label>
                </div> 
                <div className="input-field col s12 m3">
                    
                    <select 
                    class="typeCar1" 
                    id="typeCar1" 
                    name="typeCar1" 
                    onChange={changeHandler} 
                    value={form.type1}
                    >
                        <SelectOptionTypeVehile />
                    </select>
                    <label htmlFor="typeCar1">Тип транспорта</label>
                </div> 
                <div className="input-field col s12 m3">
                    
                    <select 
                    class="typeCar2" 
                    id="typeCar2" 
                    name="typeCar2" 
                    onChange={changeHandler} 
                    value={form.type2}
                    >
                        <SelectOptionTypeVehile />
                    </select>
                    <label htmlFor="typeCar2">Тип транспорта</label>
                </div> 
                <div className="input-field col s12 m3">
                    
                    <select 
                    class="typeCar3" 
                    id="typeCar3" 
                    name="typeCar3" 
                    onChange={changeHandler} 
                    value={form.type3}
                    >
                        <SelectOptionTypeVehile />
                    </select>
                    <label htmlFor="typeCar3">Тип транспорта</label>
                </div> 
                <div className="input-field col s12 m3">
                    
                    <select 
                    class="typeCar4" 
                    id="typeCar4" 
                    name="typeCar4" 
                    onChange={changeHandler} 
                    value={form.type4}
                    >
                        <SelectOptionTypeVehile />
                    </select>
                    <label htmlFor="typeCar4">Тип транспорта</label>
                </div> 
                {/* <div className="input-field col s12 m2">
                    <input 
                    placeholder="2"
                    id="amountCar" 
                    type="number" 
                    name="amountCar"
                    className="validate" 
                    onChange={changeHandler} 
                    value={form.amountCar}
                    min="1"
                    />
                    <label htmlFor="amounCar">Количество машин</label>
                </div>  */}
                <div className="input-field col s6 offset-m3 m3">
                    <input 
                    placeholder="Цена"
                    id="value" 
                    type="number" 
                    name="value"
                    className="validate" 
                    onChange={changeHandler}
                    value={form.value} 
                    min="1"
                    />
                    <label htmlFor="value">Цена</label>
                </div>
                
                <div className="input-field col s6 m3">
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
{/*                 
                <div className="row" style={{borderTop:'1px solid'}}>
                <div className="input-field col s12 m3" id="div_name">
                    <input 
                    placeholder="Иван"
                    id="userName" 
                    type="text" 
                    name="userName"
                    className="validate" 
                    value={form.userName}
                    onChange={changeHandler} 
                    min="1"
                    />
                    <label htmlFor="userName">Имя или назва компании</label>
                </div>
                <div className="input-field col s12 m3" id="div_email">
                    <input 
                    placeholder="4"
                    id="email" 
                    type="email" 
                    name="email"
                    className="validate"
                    value={form.email}
                    onChange={changeHandler}  
                    min="1"
                    />
                    <label htmlFor="email">email</label>
                </div>
                <div className="input-field col s12 m3" id="div_phone">
                    <input 
                    placeholder="4"
                    id="phone" 
                    type="text"
                    name="phone" 
                    className="validate"
                    value={form.phone}
                    onChange={changeHandler}  
                    min="1"
                    />
                    <label htmlFor="phone">telephone</label>
                </div> */}
                
            {/* </div>  */}
            <div className="row center">
                <div className="card-action ">
                    <button 
                    className="waves-effect waves-light btn white-text #c62828 red darken-1"
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