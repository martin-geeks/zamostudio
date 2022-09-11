import * as React from 'react';
import {Link} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
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
  const [isLoading,setLoading] = React.useState(true);
    const backgroundHandler = (state:boolean,src:string|undefined,background:string) => {
    if(state) {
      
      
      return "h-[30rem] drop-shadow-sm bg-cover bg-center bg-no-repeat bg-gradient-to-t from-sky-500 to-sky-900 dark:from-black dark:to-slate-900"
      //return `relative `;
    }
    if(!state) return `relative bg-gradient-to-br h-[30rem] ${background}`
  }
    const [errorMessage,setErrorMessage] = React.useState<string>('Something went wrong,try again.');
    const [errorMessageState,setErrorMessageState] = React.useState<string>('hidden');
    React.useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/discover/movie?api_key=e008a3fcbf074898acac69fed235825a')
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
    })
    },[]);
  
  
  return (
    <React.Fragment>
      <div className='bg-white text-black dark:bg-black dark:text-white' >
            <div id='' className={`alert bg-red-400 alert-error shadow-lg sm:w-[100%] text-white ${errorMessageState}`}>
       <div>
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>{errorMessage}</span>
  </div>
</div>

        <div className='h-96 dark:text-white dark:bg-black md:w-[w-full]' >
          <div className='text-left py-2 md:text-center ' >
            <span className='font-bold text-2xl ml-4' >
            Top Movies
            </span>
            <p className='text-center font-light my-3' >
            Discover the most rated and viewed movies here
            </p>
            
            {isLoading?<LoaderComponent /> :<div className='md:grid-flow-col md:grid-cols-2 md:grid-rows-2 md:w-[90%] carousel w-full mx-auto' >
            {movies_remote.map((item:any,index:number)=> (
              <div id={`item${index}`} className='carousel-item relative bg-gray-200 h-[200px] mx-2 w-[150px] rounded-[10px] md:rounded-[0px] md:w-[80%] bg-contain md:h-[400px]' style={{background:`url(${item.imageSource})`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
              <div className='text-2xl' >
               
              
              <p className='text-[15pt]' >
                <button onClick={()=>{}} className=' block absolute animate- text-5xl mt-10 left-[35%] top-7 md:top-[40%]  md:left-[45%]  text-green-400'>
      <i className='fad fa-play-circle' />
      </button>
              </p>
              </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 hidden">
                  <a href={`#item${index -1}`} className="btn btn-circle text-white">❮</a> 
                  <a href={`#item${index + 1}`} className="btn btn-circle text-white">❯</a>
                </div>
              </div>
              ))}
            </div>}
                     <div className=' py-5 dark:bg-black md:hidden' >
             <span className='font-light text-2xl ml-4 my-5' >
            Know what you are looking for?
            </span>
               <label className='w-[90%] mx-auto flex my-2 md:hidden' >
          <i className='absolute ml-3 mt-3 fal fa-search text-gray-400' />
            <input type='text' className='  border-[1px] searchInput border-gray-200 py-2 pl-8 w-[80%] focus:border-green-300 dark:bg-black dark:border-gray-200 focus:outline-none mx-auto' placeholder='Movies,Category,Year'/>
            <button className='searchBtn px-[11px] bg-green-400 text-white hover:bg-green-300 transition-all w-[20%] ' >
            <i className='fal fa-arrow-right' />
            </button>
            </label>
          </div>
             <div id='genre' className='dark:bg-black dark md:my-5 '>
              <span className='font-light text-2xl ml-4 py-5' >
            Browse by Genres
            </span>
            <div className='grid grid-cols-2 grid-rows-2 gap-4 md:grid-rows-1 md:grid-cols-4 md:gap-2' >
              <div className='bg-gradient-to-br from-red-400 to-red-800 h-[200px] w-[180px] rounded '  style={{background:`url(${action})`,backgroundSize:'cover'}}>
              <div className='font-bold text-2xl mt-20 text-center' >
                Action
              </div>
              </div>
              <div className='bg-gradient-to-br from-sky-400 to-sky-800 h-[200px] w-[180px]  rounded ' style={{background:`url(${anime})`,backgroundSize:'cover'}}>
              <div className='font-bold text-2xl mt-20 text-center ' >
                Anime
              </div>
              </div>
              <div className='bg-gradient-to-br from-sky-400 to-sky-800 h-[200px] w-[180px] rounded ' style={{background:`url(${comedy})`,backgroundSize:'cover'}}>
              <div className='font-bold text-2xl mt-20 text-center' >
                Comedy
              </div>
              </div>
               <div className='bg-gradient-to-br from-orange-400 to-orange-800 h-[200px] w-[180px] rounded ' style={{background:`url(${fantasy})`,backgroundSize:'cover'}}>
              <div className='font-bold text-2xl mt-20 text-center' >
                Fantasy
              </div>
              </div>
            </div>
          </div>
          </div>

       
        </div>
        
      </div>
    </React.Fragment>
    );
}