import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { ProductPage } from './pages/ProductPage'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='/shop' element={<ProductPage />} />
      </Routes>
    </>
  )
}

export default App
