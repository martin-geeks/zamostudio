import { createSlice } from '@reduxjs/toolkit';


const movies = createSlice({
  name:'movies',
  initialState:{
    topMovies:[],
    movies: []
  },
  reducers:{
    addTopMovies: (state,action) =>{
      //@ts-ignore
      state.topMovies = action.payload;
    },
    removeTopMovies: (state,action) => {
      //state.topMovies = [];
    }
  }
});

export const {addTopMovies,removeTopMovies} = movies.actions;
export default movies.reducer;