import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import 'materialize-css'
export const AdList = ({ad}) => {
    var jsonQuery = require('json-query')
    let cityOption = require('./data.json')
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
        
        var elems = document.querySelectorAll('select')
        var instances = window.M.FormSelect.init(elems, '')
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
                // var distance = require('google-distance-matrix')
                // const reslat = jsonQuery(`regions[**].cities[name=${ad.cityFrom}].lat`,{data:cityOption})
                // const reslng = jsonQuery(`regions[**].cities[name=${ad.cityFrom}].lng`,{data:cityOption})
                
                // const origins = [ad.cityFrom,`${reslat.value}, ${reslng.value}`]
                // const reslatF = jsonQuery(`regions[**].cities[name=${ad.cityTo}].lat`,{data:cityOption})
                // const reslngF = jsonQuery(`regions[**].cities[name=${ad.cityTo}].lng`,{data:cityOption})
                // const destinations = [ad.cityTo,`${reslatF.value}, ${reslngF.value}`]
                // console.log(origins, destinations)
                // distance.mode('driving')
                // distance.matrix(origins, destinations, function (err, distances) {
                //     if (!err)
                //         console.log(distances)
                // })
                
                
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
                    <>
                        <div className="row #c62828 red lighten-5 z-depth-1">
                        
                        <div className="col s12 center">
                            <span style={{textTransform:'uppercase'}}><b>{ad.regionFrom}, {ad.cityFrom} - {ad.regionTo}, {ad.cityTo}</b></span>
                        </div>
                        <div className="col s12" >
                            <div className="col" >
                                <h6><i className="material-icons">date_range</i>  {new Date(ad.dateFrom).toLocaleDateString().slice(0,5)} - {new Date(ad.dateTo).toLocaleDateString().slice(0,5)}</h6>
                            </div>
                            
                            {/* <div className="col s6" >
                                <div className="col s3" style={{
                                    width: '50px',
                                    height: '30px'}}><tag>
                                    <img src="truck.png" style={{
                                        height: '100%',
                                        width: 'auto',
                                    }}/>{ad.typeCar}</tag>
                                </div>
                                
                            </div> */}
                            <div class="col s6">
                            <i class="material-icons">directions_bus</i>
                            
                                {/* <ul class="" 
                                style={{
                                    height:'10px',
                                    owerflow:'scroll'
                                 }}> */}
                                {ad.typeCar.map((car, index) => {
                                
                                return (
                                   <span><b>{car}</b> </span>
                                )
                                })}
                                {/* </ul> */}
                                
                                {/*                                 
                                <select>
                                <option> {ad.typeCar[0]} </option>
                                <option> {ad.typeCar[1]} </option>
                                <option> {ad.typeCar[2]} </option>
                                <option> {ad.typeCar[3]} </option>
                                <option> {ad.typeCar[4]} </option>
                            </select>
                             */}
                            
                            <label htmlFor="" className="black-text bolt"></label>
                           
                            
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
                                {ad.tag.map((tag, index) => {
                                
                                return (
                                   <span>{tag} </span>
                                )
                                })}
                            </div>
                            
                
                </div>
                </>
                )
                })}
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
                {/* <div className="col s12">
                            <div className="col s6 container " >
                                <h6><i className="material-icons">access_time</i>  {new Date(ad.dateCreate).toLocaleDateString().slice(0,5)}</h6>
                            </div>
                        </div> */}
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