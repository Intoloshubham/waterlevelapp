import {createSlice} from '@reduxjs/toolkit';

const modeSlice = createSlice({
  name: 'mode',
  //   initialState: [],
  initialState: {mode:0},
  reducers: {
    addMode(state, action) {
      const {mode} = action.payload;

      if (state.hasOwnProperty('mode')) {
        delete state.mode;
        Object.assign(state, {mode});
      } else {
        Object.assign(state, {mode});
      }
    },
  },
});

export const {addMode} = modeSlice.actions;

export default modeSlice.reducer;
