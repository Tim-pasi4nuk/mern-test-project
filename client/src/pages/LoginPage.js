import React, {useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const LoginPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const  [form, setForm] = useState({
        email:'',password:''
    })

    useEffect(() => { 
        message(error) 
        clearError()
    }, [error, message, clearError])

    useEffect(()=>{window.M.updateTextFields()}, [])

    const changeHandler = even => {
        setForm ({...form, [even.target.name]: even.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e){}
    }

    return (
        <div className="row">
            <div className=" s6">
                <h1 className="center">Войти</h1>
                <div className="card #c62828 red darken-1">
                    <div className="card-content white-text">
                        <span className="card-title"><h3>Авторизация</h3></span>
                       <div>

                        <div className="input-field">
                            <input
                                id="email"
                                type="text" 
                                name="email"
                                className="yellow-input"
                                value={form.email}
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                            <input
                                id="password"
                                type="password" 
                                name="password"
                                className="yellow-input"
                                value={form.password}
                                onChange={changeHandler}
                            />
                            <label htmlFor="password">Пароль</label>
                            </div>
                       </div>
                    </div>
                    <div className="card-action center">
                        <button
                         className="btn #c62828 red darken-3"
                         style={{marginRight:10}}
                         disabled={loading}
                         onClick={loginHandler}
                         >
                        Войти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}