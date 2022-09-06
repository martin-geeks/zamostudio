import { configureStore } from '@reduxjs/toolkit';
import theme from './theme';
import movies from './movies';
const store = configureStore({
  reducer: {
    theme: theme,
    movies: movies,
  }
});


export {store}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;