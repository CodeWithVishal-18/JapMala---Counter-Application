import React, { useEffect, useState } from 'react'
import GetMantras from './GetMantras'

export default function Mahamritunjay() {
    let [mantra, setMantra] = useState([])
    async function getMantra() {
        let response = await fetch("https://dummyjson.com/c/a810-f29e-4778-a424")
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
