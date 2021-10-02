import React, { useEffect, useState } from 'react'

export const CityFindOptions = ({searched}) => {
  const [count, setCount] = useState(0)
  const [city, setcity] = useState([,,,,,,,,,,,,,,,,,,,,,,,,,,,,,])
  const [pre, setPre] = useState([searched])
    let cityOption = require('./data.json')
    var jsonQuery = require('json-query')
    if(pre != searched){
        console.log('pre',pre,'findcity', searched)
    const res = jsonQuery(`regions[**][name=${searched}].cities.name`,{data:cityOption, parents:searched})
    console.log('res',res.value)
    setcity(res.value) 
    console.log('city',city)
    setPre(searched)
    console.log('pre',pre.value,'searched',searched)
    
    }
  useEffect(() => {
}, [])
    return (
        <>
    {city.map(city => {
        return <option key={city} value={city}>{city}</option>})}
        </>
    )
}