import * as React from 'react';
import {Link} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {BsArrowBarUp, BsBookmark, BsBox, BsCart, BsHandThumbsUp, BsHeart, BsFlag, BsShop} from 'react-icons/bs';
import {BiUser} from 'react-icons/bi';
import {FiSettings} from 'react-icons/fi';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import BottomNavigation from './BottomNavigation';
import chokolo from '../assets/images/chokolo.jpg';
import anime from '../assets/images/anime.jpeg';
import action from '../assets/images/action.jpeg';
import fantasy from '../assets/images/fantasy.jpeg';
import comedy from '../assets/images/comedy.jpeg';
import thefamilyhouse from '../assets/images/house.jpeg';
import witch from '../assets/images/witch.jpg';
import {useCustomDispatch, useCustomSelector} from '../states/hook';
import {addTopMovies} from '../states/movies';
import axios from 'axios';
import '../assets/css/home.css';

import '../assets/css/header.css';
import { AiOutlineHome } from 'react-icons/ai';
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay, EffectCards, EffectFade ,Keyboard, Lazy, Mousewheel, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-fade";
import "swiper/css/pagination";


type ParentalGuide = number | string;
type Availability = 'Coming Soon'| 'Watch Now'|'Watch Trailer';

//https://api.themoviedb.org/3/genre/list?api_key=e008a3fcbf074898acac69fed235825a
//https://api.themoviedb.org/3/discover/movie?sort_by=popularity&api_key=e008a3fcbf074898acac69fed235825a
interface Purchase {
  amount: number;
}
interface Movie {
  title: string;
  category:string;
  year: number;
  parentalGuide: ParentalGuide;
  description: string;
  availability: Availability;
  purchase: Purchase;
  available: boolean;
  image: boolean;
  imageSource: string | undefined;
  gradient: string;
  id:string;
}

const description = `Tortorsodales duis viverra maiestatis legere hac nonumes urbanitas maiorum dicat cursus persequeris laoreet brute causae saepe.  Fabulasadversarium per tibique aliquid vidisse sit.`
const movie: Movie = {
  title:'Chokolo',
  category: 'Drama',
  year:2022,
  parentalGuide: 16,
  description: description,
  availability: 'Watch Trailer',
  purchase:{amount:344},
  available: true,
  image:false,
  imageSource:chokolo,
  id:'msjsjsispsndbd',
  gradient:'from-yellow-500 to-yellow-900'
}
const movie2: Movie = {
  title:'The Witch',
  category: 'Horror',
  year:2018,
  parentalGuide: 18,
  description: description,
  availability: 'Watch Trailer',
  purchase:{amount:155},
  available: true,
  image:true,
  imageSource:witch,
  id:'spsppnshsikws',
  gradient:'from-sky-500 to-blue-900'
}
const movie3: Movie = {
  title:'BOZ: Untold Story',
  category: 'Documentary',
  year:2014,
  parentalGuide: 'Family',
  description: description,
  availability: 'Watch Now',
  purchase:{amount:344},
  available: true,
  image:false,
  imageSource:undefined,
  id:'ksppaksjsbdhes',
  gradient:'from-slate-500 to-slate-900'
}
const movie4: Movie = {
  title:'The Family House',
  category: 'Thriller',
  year:2022,
  parentalGuide: 16,
  description: description,
  availability: 'Coming Soon',
  purchase:{amount:344},
  available: false,
  image:false,
  imageSource:thefamilyhouse,
  id:'ppaosnsoknd',
  gradient:'from-gray-900 to-slate-900'
}
const movies: Movie[] = [movie4,movie,movie2,movie3]

/*const PlayerButton = () => (
      <div>
          <Link  to={{pathname:'/player',hash:uuidv4(),search:'?movieId='+mov.id+'&cover='+mov.imageSource+'&title='+mov.title+'&movie_description='+mov.description}} ><button className='border-2 border-white  rounded-full my-2 h-10 w-10 text-white font-times' >
          
         <i className='fal fa-play' />
          </button></Link>:
         <button className='border-2 border-white  rounded-full my-2 h-10 w-10 text-white font-times'>
         <i className='fad fa-eye' />
          </button>
          </div>
          ) */

const LoaderComponent = () => (
  <div className='carousel' >
    {[1,2,3,4].map((i:number,index:number)=>(
        <div className='carousel-item w-[150px] h-[200px] bg-gradient-to-t from-gray-300 to-gray-100 dark:from-green-500 dark:to-green-100  mx-2 rounded animate-pulse' >
          
        </div>
    ))}
  </div>
  )
export default function Home() {
  const dispatch = useCustomDispatch();
  const topMovies = useCustomSelector((state) => state.movies.topMovies);
  const [movies_remote,setMovies] = React.useState<any>([]);
  const [movies_remote_2,setMovies2] = React.useState<any>([]);
  const [isLoading,setLoading] = React.useState(true);
  const [isLogin,setLogin] = React.useState(true);
    const backgroundHandler = (state:boolean,src:string|undefined,background:string) => {
    if(state) {
      
      
      return "h-[30rem] drop-shadow-sm bg-cover bg-center bg-no-repeat bg-gradient-to-t from-sky-500 to-sky-900 dark:from-black dark:to-slate-900"
      //return `relative `;
    }
    if(!state) return `relative bg-gradient-to-br h-[30rem] ${background}`
  }
    const [errorMessage,setErrorMessage] = React.useState<string>('Something went wrong,try again.');
    const [errorMessageState,setErrorMessageState] = React.useState<string>('hidden');
    const [open,setOpen] = React.useState<boolean>(false);
    const [clickedMovie,setClickedMovie] = React.useState<Movie>(movie);
    const controlBottomNav = (navState:boolean,item:any) => {
      setOpen(true);
      setClickedMovie(item);
    }
    const random_getter = () =>{
      let filter = ['movie/top_rated','movie/popular','/movie/latest','trending/all/day']
    }
    React.useEffect(()=>{
    axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=e008a3fcbf074898acac69fed235825a')
    .then((movies_arr:any)=>{
      //alert(JSON.stringify(movies_arr))
      if(movies_arr.data.results.length > 0){
        let results = movies_arr.data.results;
        results.forEach((movie:any,index:number)=>{
          if(movie.backdrop_path != null){
            movie.image = true;
            movie.imageSource = 'https://image.tmdb.org/t/p/original'+movie.poster_path;
          }
          if(movie.adult === true){
            movie.parentalGuide = 18;
          } else {
            movie.parentalGuide = 13;
          }
          movie.year = movie.release_date;
          movie.description = movie.overview;
          movie.available = true;
          movie.availability = 'Watch Trailer';
          movie.purchase = {amount:500}
        })
        
        let selected_arr: any[] = []
        for(let i=1; i<= 5; i++){
          selected_arr.push(results[i])
        }
        dispatch(addTopMovies(selected_arr));
        setMovies(selected_arr);
        //alert(Object.keys(selected_arr[0]))
        setLoading(false);
        
      }
      //setMovies(movies_arr);
      setErrorMessageState('hidden');
    })
    .catch((err:Error)=>{
      //alert(err.message);
      setErrorMessageState('');
      setLoading(true);
    });
        
    axios.get('https://api.themoviedb.org/3/discover/tv?api_key=e008a3fcbf074898acac69fed235825a')
    .then((movies_arr:any)=>{
      //alert(JSON.stringify(movies_arr))
      if(movies_arr.data.results.length > 0){
        let results = movies_arr.data.results;
        results.forEach((movie:any,index:number)=>{
          if(movie.backdrop_path != null){
            movie.image = true;
            movie.imageSource = 'https://image.tmdb.org/t/p/original'+movie.poster_path;
            movie.title = movie.name;
          }
          if(movie.adult === true){
            movie.parentalGuide = 18;
          } else {
            movie.parentalGuide = 13;
          }
          movie.year = movie.release_date;
          movie.description = movie.overview;
          movie.available = true;
          movie.availability = 'Watch Trailer';
          movie.purchase = {amount:500}
        })
        
        let selected_arr: any[] = []
        for(let i=1; i<5; i++){
          selected_arr.push(results[i])
        }
        //dispatch(addTopMovies(selected_arr));
        setMovies2(selected_arr);
        //alert(Object.keys(selected_arr[0]))
        setLoading(false);
        
      }
      //setMovies(movies_arr);
      setErrorMessageState('hidden');
    })
    .catch((err:Error)=>{
      //alert(err.message);
      setErrorMessageState('');
      setLoading(true);
    })
    },[]);
  
  
  return (
     <>
      <div className='flex  divide-x-4 dark:divide-slate-700'>
        <div className='hidden md:block'>
          <div className='flex-col bg-[#fff] dark:bg-slate-700  w-60 my-2 rounded-[5px] mx-5'>
            <ul className='w-full'>
              <Link to={'/'}>
                <li className='flex justify-start  w-[100%] btn btn-sm border-none normal-case hover:bg-green-400'>
                  
                </li>
              </Link>

            </ul>
            <div className='my-2'>
            <ol className='text-left dark:text-white' >
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'> <AiOutlineHome className='my-1'/><span className='mx-3'>Home</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'><BsArrowBarUp className='my-1' /><span className='mx-3'>Top movies</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text-green-400 text+left flex'><BsHandThumbsUp className='my-1' /><span className='mx-3'>Recommended movies</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'><BsBookmark className='my-1' /><span className='mx-3'>Wishlist</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'><BsHeart className='my-1' /><span className='mx-3'>Favorite</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'><BsCart className='my-1' /><span className='mx-3'>Cart</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'><BsShop  className='my-1' /><span className='mx-3'>Movies Store</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'><BsBox className='my-1' /><span className='mx-3'>Zamo Box</span></li></Link>
               
            </ol>
          </div>
          </div>
          <div className='flex-col bg-[#fff] dark:bg-slate-700  w-60 my-2 rounded-[5px] mx-5'>
            
            <div className='my-2'>
            <ol className='text-left dark:text-white' >
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'> <BiUser className='my-1'/><span className='mx-3'>My Account</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'><FiSettings className='my-1' /><span className='mx-3'>Settings</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'><AiOutlineQuestionCircle className='my-1' /><span className='mx-3'>Help and Support</span></li></Link>
               <Link  to={{pathname:'#'}} ><li className='p-2 mx-2 hover:bg-gray-100 dark:hover:bg-green-400 rounded transition-all text+left flex'><BsFlag className='my-1' /><span className='mx-3'>About</span></li></Link>
              
            </ol>
          </div>
          </div>
        </div>
        {/*Column 1*/}
        <div className='w-[70%]'>
          <div className='flex flex-col'>
            <Swiper
              direction='vertical'
              slidesPerView={1}
		          spaceBetween={0}
		          effect='fade'
		          fadeEffect={{
			          crossFade:true,
		          }}
		          loop={true}
              modules={[Navigation,Keyboard,Pagination,Autoplay,EffectFade]}
              style={{height:'500px',width:'80%',borderRadius:'10px',margin:'30px auto'}}
            >
              <SwiperSlide
                className='w-full bg-blue-500'
              >
                1
              </SwiperSlide>
              <SwiperSlide
              className='w-full bg-yellow-500'
              >
                2
              </SwiperSlide>
              <SwiperSlide 
               className='w-full bg-green-500'
              >
                3
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        {/*Column 2*/}
        <div className='w-60 hidden md:block'>
          <div className='flex flex-col'>
            
          </div>
        </div>
      </div>
     </>
    );
}