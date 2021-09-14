import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import 'materialize-css'
export const AdList = ({ad}) => {
    const message = useMessage()
    const {request, error, clearError} = useHttp()
    const {token} = useContext(AuthContext)
    const [sub, setSub] = useState()
    const [page, setPage] = useState()
    const [datecreatenew, setdatecreatenew] = useState()
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

    useEffect(()=>{
        
        checkSub()
        setPage(ad.lenght)
    },[])

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
           {ad.reverse().map((ad, index) => {
               
            //    var 
            //     createtime = new Date(ad.dateCreate),
            //     nowtime = new Date(),
            //     now = new Date(nowtime - createtime),
            //     hour = now.getHours(),
            //     minute = now.getMinutes(),
            //     second = now.getSeconds(),
            //     message = '';
            //     console.log(createtime)
            //     // определим фразу приветствия в зависимости от местного времени пользователя 
            //     if (second <= 60) {
            //     message = 'Сейчас'
            //     }
            //     if (minute <= 60) {
            //     message = ' минут назад'
            //     minute = (minute < 10) ? '0' + minute : minute
            //     message +=  minute  + message
            //     }
            //     if (hour <= 1) {
            //     message = ' часов назад'
            //     hour = (hour < 10) ? '0' + hour : hour;
            //     message +=  minute  + message
            //     } else {
            //     message = 'Добрый вечер'

            //     }

            //     // выполним форматирование времени с использованием тернарного оператора
            //     minute = (minute < 10) ? '0' + minute : minute;
            //     second = (second < 10) ? '0' + second : second;
            //     hour = (hour < 10) ? '0' + hour : hour;

            //     message += ', сейчас ' + hour + ':' + minute + ':' + second;

                return(
                <div className="row" style={{border:'1px solid ', borderRadius:'10px', padding:'1rem 0'}}>
                        {/* <div className="col s12">
                            <div className="col s6 container " >
                                <h6><i className="material-icons">access_time</i>  {new Date(ad.dateCreate).toLocaleDateString().slice(0,5)}</h6>
                            </div>
                        </div> */}
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
                        {/* {sub && <div className="row">  */}
                           <div className="col s12" >
                                
                            </div>
                            <div className="col" >
                                <h6>{ ad.phone }</h6>
                            </div>
                            <div className="col green-text" >
                                <h6><b>{ad.value} {ad.valuta}</b></h6>
                            </div>
                            {/* <div className="col s12" >
                            <h6>{ad.email}</h6>
                        </div> */}
                        {/* </div>} */}
                        {/* {!sub && <div className="row center" style={{borderTop:'1px solid'}}> 
                        <a 
                        style={{marginTop:'10px'}}
                        class="waves-effect waves-light btn white-text #6d4c41 brown darken-3"
                        onClick={addHandler}
                        >
                        Посмотреть информацию</a>
                        </div>
                        } */}
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