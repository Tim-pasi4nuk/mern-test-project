import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
export const LiqPayPage = () => {
  const {loading, request} = useHttp() 
  const  [form, setForm] = useState({
    cityFrom:'', cityTo:'', typeList:'vehile', regionFrom:'Украина', regionTo:'Украина'
})
  const addHandler = async () => {
    try {
        console.log({...form})
            const list = await request('/api/search', 'POST', {...form}, {
        })
    }
     catch (e){}
}


  return (
    <div >
      <a class="waves-effect waves-light btn">Оплатить</a>
    </div>
  )
}