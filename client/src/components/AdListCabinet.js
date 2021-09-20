import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import 'materialize-css'
export const AdListCabinet = ({ad,type}) => {
    
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const {token} = useContext(AuthContext)
    const [sub, setSub] = useState()
    const [page, setPage] = useState()
    const checkSub = useCallback( async () => {
        try{
            const IsUserSub = await request('/api/auth/checkSub', 'POST', null, {
                Authorization: `Bearer ${token}`
            })
            setSub(IsUserSub.IsSub)
            
        }
        catch(e){}
    },[token,request])
    const addHandler = async event => {  
       if(type==='cargo'){
           const id = event.target.dataset.user
        try {
            console.log('cargo',event.target.dataset.user)
            
            const data = await request('/api/cargo/delete', 'POST', {id}, {
                Authorization: `Bearer ${token}`
            })
            message(data.message)
        }catch (e)
        {}
    }
        if(type==='vehile'){
            console.log('vehile',event.target.dataset.user)
            try {
                const id = event.target.dataset.user
                const data = await request('/api/vehile/delete', 'POST', {id}, {
                    Authorization: `Bearer ${token}`
                })
                message(data.message)
            }catch (e)
            {}
        }
    }

    useEffect(()=>{
       
         var elems = document.querySelectorAll('select')
        var instances = window.M.FormSelect.init(elems, '')
        checkSub()
        setPage(ad.lenght)
    },[checkSub])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    

        if(!ad.length)
        {
        return <p className="center">Объявлений пока нету</p>
        }

        return(
        <>
        <div className="row"></div>
        {ad.map((ad, index) => {
             
            return(
                <div className="row #c62828 red lighten-5 z-depth-1">
                    <div className="col s12 center">
                        <span><b>{ad.regionFrom} - {ad.regionTo}</b></span>
                    </div>
                    <div className="row s12" >
                        <div className="col s5 m4" >
                            <h6><i className="material-icons">date_range</i>  {new Date(ad.dateFrom).toLocaleDateString().slice(0,5)} - {new Date(ad.dateTo).toLocaleDateString().slice(0,5)}</h6>
                        </div>
                        <div class="col s6">
                        <i class="material-icons">directions_bus</i>
                        
                                {/* <ul class="" 
                                style={{
                                    height:'10px',
                                    owerflow:'scroll'
                                 }}> */}
                                {ad.typeCar.map((car, index) => {
                                
                                return (
                                   <span>{car} </span>
                                )
                                })}
                            </div>
                        {/* <div class="input-field col s7">
                                <img className="prefix" src="truck.png" style={{
                                    height: '100%',
                                    width: 'auto',
                                    padding:'5px'
                                }}/>
                                <select>
                                <option> {ad.typeCar[0]} </option>
                                <option> {ad.typeCar[1]} </option>
                                <option> {ad.typeCar[2]} </option>
                                <option> {ad.typeCar[3]} </option>
                                <option> {ad.typeCar[4]} </option>
                            </select>
                            
                            <label htmlFor="" className="black-text bolt"></label>
                           
                            
                        </div> */}
                            {/* <div className="chip" >
                                <img src="truck.png" style={{
                                    height: '100%',
                                    width: 'auto',
                                }}/>{ad.typeCar}
                            </div> */}
                    </div>
                    <div className="col s12" >
                        <div className="col" >
                            <h6><i className="material-icons">fitness_center</i>  {ad.capacity} т.</h6>
                        </div> 
                        <div className="col" >
                            <h6><i className="material-icons">zoom_out_map</i>  {ad.obem}м<sup>3</sup></h6>
                        </div>
                        <div><h6>{ad.about}</h6></div>
                        </div>
                    {/* {sub && <div className="row">  */}
                        <div className="col s12" >
                            
                        </div>
                        <div className="col" >
                            <h6>{ ad.phone }</h6>
                        </div>
                        <div className="col green-text" >
                            <h6><b>{ad.value} {ad.valuta}</b></h6>
                        </div>
                        {ad.tag.map((tag, index) => {
                        return (
                            <span>{tag} </span>
                        )
                        })}<div className="row center">
                        <div className="card-action ">
                        <button 
                    className="waves-effect waves-light btn white-text #c62828 red darken-1"
                    data-user={ad._id}
                    onClick={addHandler}
                    disabled={loading}
                    >
                    Удалить
                    </button>
                    </div>
                    </div>
            </div> 
                    
                )
                })}
                </>
        )
}