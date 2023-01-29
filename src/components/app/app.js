import './app.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from '../registrationForm/registrationForm';
import { useEffect } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import ProductList from '../productList/productList';


const products = [
	{id: '1', name: 'Рюкзак1', price: 1300, count: 0},
	{id: '2', name: 'Рюкзак2', price: 1300, count: 0},
	{id: '3', name: 'Рюкзак3', price: 1300, count: 0},
	{id: '4', name: 'Рюкзак4', price: 1300, count: 0},
	{id: '5', name: 'Рюкзак5', price: 1300, count: 0}
]

function App() {
  const {tg} = useTelegram();

  useEffect(() => {

  }, []);

  return (
    <div className='App'>
      
      <Router>

        <Routes>

          <Route index element={<ProductList products={products}/>}/>
          <Route path='reg' element={<RegistrationForm/>} />

        </Routes>

      </Router>

    </div>
  )
}

export default App;
