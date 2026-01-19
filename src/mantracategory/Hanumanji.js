import React, { useEffect, useState } from 'react'
import GetMantras from './GetMantras'

export default function Hanumanji() {
    let [mantra, setMantra] = useState([])
    async function getMantra() {
        let response = await fetch("https://dummyjson.com/c/c599-6cdc-43e8-8d1c")
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
