import React, {useEffect, useState } from 'react'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import IMask from 'imask'

export const RegisterPage = () => {
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const  [form, setForm] = useState({
        email:'',password:'', phone:'', userName:''
    })
    
    useEffect(() => {    
        message(error)
        clearError()
        var phoneMask = IMask(
            document.getElementById('phone'), {
              mask: '+{38}(000)000-00-00'
            });
    }, [error, message, clearError])

    useEffect(()=>{
        window.M.updateTextFields()
    }, [])

    const changeHandler = even => {
        
        setForm ({...form, [even.target.name]: even.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e){}
    }

    return (
    <div className="row">
        <form className="col s12">
        <h4 className="center">Зарегистрироваться</h4>
        <div className="card #6d4c41 brown darken-1">
            <div className="card-content white-text">
                <div className="row"></div>
                    <div className="row white-text">
                        <div className="input-field col s12 m6">
                            <input
                            placeholder="Введите email"
                            id="email"
                            type="text" 
                            name="email"
                            className="validate yellow-input "
                            value={form.email}
                            onChange={changeHandler} 
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s12 m6">
                            <input 
                            placeholder="Пароль" 
                            id="password" 
                            type="password" 
                            name="password"
                            className="validate yellow-input" 
                            value={form.password}
                            onChange={changeHandler}
                            />
                            <label for="password">Пароль</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m6 ">
                            <input 
                            placeholder="Имя" 
                            id="name" 
                            type="text" 
                            name="userName"
                            className="validate yellow-input"
                            value={form.userName}
                            onChange={changeHandler}
                            />
                            <label htmlFor="name">Название организации</label>
                        </div>
                        <div className="input-field col s12 m6 ">
                            <input 
                            placeholder="Телефон" 
                            id="phone" 
                            type="text" 
                            name="phone"
                            className="validate phone yellow-input" 
                            value={form.phone}
                            onChange={changeHandler}
                            />
                            <label for="phone">Телефон</label>
                        </div>
                    </div>
                    <div className="row center">
                        <div className="card-action">
                            <button 
                            className="btn white-text #6d4c41 brown darken-3"
                            onClick={registerHandler}
                            disabled={loading}
                            >
                            Регистрация
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    )
}