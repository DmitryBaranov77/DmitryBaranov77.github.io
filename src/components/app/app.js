import './app.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from '../registrationForm/registrationForm';
import { useEffect } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import ProductList from '../productList/productList';
import CartList from '../cartList/cartList';
import AboutProduct from '../aboutProduct/aboutProduct';

function App() {
  const {tg} = useTelegram();

  return (
    <div className='App'>
      
      <Router>

        <Routes>

          <Route index element={<ProductList/>}/>
          <Route path='reg' element={<RegistrationForm/>} />
          <Route path='cart' element={<CartList/>}/>
          <Route path='about' element={<AboutProduct />} />

        </Routes>

      </Router>

    </div>
  )
}

export default App;
