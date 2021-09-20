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
    const today = new Date()
    const mindata = Date.now()
    const [userInfo, setUserInfo] = useState({email:'', links:[], subscribe:'', dateSubscribe:'', phone:'', userName:''})
    const  [form, setForm] = useState({
        dateFrom:today.toISOString().substring(0, 10), dateTo:today.toISOString().substring(0, 10), regionFrom:'Украина', regionTo:'Украина', cityFrom:'', cityTo:'', codeVehile:'', typeCar:'', type0:'', type1:'',type2:'',type3:'', type4:'', amountCar:'', value:'', valuta:'', phone:'', email:'', about:'', capacity:'', userName:'', aboutHeigth:' ', aboutWidth:' ',  obem:'', aboutDepth:' ', tag0:'', tag1:''
    })

    const addUserInfo = async () =>{
        try{
            const user = await request('/api/auth/userInfo', 'POST', null, {
                Authorization: `Bearer ${auth.token}`
            })
            console.log(user)
            setUserInfo(user.user)

        }
        catch(e){}
    }

    useEffect(() => {
        message(error)
        addUserInfo()
        clearError()
    }, [error, message, clearError])

    useEffect(()=>{
        
        window.M.updateTextFields()
        
        var elems = document.querySelectorAll('select')
        window.M.FormSelect.init(elems, '')
        elems = document.querySelectorAll('.datepicker');
        window.M.Datepicker.init(elems, '');

        // var elemsAuto = document.querySelectorAll('.autocomplete')
        // window.M.Autocomplete.init(elemsAuto,'')
        // var data = {
        // "Apple": null,
        // "Microsoft": null,
        // "Google": 'https://placehold.it/250x250'
        // }
        // elemsAuto = document.querySelectorAll('.autocomplete')
        
        // var instances = window.M.Autocomplete.init(elemsAuto,data)
        // console.log(instances)

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
        form.email=userInfo.email
        form.phone=userInfo.phone
        form.userName=userInfo.userName
        setForm ({...form, [even.target.name]: even.target.value})
        
    }

    const addHandler = async () => {
        form.about = 'Ширина:' + form.aboutWidth +' Висота:' + form.aboutHeigth +' Глубина:'+ form.aboutDepth
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
    <div className="row" >
    {/* <form className="col s1"></form> */}
    {/* ДАТА И ГОРОД */}
    <div className="row s12 m12"><h3>Добавление заявки на транспорт</h3></div>
    <form className="col s12 m12 center" >
    <div className="card #ffebee red lighten-5">
                        <div className="card-content">
        <div className="row" ></div>
        <div className="row" >
                <div className="input-field col s6 m6">
                    <input 
                     placeholder="yyyy-mm-dd"
                    type="text" 
                    id="dateFrom" 
                    name="dateFrom" 
                    min = {mindata} 
                    max="2030-01-01" 
                    className="datepicker"
                    value={form.dateFrom}
                    onChange={changeHandler} 
                    />
                    <label htmlFor="dateFrom"  className="black-text bolt">начало погрузки</label>
                </div>
                <div className="col s1 m1"></div>
                <div className="input-field col s6 m6">
                
                    <input 
                     placeholder="yyyy-mm-dd"
                    type="text" 
                    id="dateTo" 
                    name="dateTo" 
                    min={mindata} 
                    max="2030-01-01" 
                    className="datepicker"
                    value={form.dateTo}
                    onChange={changeHandler} 
                    />
                    <label htmlFor="dateTo"  className="black-text bolt">конец погрузки</label>
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
                    <label htmlFor="regionFrom"  className="black-text bolt">ОБЛАСТЬ ОТБЫТИЯ</label>
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
                    <label htmlFor="cityFrom"  className="black-text bolt">ГОРОД</label>
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
                    <label htmlFor="regionTo"  className="black-text bolt">ОБЛАСТЬ ПРИЕЗДА</label>
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
                    <label htmlFor="cityTo" className="black-text bolt">ГОРОД</label>
                </div>
            </div> 
            

        {/* ТИП ТРАНСПОРТА ВЕС ОБ'ЄМ */}
        <div class="row" style={{borderTop:'1px solid'}} >
        <div className="">
        <div className="col s12 m3 z-depth-1 #ffebee red lighten-4">
                <div className="input-field col s12 m12">
                    
                    <select 
                    class="typeCar0" 
                    id="typeCar0" 
                    name="typeCar0" 
                    onChange={changeHandler} 
                    value={form.type0}
                    >
                        <SelectOptionTypeVehile />
                    </select>
                    <label htmlFor="typeCar0" className="black-text bolt">Тип транспорта</label>
                </div> 
                <div className="input-field col s12 m12">
                    
                    <select 
                    class="typeCar1" 
                    id="typeCar1" 
                    name="typeCar1" 
                    onChange={changeHandler} 
                    value={form.type1}
                    >
                        <SelectOptionTypeVehile />
                    </select>
                    <label htmlFor="typeCar1" className="black-text bolt"></label>
                </div> 
                <div className="input-field col s12 m12">
                    
                    <select 
                    class="typeCar2" 
                    id="typeCar2" 
                    name="typeCar2" 
                    onChange={changeHandler} 
                    value={form.type2}
                    >
                        <SelectOptionTypeVehile />
                    </select>
                    <label htmlFor="typeCar2" className="black-text bolt"></label>
                </div> 
                <div className="input-field col s12 m12">
                    
                    <select 
                    class="typeCar3" 
                    id="typeCar3" 
                    name="typeCar3" 
                    onChange={changeHandler} 
                    value={form.type3}
                    >
                        <SelectOptionTypeVehile />
                    </select>
                    <label htmlFor="typeCar3" className="black-text bolt"></label>
                </div> 
                <div className="input-field col s12 m12">
                    
                    <select 
                    class="typeCar4" 
                    id="typeCar4" 
                    name="typeCar4" 
                    onChange={changeHandler} 
                    value={form.type4}
                    >
                        <SelectOptionTypeVehile />
                    </select>
                    <label htmlFor="typeCar4" className="black-text bolt"></label>
                </div> </div> 
                </div>
                <div className="input-field col s12 m3">
                <input 
                placeholder="1"
                id="amountCar" 
                type="number" 
                name="amountCar"
                className="validate" 
                onChange={changeHandler} 
                value={form.amountCar}
                
                />
                <label htmlFor="amounCar" className="black-text bolt">Количество машин</label>
            </div>
            <div className="input-field col s12 m3">
                    <input 
                    placeholder="Вес"
                    id="capacity" 
                    type="number"
                    name="capacity" 
                    className="validate" 
                    value={form.capacity}
                    onChange={changeHandler} 
                    
                    />
                    <label htmlFor="capacity" className="black-text bolt">Грузоподъёмность(T)</label>
                </div> 
                <div className="input-field col s12 m3">
                    <input 
                    placeholder="Объём груза"
                    id="obem" 
                    type="number" 
                    name="obem"
                    className="validate" 
                    value={form.obem}
                    onChange={changeHandler} 
                    
                    />
                    <label htmlFor="obem" className="black-text bolt">Полезный объём (м<sup>3</sup>)</label>
                </div>

            {/* ГАБАРИТЫ */}
            <div className="input-field col s12 m3">
                <input 
                placeholder="Высота"
                id="about" 
                type="number" 
                name="aboutHeigth" 
                value={form.aboutHeigth}
                onChange={changeHandler} 
                />
                <label htmlFor="aboutHeight" className="black-text bolt">Высота(М)</label>
            </div> 
            <div className="input-field col s12 m3">
                <input 
                placeholder="Ширина"
                id="capasity" 
                type="number" 
                name="aboutWidth"
                value={form.aboutWidth}
                onChange={changeHandler} 
                
                />
                <label htmlFor="aboutWidth" className="black-text bolt">Ширина(М)</label>
            </div> 
            <div className="input-field col s12 m3">
                <input 
                placeholder="Глубина"
                id="volume" 
                type="number"
                name="aboutDepth" 
                value={form.aboutDepth}
                onChange={changeHandler} 
                
                />
                <label htmlFor="aboutDepth" className="black-text bolt">Глубина(М)</label>
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
            
                <div className="col offset-m3 m6 z-depth-1 #ffebee green lighten-5">
                        <div className="">
                        <div className="input-field col s12 m6">
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
                        
                        <div className="input-field col s12 m6">
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
                    <div className="input-field col s12 m6">
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
                    <div className="input-field col s12 m6">
                            <select 
                            class="tag1" 
                            id="tag1" 
                            name="tag1" 
                            onChange={changeHandler} 
                            value={form.tag1}
                            >
                                <option value="" selected>Не выбрано</option>
                                <option value="Наличными" >Наличными</option>
                                <option value="Без наличными">Без наличными</option>
                                <option value="На карту">На карту</option>
                                <option value="Комбинированый">Комбинированый</option>
                            </select>
                        <label htmlFor="tag1" className="black-text bolt">Тип оплаты</label>
                    </div>
                </div>
                
            </div>
            </div>
        {/* <div className="row" style={{borderTop:'1px solid'}}>
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
        </div>        */}
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
        </div>
        </div>
</form>
</div>

    )
}