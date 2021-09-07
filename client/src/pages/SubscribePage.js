import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const SubscribePage = () => {
    const [sub, setSub] = useState()
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    
    const checkSub = useCallback( async () => {
        try{
            const sub = await request('/api/auth/checkSub', 'POST', null, {
                Authorization: `Bearer ${token}`
            })
            setSub(sub)
        }
        catch(e){}
    },[token,request])

    
    const buySub = useCallback( async () => {
        try{
            const fetched = await request('/api/auth/getSub', 'POST', null, {
                Authorization: `Bearer ${token}`
            })
        }
        catch(e){}
    },[token,request])

    

    const addHandler = async () => {
       buySub()
     }

    useEffect(()=>{
        checkSub()
    },[checkSub])

    return (
        <>
        <div className="container center">
            <div className="container_subscribe"><span>Подписка Dogrooz777</span></div>
            <span></span>
           <a
            class="waves-effect waves-light btn white-text #6d4c41 brown darken-3"
            onClick={addHandler}
            >Купить подписку</a>
        </div>
        </>
    )
}