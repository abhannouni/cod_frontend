import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProductHome from './pages/ProductHome';

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductHome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;