import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './routes/HomePage'
import Settings from './routes/Settings'
import AddCard from './routes/AddCard'
import Card from './routes/Card'
import { CardContainer } from './features/CardContainer'
import './App.css'

function App() {


  return (
    <>
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
