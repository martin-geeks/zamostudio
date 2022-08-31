import { configureStore } from '@reduxjs/toolkit';
import theme from './theme';
const store = configureStore({
  reducer: {
    theme: theme,
  }
});


export {store}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;