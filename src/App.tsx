import React,{Suspense,lazy,useState, useEffect,useRef} from 'react';
//import logo from './logo.svg';
import {v4 } from 'uuid';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useCustomSelector, useCustomDispatch } from './states/hook';
import {Routes as Switch, Route,Link} from 'react-router-dom';
import Loader from './components/Loader';
import TemporaryNavBar from './components/TemporaryNav';
import './main.css';
import { BsMoonFill, BsSearch, BsSunFill} from 'react-icons/bs';
import { MdToggleOn,MdToggleOff,MdClose} from 'react-icons/md';
const SignIn = lazy(()=> import('./components/SignIn'));
const Home = lazy(()=> import('./components/Home'));


const Player = React.lazy( ()=> import('./components/Player'));

function App() {
 
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light');

  const [isLogin,setLogin] = useState(true);
  const navBar = useRef<HTMLDivElement>(null);
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}
  useEffect(()=>{
    Aos.init({duration:1000});
    
  },[])
 const toggleTheme = () => {
  console.log(theme);
    if(theme === 'light'){
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme','dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme','light');
    }
  }
  const toggleNavbar = () => {
    if(navBar.current){
      navBar.current.classList.toggle('hidden');
    }
  }

  return (
    <div className="text-black dark:bg-slate-900 dark:text-white">
    <div className='flex justify-between'>
       <div className='flex justify-start'>
     <Link to={{pathname:'/',hash:v4()}}><h1 className="text-green-400 font-bold  w-60 ml-2 flex  ">
        <span className='text-white bg-green-400 inline-block text-[17pt] my-4 rounded w-[40px] text-center'>Z</span><span className='mt-3 text-[20pt] text-black mx-2 dark:text-[#fff]'>zamostudio.tv</span>
      </h1></Link>
     
        <form className='ml-10 hidden md:block'>
          <label className='block flex my-3'><input className='border-2 w-60 border-green-400 py-1 outline-none hover:border-green-400 dark:bg-slate-700' /><button type='button' className=' px-4 rounded-none  bg-green-400 border-none text-[#fff] hover:bg-green-500'><BsSearch className='hover:p-[1px]'/></button> </label>
        </form>
      </div>
      <div className='hidden md:flex'>
        
        <button className='btn-sm my-4 flex  text-xl '>
        <BsSunFill  className='my-3 text-sm ' />
          {theme !== 'light' ? <MdToggleOn data-aos='fade-in' className='text-4xl text-green-400 hover:text-green-500' onClick={toggleTheme} /> : <MdToggleOff data-aos='fade-out' className='text-4xl text-green-400 hover:text-green-500' onClick={toggleTheme} />}
        <BsMoonFill className='my-3 text-sm'/>
        </button>
        <Link to='/sign-in' className='btn btn-sm border-none rounded-[5px] my-4 normal-case text-green-400 mx-2'>
          Sign In
        </Link>

      </div>
      <div className='flex md:hidden'>
        
        
      <button className='btn-sm my-4 flex md:hidden text-xl'>
        <BsSunFill className='my-3 text-sm' />
          {theme !== 'light' ? <MdToggleOn data-aos='fade-in' className='text-4xl text-green-400 hover:text-green-500' onClick={toggleTheme} /> : <MdToggleOff data-aos='fade-out' className='text-4xl text-green-400 hover:text-green-500' onClick={toggleTheme} />}
        <BsMoonFill className='my-3 text-sm'/>
        </button>
        
      <button onClick={toggleNavbar} className='btn border-none my-3 md:hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
      </div>
      <div ref={navBar} data-aos='slide-right' className='fixed hidden right-0 bg-white dark:bg-slate-900 w-[70%]  border-slate-800 md:h-full md:hidden z-[20]'>
        <div className='flex justify-between'>
          <button className='btn-sm my-4 flex md:hidden text-xl'>
        <BsSunFill className='my-3 text-sm' />
          {theme !== 'light' ? <MdToggleOn data-aos='fade-in' className='text-4xl text-green-400 hover:text-green-500' onClick={toggleTheme} /> : <MdToggleOff data-aos='fade-out' className='text-4xl text-green-400 hover:text-green-500' onClick={toggleTheme} />}
        <BsMoonFill className='my-3 text-sm'/>
        </button>
          <button onClick={toggleNavbar} className='btn m-3 border-none my-3 md:hidden'>
            <MdClose className='text-4xl'/>
          </button>
        </div>
        <TemporaryNavBar />
      </div>
    </div>

    <div className='h-[100vh] w-full bg-gray-100 dark:bg-slate-800'>
    <Suspense fallback={<Loader />} >
    <Switch>
      <Route path='/ks' element={<SignIn />}/>
      <Route path='/sign-in' element={<SignIn />}/>
      <Route path='/load' element={<Loader />}/>
      <Route path='/' element={<Home />}/>
    </Switch>
    </Suspense>
   </div>
    </div>
  );
}

export default App;
