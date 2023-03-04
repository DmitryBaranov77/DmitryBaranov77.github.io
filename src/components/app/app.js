import './app.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTelegram } from '../../hooks/useTelegram';
import ProductList from '../productList/productList';
import CartList from '../cartList/cartList';
import AboutProduct from '../aboutProduct/aboutProduct';
import Delivery from '../delivery/delivery';
import ModalSize from '../modalSize';

function App() {
  const {tg} = useTelegram();
  localStorage.clear();

  return (
    <div className='App'>
      <ModalSize/>
      <Router>

        <Routes>

          <Route index element={<ProductList/>}/>
          <Route path='delivery' element={<Delivery/>}/>
          <Route path='cart' element={<CartList/>}/>
          <Route path='about' element={<AboutProduct />} />

        </Routes>

      </Router>

    </div>
  )
}

export default App;
