import './app.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from '../registrationForm/registrationForm';
import { useEffect } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import ProductList from '../productList/productList';


const products = [
	{id: '1', title: 'Рюкзак1', price: 1300, src:'https://roof-rack.ru/upload/medialibrary/9dd/%D1%80%D1%8E%D0%BA%D0%B7%D0%B0%D0%BA%208.jpg'},
	{id: '2', title: 'Рюкзак2', price: 1300, src:'https://roof-rack.ru/upload/medialibrary/9dd/%D1%80%D1%8E%D0%BA%D0%B7%D0%B0%D0%BA%208.jpg'},
	{id: '3', title: 'Рюкзак3', price: 1300, src:'https://roof-rack.ru/upload/medialibrary/9dd/%D1%80%D1%8E%D0%BA%D0%B7%D0%B0%D0%BA%208.jpg'},
	{id: '4', title: 'Рюкзак4', price: 1300, src:'https://roof-rack.ru/upload/medialibrary/9dd/%D1%80%D1%8E%D0%BA%D0%B7%D0%B0%D0%BA%208.jpg'},
	{id: '5', title: 'Рюкзак5', price: 1300, src:'https://roof-rack.ru/upload/medialibrary/9dd/%D1%80%D1%8E%D0%BA%D0%B7%D0%B0%D0%BA%208.jpg'}
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
