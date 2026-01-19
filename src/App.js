import React, { useState } from 'react'
import './Home.css'
import Navbar from './Navbar'
import Home from './Home'
import Counter from './Counter'
import ActiveCounter from './ActiveCounter'
import Footer from './Footer'
import {Route, Routes } from 'react-router-dom'
import Ganeshji from './mantracategory/Ganeshji'
import Shivji from './mantracategory/Shivji'
import Vishnuji from './mantracategory/Vishnuji'
import GayatriMantra from './mantracategory/GayatriMantra'
import Mahamritunjay from './mantracategory/Mahamritunjay'
import Hanumanji from './mantracategory/Hanumanji'

export default function App() {
  let [screen, setScreen] = useState('welcome')
  let [currentCounter, setCurrentCounter] = useState(0)

  let handleCreateClick = () => {
    setScreen('create')
  }
  let handleCreateCounter = (counter) => {
    setCurrentCounter(counter);
    setScreen('counter')
  }
  let handleIncrement = () => {
    if (!currentCounter) return;
    if (currentCounter.current <= currentCounter.target) {
      let updated = { ...currentCounter, current: currentCounter.current + 1 }
      setCurrentCounter(updated)
      setTimeout(() => {
        if (updated.current === updated.target && "vibrate" in navigator) {
          navigator.vibrate(300);
          alert(`🎉 Congratulations Counter "${updated.title}" completed! You reached ${updated.target}!`)
          setCurrentCounter(null)
          setScreen('welcome')
        }
      }, 250)
    }
  }

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1" style={{ paddingTop: "6rem" }}>
          <div className='container d-flex flex-column' style={{ backgroundColor: "#FDEAE5" }}>
            <Routes>
              <Route path="/" element={
                <>
                  {screen === 'welcome' && (
                    <Home onCreateClick={handleCreateClick} />
                  )}
                  {screen === 'create' && (
                    <Counter onCreateCounter={handleCreateCounter} />
                  )}
                  {screen === 'counter' && currentCounter && (
                    <ActiveCounter counter={currentCounter} onIncrement={handleIncrement} />
                  )}
                </>
              } />
              <Route path="/ganeshji" element={<Ganeshji />} /><Route path="/shivji" element={<Shivji />} /><Route path="/vishnuji" element={<Vishnuji />} /><Route path="/gayatrimantra" element={<GayatriMantra />} /><Route path="/mahamritunjayjap" element={<Mahamritunjay />} /><Route path="/hanumanji" element={<Hanumanji />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
