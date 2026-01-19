import React, { useEffect, useState } from 'react'
import GetMantras from './GetMantras'

export default function Vishnuji() {
    let [mantra, setMantra] = useState([])
    async function getMantra() {
        let response = await fetch("https://dummyjson.com/c/0ce3-d5d4-4da4-b886")
        let data = await response.json()
        setMantra(data)
        console.log(mantra)
    }
    useEffect(() => {
        getMantra()
    })
    return (
        <>
            <GetMantras sendMantra={mantra} />
        </>
    )
}
