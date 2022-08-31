import { createSlice } from '@reduxjs/toolkit';

/*function device_theme(){
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  return 'dark';
} else {
  return 'light';
}

}
*/
const theme = createSlice({
  name:'theme',
  initialState: {
    value:localStorage['theme'] || 'dark',
  },
  reducers:{
    toggleTheme: (state) => {
     if(state.value === 'dark'){
       
       state.value = 'light';
       localStorage['theme'] = state.value;
     } else {
       state.value = 'dark';
       localStorage['theme'] = state.value;
     }
    }
  }
});

export const {toggleTheme} = theme.actions;
export default theme.reducer;