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
        dateFrom:today.toISOString().substring(0, 10), dateTo:today.toISOString().substring(0, 10), regionFrom:'Украина', regionTo:'Украина', cityFrom:'', cityTo:'', typeItem:'', typeCar0:'', typeCar1:'',typeCar2:'',typeCar3:'', typeCar4:'', amountCar:'', value:'', valuta:'', phone:'', email:'', userName:'', capacity:'', obem:'', about:' ', aboutHeigth:' ', aboutWidth:' ', aboutDepth:' ', tag0:'', tag1:''
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
        elems = document.querySelectorAll('.datepicker');
        window.M.Datepicker.init(elems, '');

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
        <form className="col s12 m12 center" onSubmit="return false" >
        <div className="card #ffebee red lighten-5">
                        <div className="card-content">
            <div className="row" ></div>
            <div className="row" >
                <div className="input-field col s6 m6">
                    <input 
                    placeholder="yyyy-mm-dd"
                    type="date" 
                    id="dateFrom" 
                    name="dateFrom" 
                    min = {mindata} 
                    max="2030-01-01" 
                    className=""
                    value={form.dateFrom}
                    onChange={changeHandler} 
                    />
                    <label htmlFor="dateFrom">начало погрузки</label>
                </div>
                <div className="col s1 m1"></div>
                <div className="input-field col s6 m6">
                
                    <input 
                    placeholder="yyyy-mm-dd"
                    type="date" 
                    id="dateTo" 
                    name="dateTo" 
                    min={mindata} 
                    max="2030-01-01" 
                    value={form.dateTo}
                    className=""
                    onChange={changeHandler} 
                    />
                    <label htmlFor="dateTo">конец погрузки</label>
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
                    <label htmlFor="capacity">Вес груза(T)</label>
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
                        <label htmlFor="aboutHeigth">Высота(М)</label>
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
                    <label htmlFor="aboutWidth">Ширина(М)</label>
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
                    <label htmlFor="aboutDepth">Глубина(М)</label>
                </div>
                {/* <div className="input-field col s2 m2" style={{marginLeft:'1%'}} >
                    <label>
                        <input type="checkbox" />
                        <span>Добавить габариты (м)</span>
                    </label>
                </div> */}
            </div>
            
            {/* ТРАНСПОРТ */}
            <div class="row" >
            <div className="col s12 m5 z-depth-1 #ffebee red lighten-4">
            
                <div className="input-field col s12 m12">
                    
                    <select 
                    class="typeCar0" 
                    id="typeCar0" 
                    name="typeCar0" 
                    onChange={changeHandler} 
                    value={form.typeCar0}
                    >
                        <SelectOptionTypeVehile />
                    </select>
                    <label htmlFor="typeCar0">Тип транспорта</label>
                </div> 
                <div className="input-field col s12 m12">
                    
                    <select 
                    class="typeCar1" 
                    id="typeCar1" 
                    name="typeCar1" 
                    onChange={changeHandler} 
                    value={form.typeCar1}
                    >
                        <SelectOptionTypeVehile />
                    </select>
                    <label htmlFor="typeCar1"></label>
                </div> 
                <div className="input-field col s12 m12">
                    
                    <select 
                    class="typeCar2" 
                    id="typeCar2" 
                    name="typeCar2" 
                    onChange={changeHandler} 
                    value={form.typeCar2}
                    >
                        <SelectOptionTypeVehile />
                    </select>
                    <label htmlFor="typeCar2"></label>
                </div> 
                <div className="input-field col s12 m12">
                    
                    <select 
                    class="typeCar3" 
                    id="typeCar3" 
                    name="typeCar3" 
                    onChange={changeHandler} 
                    value={form.typeCar3}
                    >
                        <SelectOptionTypeVehile />
                    </select>
                    <label htmlFor="typeCar3"></label>
                </div> 
                <div className="input-field col s12 m12">
                    
                    <select 
                    class="typeCar4" 
                    id="typeCar4" 
                    name="typeCar4" 
                    onChange={changeHandler} 
                    value={form.typeCar4}
                    >
                        <SelectOptionTypeVehile />
                    </select>
                    <label htmlFor="typeCar4"></label>
                </div> 
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
                
                <div className="col offset-m2 m5 s12 z-depth-1 #ffebee green lighten-5">
                        
                        <div className="input-field col s12 m12">
                            <input 
                            placeholder="1000"
                            id="value" 
                            type="number" 
                            name="value"
                            className="validate" 
                            onChange={changeHandler}
                            value={form.value} 
                        
                            />
                            <label htmlFor="value" className="black-text bolt">Стоимость перевозки</label>
                        </div>
                        
                        <div className="input-field col s12 m12">
                            <select 
                            class="valuta" 
                            id="valuta" 
                            name="valuta" 
                            onChange={changeHandler} 
                            value={form.valuta}
                            >
                                <option value="" selected>Не выбрано</option>
                                 <option value="Грн">Грн</option>
                                <option value="Грн/км">Грн/км</option>
                                <option value="USD">USD</option>
                                <option value="EURO">EURO</option>
                                
                            </select>
                        <label htmlFor="valuta" className="black-text bolt">Оплата</label>
                    </div>
                    <div className="input-field col s12 m12">
                            <select 
                            class="tag0" 
                            id="tag0" 
                            name="tag0" 
                            onChange={changeHandler} 
                            value={form.tag0}
                            >
                                <option value="" selected>Не выбрано</option>
                                <option value="При погрузке">При погрузке</option>
                                <option value="При выгрузке">При выгрузке</option>
                            </select>
                        <label htmlFor="tag0" className="black-text bolt">Место оплаты</label>
                    </div>
                    <div className="input-field col s12 m12">
                            <select 
                            class="tag1" 
                            id="tag1" 
                            name="tag1" 
                            onChange={changeHandler} 
                            value={form.tag1}
                            >
                                <option value="" selected>Не выбрано</option>
                                <option value="Наличными">Наличными</option>
                                <option value="Без наличными">Без наличными</option>
                                <option value="На карту">На карту</option>
                                <option value="Комбинированый">Комбинированый</option>
                            </select>
                        <label htmlFor="tag1" className="black-text bolt">Тип оплаты</label>
                    </div>
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
            </div>
            </div>  
    </form>
    
</div>
  
        )
}