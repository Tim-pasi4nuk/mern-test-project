import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AdList } from '../components/AdList'
import { Loader } from '../components/Loader'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { SelectOptionCity } from '../components/SelectOptionCity'
export const CityComponent = ({city, form, changeHandler}) =>{
const message = useMessage()
const {loading, request, error, clearError} = useHttp()
const [citylist, setcitylist] = useState([])
let cityOption = require('./data.json')
var jsonQuery = require('json-query')

 const findCity = (city) => {
        
        console.log('findcity', city)
        const res = jsonQuery(`regions[**][name=${city}].cities.name`,{data:cityOption, parents:city})
        console.log('res:',res.value)
        return res.value
    }
    
    const changeSelector = () => {
        console.log('city', city)
        if(!(form.regionFrom==='Украина')){
            
            setcitylist(findCity(city))
            
            // for (var citi in citys) {
            //     opt.value = citi;
            //     opt.innerHTML = citi;
            //     selectElement.appendChild(opt);            
            // }
        }
    }
    useEffect(() => {
        changeSelector()
        message(error)
        clearError()
    }, [error, message, clearError, changeSelector])





    return(

        <>
        {/* <select
            placeholder=""
            id="regionFrom" 
            type="text" 
            name="regionFrom"
            className="autocomplete" 
            value={form.regionFrom}
            onChange={changeHandler}  
            >
                <option value="test" selected>test</option>
            {citylist.map((cit, index)=>{
                return(
                    <>
                        <option value={cit}></option>
                    </>
                )
            })}
        </select> */}

        </>
    )
    }