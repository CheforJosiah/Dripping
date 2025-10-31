import { Routes, Route } from "react-router-dom";
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { ProductDetail } from './pages/ProductDetail';  
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/shop' element={<ProductPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path="/products/:id" element={<ProductDetail />} /> 
      </Routes>
    </>
  );
}

export default App;
