import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import 'materialize-css'
export const AdListCabinet = ({ad}) => {
    const message = useMessage()
    const {request, error, clearError} = useHttp()
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

    const addHandler = async () => {
       message("Купите подписку для просмотра информации")
    }

    const nextPage = (index) => {
      
    }

    useEffect(()=>{
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
                    <div className="row" style={{border:'1px solid ', borderRadius:'10px', padding:'1rem 0'}}>
                          
                            <div className="col s12">
                                <span><b>{ad.regionFrom} - {ad.regionTo}</b></span>
                            </div>
                            <div className="col s12" >
                                <div className="col s6" >
                                    <h6><i className="material-icons">date_range</i>  {new Date(ad.dateFrom).toLocaleDateString().slice(0,5)} - {new Date(ad.dateTo).toLocaleDateString().slice(0,5)}</h6>
                                </div>
                                <div className="col s6" >
                                    <div className="col s3" style={{
                                        width: '50px',
                                        height: '30px'}}>
                                        <img src="truck.png" style={{
                                            height: '100%',
                                            width: 'auto',
                                        }}/>
                                    </div>
                                    <h6>{ad.typeCar}</h6>
                                </div>
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
                               <div className="col s12" >
                                    
                                </div>
                                <div className="col" >
                                    <h6>{ ad.phone }</h6>
                                </div>
                                <div className="col green-text" >
                                    <h6><b>{ad.value} {ad.valuta}</b></h6>
                                </div>
                    </div>
                    )
                    })}
                     
                     </>
        )
}