import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app';
import { Provider } from 'react-redux';
import { store } from './store';
import ProductsServiceContext from './components/productsContext/productsServiceContext';
import ProductsService from './services/productsService';

const producsService = new ProductsService();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ProductsServiceContext.Provider value={producsService}>
        <App />
      </ProductsServiceContext.Provider>
    </Provider>
  /* </React.StrictMode> */
);
