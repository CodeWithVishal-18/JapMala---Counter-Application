import React, { useEffect, useState } from 'react'
import GetMantras from './GetMantras'

export default function Shivji() {
    let [mantra, setMantra] = useState([])
    async function getMantra() {
        let response = await fetch("https://dummyjson.com/c/5e12-20f8-4af5-a9fe")
        let data = await response.json()
        setMantra(data)
        console.log(mantra)
    }
    useEffect(() => {
        getMantra()
    },[])
    return (
        <>
            <GetMantras sendMantra={mantra} />
        </>
    )
}
