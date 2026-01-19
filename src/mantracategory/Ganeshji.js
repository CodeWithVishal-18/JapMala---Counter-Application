import React, { useEffect, useState } from 'react'
import GetMantras from './GetMantras'

export default function Ganeshji() {
    let [mantra, setMantra]=useState([])
    async function getMantra(){
        let response=await fetch("https://dummyjson.com/c/9c7e-4d28-4e88-a3b6")
        let data=await response.json()
        setMantra(data)
    }
    useEffect(()=>{
        getMantra()
    },[])
  return (
    <>
    <GetMantras sendMantra={mantra}/>
    </>
  )
}
