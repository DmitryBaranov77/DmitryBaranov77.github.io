import './app.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from '../registrationForm/registrationForm';
import { useEffect } from 'react';
import { useTelegram } from '../../hooks/useTelegram';

function App() {
  const {tg} = useTelegram();

  useEffect(() => {

  }, []);

  return (
    <div className='App'>
      
      <Router>

        <Routes>

          <Route index element={''}/>
          <Route path='reg' element={<RegistrationForm/>} />

        </Routes>

      </Router>

    </div>
  )
}

export default App;
