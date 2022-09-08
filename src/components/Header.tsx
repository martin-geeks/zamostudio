import * as React from 'react';
import {toggleTheme as theme} from '../states/theme';
import {Link} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {useCustomSelector,useCustomDispatch} from '../states/hook';

import '../assets/css/header.css';

const ThemeSunIcon = () => (
  <svg className="swap-on mx-auto fill-current w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
  </svg>
  );
const ThemeMoonIcon = () => (
  <svg className="swap-off mx-auto fill-current w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>);

type HTMLElement = object|null;

export default function Header(){
  const currentTheme = useCustomSelector((state)=> state.theme.value);
  const dispatch = useCustomDispatch();
  const toggleTheme = () => {
    dispatch(theme());
  }
  const [isLogin,setLogin] = React.useState(true);
  const toggleNav = () => {
    //@ts-ignore
    const nav: HTMLElement= document.getElementById('navBar');
    //@ts-ignore
    nav.classList.toggle('ml-[-100%]')
  }
  return (
    <React.Fragment>
      <header className='t-0 w-[100%] scroll-smooth' >
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
       <div id='navBar' className='fixed z-50 t-0 bg-white text-black transition-all shadow-2xl ease-in h-[100%] w-[70%] dark:bg-black dark:text-white ml-[-100%] top-0 md:fixed md:ml-[-100%] md:w-60'>
       <div className='flex py-5  bg-white text-slate-500 dark:bg-black dark:text-slate-500 justify-around' >
       <span className='py-1'>
       You are in {currentTheme=== 'dark'? 'light':'dark'} mode
       </span>
   <button onClick={toggleTheme} className="ring ring-slate-200 text-slate-500 focus:ring bg-white hover:bg-black hover:text-white bg-white dark:bg-black dark:text-slate-500 dark:ring-slate-500   focus:outline-none focus:ring-slate-200  h-[30px] w-[30px]  mx-2 rounded-full " >
          
              {currentTheme === 'dark'? <ThemeSunIcon /> :<ThemeMoonIcon />}
          </button>
          </div>
          <div>
          <div className='text-left font-bold py-2 ml-2'>
            Looking for a movie?
          </div>
          <label className='w-[98%] mx-auto flex' >
          <i className='absolute ml-3 mt-4 fal fa-search text-gray-400' />
            <input type='text' className='  border-[1px] searchInput border-gray-200 py-2 pl-8 w-[80%] focus:border-green-300 dark:bg-black dark:border-gray-200 focus:outline-none' placeholder='Movies,Category,Year'/>
            <button className='searchBtn px-[11px] bg-green-400 text-white hover:bg-green-300 transition-all' >
            <i className='fal fa-arrow-right' />
            </button>
            </label>
          </div>
          <div className='my-2'>
            <ol className='text-left' >
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left'><i className='fal fa-arrow-up' /><span className='mx-3'>Top movies</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text-green-400 text+left'><i className='fad fa-thumbs-up' /><span className='mx-3'>Recommended movies</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left'><i className='fal fa-bookmark' /><span className='mx-3'>Wishlist</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left'><i className='fal fa-heart' /><span className='mx-3'>Favorite</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left'><i className='fal fa-shopping-cart' /><span className='mx-3'>Cart</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left'><i className='fal fa-store' /><span className='mx-3'>Movies Store</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left'><i className='fal fa-box-full' /><span className='mx-3'>Zamo Box</span></li></Link>
               {isLogin? <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left'><i className='fal fa-user' /><span className='mx-3'>My Account</span></li></Link>:
               <Link  to={{pathname:'/sign-in',hash:uuidv4()}} ><li className='my-2 p-2 ring ring-green-400 text-green-400 mx-2 hover:bg-green-100 dark:hover:bg-green-100 rounded ease-in transition-all text+left'><i className='fal fa-sign-in' /><span className='mx-3'>Login or Create Account</span></li></Link>
               }
            </ol>
          </div>
        <div className="collapse collapse-arrow text-left mt-2">
  <input type="checkbox" /> 
  <div className="collapse-title font-medium">
    Movie Category
  </div>
  <div className="collapse-content"> 
       <ol className='text-black dark:text-white list-disc' >
              <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all'>Action</li></Link>
              <Link to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all ease-in ' >Adventure</li></Link>
              <Link to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all ease-in '>Comedy</li></Link>
              <Link to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all ease-in '>Drama</li></Link>
              <Link to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all ease-in '>Fantasy</li></Link>
              <Link to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all ease-in '>Horror</li></Link>
              <Link to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all ease-in '>Thriller</li></Link>
            </ol>
  </div>
</div>
       </div>
      </header>
    </React.Fragment>
    )
}