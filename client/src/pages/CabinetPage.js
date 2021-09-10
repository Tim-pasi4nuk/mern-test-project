import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AdListCabinet } from '../components/AdListCabinet'
import { AuthContext } from '../context/AuthContext'
import { useMessage } from '../hooks/message.hook'
import { NavLink } from 'react-router-dom'
import { Loader } from '../components/Loader'
export const CabinetPage = () => {
    const [ads, setAds] = useState([])
    const [search, setSearch] = useState(false)
    const {loading, request, error, clearError} = useHttp()
    const {token} = useContext(AuthContext)
    const message = useMessage()
    const [sub, setSub] = useState()
    const [userInfo, setUserInfo] = useState({email:'', links:[], subscribe:'', dateSubscribe:'', phone:[], userName:''})
    const addHandler = async () => {
        getSubscribe()
        window.location.reload()
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

    const getSubscribe = useCallback( async () => {
        try{
            const getSub = await request('/api/auth/getSub', 'POST', null,{
                Authorization: `Bearer ${token}`
            })

        }
         catch (e){}
    })

    const addHandlerCargo = async () => {
        try {
                const list = await request('/api/search/getListCargo', 'POST', null, {
                    Authorization: `Bearer ${token}`
            })
            console.log(list)
            setAds(list)
            setSearch(true)
        }
         catch (e){}
    }
    const addHandlerVehile = async () => {
        try {
                const list = await request('/api/search/getListVehile', 'POST', null, {
                    Authorization: `Bearer ${token}`
            })
            console.log(list)
            setAds(list)
            setSearch(true)
        }
         catch (e){}
    }

    const getUser = useCallback( async () => {
        try{
            const user = await request('/api/auth/userInfo', 'POST', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(user)
            setUserInfo(user.user)
            
        }
        catch(e){}
    },[token,request])

    useEffect(()=>{
        getUser()
        checkSub()
        message(error) 
        clearError()
    },[checkSub, getUser, error, message, clearError])

    if(loading){
        return <Loader></Loader>
    }


    return(
        <>
        <h3>Личный кабинет</h3>
        <div className="container" style={{border:'1px solid ', borderRadius:'10px'}}>
            <div className="container">
            <i class="material-icons large">account_box</i>
            </div>
            <div className="container">
            <h6>Имя: {userInfo.userName}</h6>
            <h6>email: {userInfo.email}</h6>
             <h6>Телефон: {userInfo.phone}</h6>
            {sub && <>
            
            <h6>Подписка действительна до:{new Date(userInfo.dateSubscribe).toLocaleDateString()}</h6>
            </>}
            {!sub && <NavLink to ="/SubscribePage">Купить подписку</NavLink>}
            </div>
        </div>
        <div className="container">
            <div>
                <a 
                style={{marginTop:'10px'}}
                class="waves-effect waves-light btn white-text #6d4c41 brown darken-3"
                onClick={addHandlerCargo}
                >
                Посмотреть мои грузы</a>
            </div>
            <div>
                <a 
                style={{marginTop:'10px'}}
                class="waves-effect waves-light btn white-text #6d4c41 brown darken-3"
                onClick={addHandlerVehile}
                >
                Посмотреть мой транспорт</a>
            </div>
        
        </div>{!loading && search && <AdListCabinet ad={ads}/>}
        </>
    )
}