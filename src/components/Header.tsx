import * as React from 'react';
import {toggleTheme as theme} from '../states/theme';
import {useCustomSelector,useCustomDispatch} from '../states/hook';
export default function Header(){
  const currentTheme = useCustomSelector((state)=> state.theme.value);
  const dispatch = useCustomDispatch();
  const toggleTheme = () => {
    dispatch(theme());
  }
  return (
    <React.Fragment>
      <header >
       <div className=' bg-white dark:bg-gray-900 py-3 flex justify-end' >
       <div className='w-full ml-20 text-center text-2xl dark:text-white font-bold' >
         zamostudio
       </div>
       
       <div className='mx-1 ' >
          <button onClick={toggleTheme} className="focus:ring bg-slate-400 hover:bg-slate-400 bg-slate-500 dark:bg-slate-400 dark:text-black text-white text-1xl focus:outline-none focus:ring-slate-200  h-10 w-10 mx-2 rounded-full " >
          
              {currentTheme === 'dark'?<i className='fad fa-moon' />:<i className='fad fa-sun' />}
          </button>
         <button className="hidden text-dark dark:text-white  p-1 focus:ring hover:bg-black-400 text-2xl focus:outline-none focus:ring-sky-200 h-10 w-10 rounded-full " >
            <i className='fal fa-bars' />
         </button>
    </div>
       </div>
       <div  >
       
       </div>
      </header>
    </React.Fragment>
    )
}