import {createSlice} from '@reduxjs/toolkit';

const userCredSlice = createSlice({
  name: 'userCreds',
  //   initialState: [],
  initialState: {},
  reducers: { 

    addLoginCredentials(state, action) {
      const {refresh_token, user_credentials} = action.payload;
    //   let userDetails = [];
      if (
        state.hasOwnProperty('refresh_token') &&
        state.hasOwnProperty('user_credentials')
      ) {
        delete state.refresh_token, state.user_credentials;
        Object.assign(state, {refresh_token, user_credentials});
      }else{
        Object.assign(state, {refresh_token, user_credentials});
      }
    },
  },
});

export const {addLoginCredentials} = userCredSlice.actions;

export default userCredSlice.reducer;
