import React, { useState } from 'react'

export default function Counter({ onCreateCounter }) {
    let [title, setTitle] = useState('');
    let [targetNumber, setTargetNumber] = useState('');

    let handleCreate = () => {
        if (!title.trim() || !targetNumber || parseInt(targetNumber) <= 0) {
            alert('Please enter a valid title and number greater than 0');
            return
        }
        onCreateCounter({
            title: title.trim(),
            target: parseInt(targetNumber),
            current: 0
        })
        setTitle('')
        setTargetNumber('')
    }

    return (
        <div className="homeBox p-2 d-grid justify-content-center form-container mx-auto">
            <h2 className="mb-2 text-center form-title">Add New Counter</h2>
            <hr className='mt-1'/>
            <div style={{ maxWidth: "600px" }}>
                {/* <div>
                    <div className="input-group input-group-lg">
                        <span className="input-group-text" id="inputGroup-sizing-lg">Title</span>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder='e.g. Ram-Ram, push-ups,..' />
                    </div>
                </div>
                <div className="input-group input-group-lg my-3">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Target Number</span>
                    <input type="number" className="form-control" value={targetNumber} onChange={(e) => setTargetNumber(e.target.value)} placeholder="e.g., 110" min="1" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
                </div> */}
                <form className=''>
                    <div className="mb-3">
                        <label htmlFor="textInput" className="form-label">What you want to Count?</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="textInput" placeholder="e.g, Ram-Ram, Push-Ups,..." required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="numberInput" className="form-label">How many times You want to Count?</label>
                        <input type="number" value={targetNumber} onChange={(e) => setTargetNumber(e.target.value)} className="form-control" id="numberInput" placeholder="e.g, 108" min="1" max="150" required />
                    </div>
                    <button type="button" onClick={handleCreate} className="btn btn-outline-success btn-submit w-100">Add</button>
                </form>
            </div>
        </div>
    )
}
