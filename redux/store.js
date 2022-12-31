import {configureStore} from '@reduxjs/toolkit';
import productReducer from './productSlice';
import userCredReducer from './userCredentialSlice';
import modeReducer from './modeSlice.js';
const store = configureStore({
  reducer: {
    product: productReducer,
    userCreds: userCredReducer,
    mode: modeReducer,
  },
});

export default store;
