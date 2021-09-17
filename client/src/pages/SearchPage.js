import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AdList } from '../components/AdList'
import { Loader } from '../components/Loader'
import { useHttp } from '../hooks/http.hook'
import { SelectOptionCity } from '../components/SelectOptionCity'
export const SearchPage = () => {
    const [ads, setAds] = useState([])
    const {loading, request} = useHttp()    
    const [search, setSearch] = useState(false)
    let cityOption = require('./data.json')
    var jsonQuery = require('json-query')
    const  [form, setForm] = useState({
         cityFrom:'', cityTo:'', typeList:'vehile', regionFrom:'Украина', regionTo:'Украина'
    })
    
    useEffect(()=>{
        var elems = document.querySelectorAll('select');
        var instances = window.M.FormSelect.init(elems,'');
        window.M.updateTextFields()
        
    },[])

    const changeHandler = even => {
        setForm ({...form, [even.target.name]: even.target.value})
        
        
    }

    const findCity = (city) => {
        
        console.log('findcity', city)
        const res = jsonQuery(`regions[**][name=${city}].cities.name`,{data:cityOption, parents:city})
        console.log('res:',res.value)
        return res.value
    }
    
    const changeSelector = () => {
        console.log('regionFrom', form.regionFrom,'regionTo', form.regionTo)
        if(!(form.regionFrom==='Украина')){
            
            const citys = findCity(form.regionFrom)
            var selectElement = document.getElementById('cityFrom');
            var opt = document.createElement('option');
            for (var city in citys) {
                opt.value = city;
                opt.innerHTML = city;
                selectElement.appendChild(opt);            
            }
        }
        if(!(form.regionTo==='Украина')){
            const citys = findCity(form.regionTo)
            var selectElement = document.getElementById('cityTo')
            
            for (var city in citys) {
                var opt = document.createElement('option');
                opt.value = city;
                opt.innerHTML = city;
                selectElement.appendChild(opt);            
            }
        }

    }

    function changeCheck() {
        console.log('click', document.getElementById('checkCityFrom').checked)
        if( document.getElementById('checkCityFrom').checked){
            const elm = document.getElementById('cityFrom')
            console.log(elm)
            elm.disabled=false
            console.log(elm)
        }
        if( document.getElementById('checkCityTo').checked){
            const elm = document.getElementById('cityTo')
            console.log(elm)
            elm.removeAttribute("disabled")
            console.log(elm)
        }

    }

    const addHandler = async () => {
        try {
            console.log({...form})
                const list = await request('/api/search', 'POST', {...form}, {
            })
            setAds(list.reverse())
            setSearch(true)
        }
         catch (e){}
    }

    if(loading){
        <Loader />
    }

    return(
        <form>
            <div className="row">
                <h1>Поиск</h1>
                    <div className="card #ffebee red lighten-5">
                        <div className="card-content">
                             <div className="row">
                            <div className="row" >
                        <div className="input-field col s12 m5">
                        <select
                            className="regionFrom"
                            id="regionFrom" 
                            type="text" 
                            name="regionFrom"
                            value={form.regionFrom}
                            onChange={changeHandler} 
                            >
                                <SelectOptionCity></SelectOptionCity>
                            </select>
                            <label htmlFor="regionFrom" className="black-text bolt">ОТКУДА</label>
                        </div>
                        
                        <div className="input-field col s12 m5">
                        <select
                            className="regionTo"
                            id="regionTo" 
                            type="text" 
                            name="regionTo"
                            value={form.regionTo}
                            onChange={changeHandler} 
                            >
                                <SelectOptionCity></SelectOptionCity>
                            </select>
                            <label htmlFor="regionTo" className="black-text bolt">КУДА</label>
                        </div>
                        <div className="input-field col s12 m2">
                            <select 
                            className="" 
                            id="typeList" 
                            name="typeList" 
                            onChange={changeHandler}>
                                <option value="vehile" selected>Транспорт</option>
                                <option value="cargo">Груз</option>
                            </select>
                            <label  htmlFor="typeList" className="black-text bolt"></label>
                        </div>
                            
                        </div> 
                    </div> 
                <div className="row s12 center">
                    <a
                    className="s12 waves-effect waves-light btn white-text #c62828 red darken-1"
                    onClick={addHandler}
                    >
                    Искать</a>
                </div> 
                </div>
            </div>
                {!loading && search && <AdList ad={ads}/>}
           
        </div>
        </form>

    )
}