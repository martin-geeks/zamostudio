import React from 'react';
import '../App.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { RiLoader4Fill,RiLoader2Line} from 'react-icons/ri';
export default function Loader() {
	Aos.init({ duration: 500 });

	return (
		   <div className=' h-[100%] absolute top-0 w-full bg-white dark:bg-slate-900 md:flex md:justify-center md:divid-x-2 md:divide-slate-800'>
			<div  className=' h-40 mx-auto mt-[50%] md:mt-[20%] text-center w-[70%] md:w-[40%] '>
				<h1  className="text-green-400 font-bold   flex text-center ">
        			<span className='text-white bg-green-400 inline-block text-[2em] md:text-[4em] my-4 rounded w-[60px] md:w-[80px] text-center bg-gradient-to-t  dark:from-green-500 dark:to-green-400  mx-2 rounded animate-pulse' data-aos='slide-up'>Z</span><span data-aos='slide-down' className='mt-5 text-[2em] md:text-[4em] text-black mx-2 dark:text-[#fff]'>zamostudio.tv</span>
      			</h1>
			</div>
       		<div className='text-center md:mt-[20%] md:w-[40%]' data-aos='slide-up'>
       			<div className='mt-10'><RiLoader2Line className='fad fa-spinner-third animate-spin text-4xl md:text-3xl text-green-400 mx-auto'/></div>
       			<p className='text-gray-400 my-2 text-[8pt]'>Processing data. Please wait</p>
       			
       		</div>
       		<div className='absolute w-full bottom-5 flex justify-center'><button className='btn btn-sm underline text-[8pt] normal-case border-none text-gray-400 font-light'>Taking long? Report</button></div>
       </div>
	)
}
