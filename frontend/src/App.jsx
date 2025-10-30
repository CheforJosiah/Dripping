import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { ProductPage } from './pages/ProductPage'
import { CartPage } from './pages/CartPage'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='/shop' element={<ProductPage />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </>
  )
}

export default App
