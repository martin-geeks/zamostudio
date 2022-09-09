import * as React from 'react';
import {ThemeMoonIcon,ThemeSunIcon}  from '../components/Icons';
import { useCustomSelector, useCustomDispatch } from '../states/hook';
import {Link} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';



export default function FixedSideBar() {
  const dispatch = useCustomDispatch();
  const theme = useCustomSelector((state)=> state.theme.value);
  const toggleTheme = () => {
    dispatch(theme());
  }
  const [isLogin,setLogin] = React.useState(false);
  return (
     <div className=" bg-white dark:bg-black w-60 md:h-full  hidden md:block" >
        <div className='flex py-5  bg-white text-slate-500 dark:bg-black dark:text-white justify-around' >
       <span className='py-1'>
       You are in {theme=== 'dark'? 'light':'dark'} mode
       </span>
   <button onClick={toggleTheme} className="ring ring-slate-200 text-slate-500 focus:ring bg-white hover:bg-black hover:text-white bg-white dark:bg-black dark:text-slate-500 dark:ring-slate-500   focus:outline-none focus:ring-slate-200  h-[30px] w-[30px]  mx-2 rounded-full " >
          
              {theme === 'dark'? <ThemeSunIcon /> :<ThemeMoonIcon />}
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
            <ol className='text-left text-white' >
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
            <div className="collapse collapse-arrow collapse-open text-left mt-2">
  <input type="checkbox" /> 
  <div className="collapse-title text-black dark:text-white font-medium">
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
    </div >
    );
}