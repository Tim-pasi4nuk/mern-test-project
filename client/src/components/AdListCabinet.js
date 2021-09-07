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
                <div className="row" style={{border:'1px solid ', borderRadius:'10px'}}>
                    <div className="row"></div>
                    <div className="container__inner">
                        <div className="row">
                            <div className="col s3" >
                                <h6>Дата создания: {new Date(ad.dateCreate).toLocaleDateString()}</h6>
                            </div>
                            <div className="col s3" >
                                <h6>Тип:{ad.typeCar}</h6>
                            </div>
                            <div className="col s3" >
                                <h6>Вес: {ad.capacity}</h6>
                            </div>
                            <div className="col s3" >
                                <h6>Объём: {ad.obem}</h6>
                            </div>
                        </div>
                        <div className="row" style={{borderTop:'1px solid'}}>
                            <div className="col s3" >
                                <h6>Откуда {ad.regionFrom}</h6>
                            </div>
                            <div className="col s3" >
                                <h6>Куда {ad.regionTo}</h6>
                            </div>
                            <div className="col s3">
                            </div>
                            <div className="col s3" >
                                <h6>Цена {ad.value} {ad.valuta}</h6>
                            </div>
                        </div>
                         <div className="col s3" >
                                <h6>{ad.about}</h6>
                            </div>
                        {sub && <div className="row" style={{borderTop:'1px solid'}}> 
                           
                            <div className="col s3" >
                                <h6>{ ad.phone }</h6>
                            </div>
                            <div className="col s3" >
                                <h6>{ad.email}</h6>
                            </div>
                            <div className="col s3">
                                <h6>{ad.obem}</h6>
                            </div>
                        </div>}
                        {!sub && <div className="row center" style={{borderTop:'1px solid'}}> 
                        <a 
                        style={{marginTop:'10px'}}
                        class="waves-effect waves-light btn white-text #6d4c41 brown darken-3"
                        onClick={addHandler}
                        >
                        Посмотреть информацию</a>
                        </div>
                        }
                    </div>
                </div>
        
                )
                })}
               
                {/* <ul class="pagination">  
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
                {ad.slice([startIndex], [endIndex]).map((cargo, index) => {
                    <>
                    <li class="active"><a href="#!">1</a></li>
                    <li class="waves-effect"><a href="#!" onClick={nextPage()}>index</a></li>
                    </>})}
            <li class="waves-effect"><a href="#!" onClick={nextPage()}><i class="material-icons">chevron_right</i></a></li>
            </ul> */}
                  </>
          
        )
}