import {createSlice} from '@reduxjs/toolkit';
const intervalModeSlice = createSlice({
  name: 'intervalMode',
  initialState: {intervalMode: false},
  reducers: {
    addIntervalMode(state, action) {
      const {intervalMode} = action.payload;
      if (state.hasOwnProperty('intervalMode')) {
        delete state.intervalMode;
        Object.assign(state, {intervalMode});
      } else {
        Object.assign(state, {intervalMode});
      }
    },
  },
});

export const {addIntervalMode}=intervalModeSlice.actions;
export default intervalModeSlice.reducer;