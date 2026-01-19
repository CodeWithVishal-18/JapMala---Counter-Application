import React from 'react'

export default function GetMantras(props) {
    let mantras = props.sendMantra
    console.log(mantras)
    return (
        <>
            <div className="card mantraCard">
                <div className="card-header fw-semibold fs-4">{mantras.deity}</div>
                <div className="card-body text-center">
                    <figure>
                        <h3 className='fw-semibold fs-2 mb-0' style={{color:"#FD841F"}}><span>“ </span>{mantras.mantra}<span> ”</span></h3>
                        <p className="blockquote-footer mt-2 fst-italic">{mantras.meaning}</p>
                        <span className='fs-4 mb-0' style={{borderBottom:"1px dotted brown"}}>Benefits</span>
                        <p className='mt-'>( {mantras.benefits} )</p>
                    </figure>
                </div>
            </div>
        </>
    )
}
