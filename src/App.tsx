import React from 'react';
//import logo from './logo.svg';
import {Header,SignIn,Home,Player} from './components'
import './App.css';
import { useCustomSelector } from './states/hook';
import {Link, Routes as Switch, Route} from 'react-router-dom';
//import './dist/output.css';
import './assets/fontawesome-pro-5.15.1-web/css/all.css';
import './main.css';

const menuItems = [
  {
    name:'Action',
    url:'/movies'
  },
  {
    name:'Drama',
    url: '/drama'
  },
  {
    name:'Comedy',
    url:'/comedy',
  },
  {
    name:'Fantasy',
    url:'/fantasy'
  },
  {
    name:'Horror',
    url:'/horror'
  }
  ]

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
    <div className=" md:grid md:grid-cols-4 md:gap-[0%] " >
    <div className=" bg-white dark:bg-slate-900 w-60 h-screen  hidden md:block" >
    <div className='text-left font-bold py-2 ml-2 dark:text-gray-400'>
            Looking for a movie?
          </div>
          <div className='w-[100%] py-5'>
          <i className='absolute ml-3 mt-3 fal fa-search text-gray-400 ' />
            <input type='text' className='border-2 w-[90%] rounded-[5px]  border-gray-200 rounded py-2 md:py-1 pl-8 focus:border-green-300 dark:bg-gray-900 dark:border-gray-200 focus:outline-none dark:text-white' placeholder='Movies,Category,Year'/>
          </div>
          <ul className='list'>
          <li className='text-left ml-2' >
            Category
          </li>
          <ol className=' border-2 border-gray-100 m-3 p-1 rounded-[5px] text-white' >
              {
              menuItems.map((menuItem,index:number)=>(
              <Link className='text-left py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white ' to={{pathname:menuItem.url}}><li className='text-left py-2 px-2 hover:bg-gray-300 dark:text-white active:bg-gray-300 focus:bg-gray-300ml-4 rounded-[5px]'>{menuItem.name}</li></Link>
              ))
              }
              </ol>
          </ul>
    </div >
    <div className='md:col-span-3' >
    <Switch>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<SignIn/>} />
      <Route path='/player' element={<Player />} />
    </Switch>
    </div>
    </div>
    </div>
  );
}

export default App;
