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
      <header className='t-0 w-[100%]' >
       <div className='relative z-40 w-[100%] header border-y- border-black-600 dark:border-grey-200 dark:bg-black py-2 flex justify-between' >
       <div className='ml-5 text-left md:text-left text-2xl py-2 dark:text-white font-bold' >
        <i className='fas fa-popcorn text-green-500' />
        <i className='fas ' /> ZamoStudio
       </div>
       
       <div className='mx-1 ' >
       
          <button className='text-black dark:text-white' >
          <i className='fal fa-search' />
          </button>
         <button onClick={toggleNav}  className="text-dark dark:text-white  p-1 focus:ring hover:bg-black-400 text-2xl focus:outline-none focus:ring-sky-200 h-10 w-10 rounded-full " >
            <i className='fal fa-bars' />
         </button>
    </div>
       </div>
       <div  >
       
       </div>
       <div id='navBar' className='fixed z-50 t-0 bg-white text-black transition-all shadow-2xl ease-in h-[100%] w-[70%] dark:bg-black dark:text-white ml-[-100%] top-0 '>
       <div>
       <span className=' py-5 text-black dark:text-white'>
       Theme {currentTheme}
       </span>
   <button onClick={toggleTheme} className="focus:ring bg-slate-400 hover:bg-slate-400 bg-slate-500 dark:bg-slate-400 dark:text-black text-white  focus:outline-none focus:ring-slate-200  h-10 w-10 mx-2 rounded-full " >
          
              {currentTheme === 'dark'?<i className='fad fa-moon' />:<i className='fad fa-sun-dust' />}
          </button>
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