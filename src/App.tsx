import React from 'react';
//import logo from './logo.svg';
import {Header,SignIn} from './components'
import './App.css';
import { useCustomSelector } from './states/hook';
//import './dist/output.css';
import './assets/fontawesome-pro-5.15.1-web/css/all.css';
import './main.css';
function App() {
  const theme = useCustomSelector((state)=> state.theme.value);
  React.useEffect(()=>{
    if(theme === 'light'){
      //alert(theme)
      document.documentElement.classList.add('dark');
    } else {
      //alert(' 2 '+theme)
      document.documentElement.classList.remove('dark');
    }
    
  },[theme]);
  

  return (
    <div className="App">
    <Header />
    <SignIn />
    </div>
  );
}

export default App;
