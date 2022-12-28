import {configureStore} from '@reduxjs/toolkit';
import productReducer from './productSlice';
import userCredReducer from './userCredentialSlice';
const store = configureStore({reducer: {product: productReducer,userCreds:userCredReducer}});

export default store;
