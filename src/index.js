import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import ProductsServiceContext from './components/productsContext/productsServiceContext';
import ProductsService from './services/productsService';
import { PersistGate } from 'redux-persist/integration/react';

const producsService = new ProductsService();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ProductsServiceContext.Provider value={producsService}>
          <App />
        </ProductsServiceContext.Provider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);