import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import userSliceReducer from './redux/userSlice'
import productSliceReducer from './redux/productSlice'
import cartSliceReducer from './redux/cartSlice'
const store = configureStore({
  reducer:{

    user:userSliceReducer,
    product:productSliceReducer,
    cart:cartSliceReducer
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
