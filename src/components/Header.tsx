import * as React from 'react';
import {toggleTheme as theme} from '../states/theme';
import {Link} from 'react-router-dom';
import {useCustomSelector,useCustomDispatch} from '../states/hook';

import '../assets/css/header.css';


type HTMLElement = object|null;

export default function Header(){
  const currentTheme = useCustomSelector((state)=> state.theme.value);
  const dispatch = useCustomDispatch();
  const toggleTheme = () => {
    dispatch(theme());
  }
  const toggleNav = () => {
    //@ts-ignore
    const nav: HTMLElement= document.getElementById('navBar');
    //@ts-ignore
    nav.classList.toggle('ml-[-100%]')
  }
  return (
    <React.Fragment>
      <header className='t-0 w-[100%] ' >
       <div className='relative z-40 w-[100%] header border-y- border-black-600 dark:border-grey-200 dark:bg-black py-2 flex justify-between' >
       <div className='ml-5 text-left md:text-left text-2xl py-2 dark:text-white font-bold' >
        <i className='fas fa-popcorn text-green-500' />
        <i className='fas ' /> <Link to={{pathname:'/'}}>ZamoStudio</Link>
       </div>
       
       <div className='mx-1 ' >
       
          <button className='mr-2 text-black dark:text-white' >
          <i className='fas fa-search' />
          </button>
         <button onClick={toggleNav}  className="text-dark dark:text-white  p-1 focus:ring hover:bg-black-400 text-2xl focus:outline-none focus:ring-sky-200 h-10 w-10 rounded-full " >
            <i className='fal fa-bars' />
         </button>
    </div>
       </div>
       <div  >
       
       </div>
       <div id='navBar' className='fixed z-50 t-0 bg-white text-black transition-all shadow-2xl ease-in h-[100%] w-[70%] dark:bg-gray-900 dark:text-white ml-[-100%] top-0 md:fixed md:ml-[-100%] md:w-60  '>
       <div className='flex py-5 dark:bg-gray-900 bg-gray-100' >
       <span className='py-1 text-black dark:text-white dark:bg-gray-900'>
       Theme {currentTheme}
       </span>
   <button onClick={toggleTheme} className="focus:ring bg-slate-400 hover:bg-slate-400 bg-slate-900 dark:bg-slate-400 dark:text-black text-white  focus:outline-none focus:ring-slate-200  h-10 w-10 mx-2 rounded-full " >
          
              {currentTheme === 'dark'?<i className='fad fa-moon' />:<i className='fad fa-sun-dust' />}
          </button>
          </div>
          <div>
          <div className='text-left font-bold py-2 ml-2'>
            Looking for a movie?
          </div>
          <i className='absolute ml-3 mt-4 fal fa-search text-gray-400' />
            <input type='text' className='border-2 border-gray-200 rounded py-2 pl-8 focus:border-green-300 dark:bg-gray-900 dark:border-gray-200 focus:outline-none' placeholder='Movies,Category,Year'/>
          </div>
          <div className='text-left mx-auto w-[90%] border-grey-500 border-2 p-1 rounded my-2 '>
            <h6 className='text-bold flex justify-between bg-gray-100 p-1 rounded' ><span>Category</span> <i className='mt-1 fal fa-chevron-down' /></h6>
            <ol className='hidden' >
              <Link to={{pathname:'#'}} ><li>Action</li></Link>
              <Link to={{pathname:'#'}} ><li>Drama</li></Link>
            </ol>
          </div>
       </div>
      </header>
    </React.Fragment>
    )
}