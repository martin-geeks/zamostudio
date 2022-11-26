import * as React from 'react';
import {ThemeMoonIcon,ThemeSunIcon}  from '../components/Icons';
import {toggleTheme as themeHandler} from '../states/theme';
import { useCustomSelector, useCustomDispatch } from '../states/hook';
import {Link} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import '../assets/css/header.css';
import {BsArrowBarUp, BsBookmark, BsBox, BsCart, BsHandThumbsUp, BsHeart, BsSearch, BsShop} from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';


export default function FixedSideBar() {
  const dispatch = useCustomDispatch();
  const theme = useCustomSelector((state)=> state.theme.value);
  const toggleTheme = () => {
    dispatch(themeHandler());
  }
  const [isLogin,setLogin] = React.useState(false);
  return (
     <>
        <div className='flex bg-white text-slate-500 dark:bg-slate-900 dark:text-white justify-around' >
       
          </div>
           <div>
          <div className='text-left py-2 text-left ml-5'>
             <BsSearch className='inline-block text-x'/> Search
          </div>
          
          </div>
             <div className='my-2'>
            <ol className='text-left dark:text-white' >
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'><BsArrowBarUp className='my-1' /><span className='mx-3'>Top movies</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text-green-400 text+left flex'><BsHandThumbsUp className='my-1' /><span className='mx-3'>Recommended movies</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'><BsBookmark className='my-1' /><span className='mx-3'>Wishlist</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'><BsHeart className='my-1' /><span className='mx-3'>Favorite</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'><BsCart className='my-1' /><span className='mx-3'>Cart</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'><BsShop  className='my-1' /><span className='mx-3'>Movies Store</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'><BsBox className='my-1' /><span className='mx-3'>Zamo Box</span></li></Link>
               {isLogin? <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'><MdAccountCircle className='fal fa-user' /><span className='mx-3'>My Account</span></li></Link>:
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
    </>
    );
}