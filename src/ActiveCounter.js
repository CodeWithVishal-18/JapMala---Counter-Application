import React from 'react'

export default function ActiveCounter({ counter, onIncrement }) {
    let progress = (counter.current / counter.target) * 100

  return (
    <div onClick={onIncrement} className="d-flex justify-content-center " style={{ height: '80vh' }}>
      <div className="containerBox container-md p-4 text-center">
        <h3 className="my-1">{counter.title}</h3>
        <hr className="mt-2" style={{ color: 'red' }} />

        <div className="circular-wrapper" style={{marginTop:"5rem"}}>
          <div className="circular-progress" style={{ '--progress': `${progress}%` }}>
            <div className="circular-inner">
              <div className="circular-value">{counter.current}</div>
              <div className="circular-target">/ {counter.target}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
