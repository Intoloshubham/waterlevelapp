import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  //   initialState: [],
  initialState: {},
  reducers: {
    addSliceProduct(state, action) {
      const {product_id, service_used_in} = action.payload;

      if (
        state.hasOwnProperty('product_id') &&
        state.hasOwnProperty('service_used_in')
      ) {
        delete state.product_id, state.service_used_in;
        Object.assign(state, {product_id, service_used_in});
      } else {
        Object.assign(state, {product_id, service_used_in});
      }

      //   if (state.length > 0) {
      //     state.splice(0, 1);
      //     state.push({id: id, product_id: product_id});
      //   } else {
      //     state.push({id: id, product_id: product_id});
      //   }
    },

    // addLoginCredentials(state, action) {
    //   const {refresh_token, user_credentials} = action.payload;
    //   let userDetails = [];
    //   if (
    //     state.hasOwnProperty('refresh_token') &&
    //     state.hasOwnProperty('user_credentials')
    //   ) {
    //     delete state.refresh_token, state.user_credentials;
    //     Object.assign(state, {refresh_token, user_credentials});
    //   }else{
    //     Object.assign(state, {refresh_token, user_credentials});
    //   }
    // },
  },
});

export const {addSliceProduct} = productSlice.actions;

export default productSlice.reducer;
