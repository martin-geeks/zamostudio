import * as React from 'react';
import {Link} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {Swiper,SwiperSlide} from 'swiper/react';
import chokolo from '../assets/images/chokolo.jpg';
import thefamilyhouse from '../assets/images/house.jpeg';
import witch from '../assets/images/witch.jpg';
import axios from 'axios';
import '../assets/css/home.css';
import {Grid as MyGrid,Keyboard,Lazy,Pagination,Navigation,EffectCreative} from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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


export default function Home() {
  const [movies_remote,setMovies] = React.useState<any>(movies);
    const backgroundHandler = (state:boolean,src:string|undefined,background:string) => {
    if(state) {
      
      
      return "h-[30rem] drop-shadow-sm bg-cover bg-center bg-no-repeat bg-gradient-to-t from-sky-500 to-sky-900 dark:from-black dark:to-slate-900"
      //return `relative `;
    }
    if(!state) return `relative bg-gradient-to-br h-[30rem] ${background}`
  }
  
  
    axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity&api_key=e008a3fcbf074898acac69fed235825a')
    .then((movies_arr:any)=>{
      //alert(JSON.stringify(movies_arr))
      if(movies_arr.data.results.length > 0){
        let results = movies_arr.data.results;
        results.forEach((movie:any,index:number)=>{
          if(movie.backdrop_path != null){
            movie.image = true;
            movie.imageSource = 'https://image.tmdb.org/t/p'+movie.poster_path;
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
        //alert(JSON.stringify(results[0]));
        let selected_arr: any[] = []
        for(let i=1; i<= 5; i++){
          selected_arr.push(results[i])
        }
        setMovies(selected_arr);
      }
      //setMovies(movies_arr);
    })
    .catch((err:Error)=>{
      //alert(err.message);
    })
  
  return (
    <React.Fragment>
      <div>
        <Swiper
        modules={[Lazy,Navigation,Pagination,EffectCreative]}
        lazy={true}
        
        grabCursor={true}
          keyboard={{
            enabled:true,
          }}
          grid={{
            rows:2,
           
          }}
        onReachEnd={()=> {} }
        navigation={true} 
        effect={'fade'}
        pagination={{ clickable: true }}
        >
        {movies_remote.map((mov:any,index:number) => (
        
          <SwiperSlide
           >
          <div className={ "h-[30rem] drop-shadow-sm bg-cover bg-center bg-no-repeat bg-gradient-to-t from-sky-500 to-sky-900 dark:from-black dark:to-slate-900"}>
          <div>
          <div className='py-[1rem]'>
          </div>
          <div className='ml-5 py-5 text-left text-4xl font-bold text-white' >
          {mov.title}
          </div>
          <div className='ml-5 my- flex justify-start' >
            <button className='border-x-2 mx-1 border-black-100 p-1 text-white border-left-none font-bold' >
             {mov.category}
            </button>
            
            <button  className='border-x-2 mx-1 p-1 border-left-none text-white font-bold' >
            {mov.year}
            </button>
            <button className='border-2 mx-1 p-1 text-white font-bold' >
            PG {mov.parentalGuide}
            </button>
          </div>
          <p className='text-left p-5 text-white font-light' >
            {mov.description}
          </p>
          <div className='my-1 flex' >
          <div className=' p-2  my-2 h-10  text-white font-times'>
          {mov.availability}
          </div>
          { mov.available? 
          <Link  to={{pathname:'/player',hash:uuidv4()}} ><button className='border-2 border-white  rounded-full my-2 h-10 w-10 text-white font-times' >
          
         <i className='fal fa-play' />
          </button></Link>:
         <button className='border-2 border-white  rounded-full my-2 h-10 w-10 text-white font-times'>
         <i className='fad fa-eye' />
          </button>
          }
          </div>
          </div>
          
          </div>
          </SwiperSlide>
        ))}
        </Swiper>
        
        <div className='h-96 dark:text-white dark:bg-black md:w-[500px] md:h-[200px]' >
          <div className='text-left py-2 md:text-center ' >
            <span className='font-bold text-2xl' >
            Featured
            </span>
            <p className='text-center font-light' >
            These won't disappoint
            </p>
            
            <div className='grid grid-flow-col grid-cols-2 grid-rows-2 md:w-[500px]' >
            
            
            </div>
           
          </div>
        </div>
      </div>
    </React.Fragment>
    );
}