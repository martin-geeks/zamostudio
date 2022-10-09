import React,{Suspense} from 'react';
//import logo from './logo.svg';
import {Header,SignIn, TemporaryNav,Footer} from './components';
import { useCustomSelector, useCustomDispatch } from './states/hook';
import {Routes as Switch, Route} from 'react-router-dom';
import './assets/fontawesome-pro-5.15.1-web/css/all.css';
import './main.css';
const Home = React.lazy( ()=> import('./components/Home'));
const FixedSideBar = React.lazy( ()=> import('./components/FixedSideBar'));
const Player = React.lazy( ()=> import('./components/Player'));

const Loader =() => (
  <div>
  <div className="animate-spin text-[2rem] text-black dark:text-white fixed top-[40%] left-[50%] border-2 h-10 w-10 rounded-full"><i className='fal fa-spinner-third' /></div>
  </div>
  )
function App() {
  const dispatch = useCustomDispatch();
  const theme = useCustomSelector((state)=> state.theme.value);
  const toggleTheme = () => {
    dispatch(theme());
  }
  const [isLogin,setLogin] = React.useState(true);
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
    <div className="bg-white text-black dark:bg-black dark:text-white">
    <Header />
    <div className=" md:grid md:grid-cols-4 md:gap-[none] w-[100%] " >
   <FixedSideBar />
    <div className='md:col-span-3 h-[30vh] scroll-smooth  ' >
    <Suspense fallback={<Loader />} >
    <Switch>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<SignIn/>} />
      <Route path='/player' element={<Player />} />
    </Switch>
    </Suspense>
    </div>
    <div>
     
    </div>
    </div>
    <Footer/>
    </div>
  );
}

export default App;
