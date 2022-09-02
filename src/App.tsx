import React from 'react';
//import logo from './logo.svg';
import {Header,SignIn,Home} from './components'
import './App.css';
import { useCustomSelector } from './states/hook';
import { Routes as Switch, Route} from 'react-router-dom';
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
    <Switch>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<SignIn/>} />
    </Switch>
    </div>
  );
}

export default App;
