import {createSlice} from '@reduxjs/toolkit';

export const articlesSlice = createSlice({
  name: 'articlesData',
  initialState: [],
  reducers: {
    addArticlesList: (state, {payload}) => {
      return !state.length ? state.concat(payload) : [].concat(payload);
    }
  },
});

export const {addArticlesList} = articlesSlice.actions;
export default articlesSlice.reducer;