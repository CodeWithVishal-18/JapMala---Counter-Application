import React, { useEffect, useState } from 'react'
import GetMantras from './GetMantras'

export default function GayatriMantra() {
    let [mantra, setMantra] = useState([])
    async function getMantra() {
        let response = await fetch("https://dummyjson.com/c/d1f4-c09b-4761-90d8")
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
