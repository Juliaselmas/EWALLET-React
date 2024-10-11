import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './routes/HomePage'
import Settings from './routes/Settings'
import AddCard from './routes/AddCard'
import Card from './routes/Card'
import './App.css'

function App() {


  return (
    <>
      <h1>E-wallet</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addcard" element={<AddCard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/card" element={<Card />} />
      </Routes>
    </>
  )
}

export default App
