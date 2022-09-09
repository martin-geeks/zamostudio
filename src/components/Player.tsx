import * as React from 'react';
import {useParams,Link} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import ReactPlayer from 'react-player/lazy';
import {Swiper,SwiperSlide} from 'swiper/react';
import {Grid as MyGrid,Keyboard,Lazy,Pagination,Navigation,EffectCreative} from 'swiper';
import chokolo from '../assets/images/chokolo.jpg';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


type ParentalGuide = number | string;
type Availability = 'Coming Soon'| 'Watch Now'|'Watch Trailer';
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
interface MovieResponse {
  id:number;
  results: Movie[];
}
interface PlayerTimeData {
  loaded:number;
  played: number;
  playedSeconds:number;
  loadedSeconds:number;
}
interface TimeData {
  seconds: string;
  minutes:string;
}
const API_KEY = 'e008a3fcbf074898acac69fed235825a';
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

export default function Player(){
  const myMovie = useParams();
  const [currentVideo,setVideo] = React.useState<any>({});
  const [related_movies_remote,setRelatedMovies] = React.useState<any>([]);
  const [time,setTime] = React.useState<TimeData>({seconds:'00',minutes:'00'});
  const [currentTime,setCurrentTime] = React.useState<TimeData>({seconds:'00',minutes:'00'});
  const [messageText,setMessageText] = React.useState<string>('');
  const [messageState,setMessage] = React.useState<boolean>(false);
  const [errorMessage,setErrorMessage] = React.useState<string>('Something went wrong,try again.');
  const [errorMessageState,setErrorMessageState] = React.useState<string>('hidden');
  const [loading,setLoading] = React.useState<boolean>(true);
  const [muted,setMute] = React.useState<boolean>(true);
  const [seek,setSeek] = React.useState<string>('w-[30%]');
  var count = 0;
  setTimeout(function(){
    let s = count + 20;
    setSeek(`w-[80%]`);
  },300);
  const urlParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlParams.entries());
  const reactPlayer = React.useRef<any>(null);
  
  const playVideo = () => {
    
    if(params.movieId !== null){
      axios.get<MovieResponse>('https://api.themoviedb.org/3/movie/'+params.movieId+'/videos?api_key=e008a3fcbf074898acac69fed235825a')
      .then(data => {
        if(data.data.results.length > 0) {
        setVideo(data.data.results[0]);
        setLoading(false);
        } else {
          setMessageText('The video was not found');
          setMessage(true);
        }
      })
      .catch(err => {
        setErrorMessageState('');
      })
    }
    setErrorMessageState('hidden')
  }
  const showPreview = () => {
    reactPlayer.current.showPreview();
  }
  React.useEffect(()=>{
    
    if(params.movieId !== null){
      axios.get<MovieResponse>('https://api.themoviedb.org/3/movie/'+params.movieId+'/videos?api_key=e008a3fcbf074898acac69fed235825a')
      .then(data => {
        if(data.data.results.length > 0) {
        setVideo(data.data.results[0]);
        setLoading(false);
        } else {
          setMessageText('The video was not found');
          setMessage(true);
          setErrorMessageState('hidden');
        }
      })
      .catch(err => {
        setErrorMessageState('');
      })
    }
    
    fetchRelatedMovies();
  },[]);
  setTimeout(function (){
    fetchRelatedMovies();
  },0);
  const fetchRelatedMovies = () => {
    axios.get(`https://api.themoviedb.org/3/movie/${params.movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`)
    .then((related_movies:any)=>{
      //alert(JSON.stringify(related_movies.data.results));
      let results = related_movies.data.results;
      
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
      let related_movies_:any[] = []
      
      for(let i=0; i<10; i++){
        related_movies_.push(results[i]);
      }
      setRelatedMovies(related_movies_);
      setErrorMessageState('hidden')
    })
    .catch((err:Error) => {
      setErrorMessageState('');
    });
  }
  const videoProgress = function(duration: number){
    //let myTime = reactPlayer.current.getCurrrent();
      
    if(duration < 10){
      setCurrentTime({seconds:`0${Math.floor(duration)}`,minutes:'00'});
    } else {
      var mins :any = Math.round(duration / 60);
      var secs:any = Math.round(duration % 60);
      if(mins < 10){
        mins = `0${Math.round(mins)}`
      }
      if(secs < 10){
        secs = `0${Math.round(secs)}`;
      }
      setCurrentTime({seconds:`${Math.round(secs)}`,minutes:`${Math.round(mins)}`});
    }
  }
  const videoDuration = (duration:number) =>{
    if(duration < 10){
      setTime({seconds:`0${duration}`,minutes:'00'});
    } else if(duration > 59){
      var mins :any = Math.floor(duration / 60);
      var secs:any = Math.floor(duration % 60);
      if(mins < 10){
        mins = `0${mins}`
      }
      if(secs < 10){
        secs = `0${secs}`;
      }
      setTime({seconds:`${secs}`,minutes:`${mins}`});
    } else if(duration < 60) {
      setTime({seconds:`${duration}`, minutes:'00'});
    }
     
  }
  const share = (title:string,text: string,url:string) => {
    
    if(navigator.share){
      navigator.share({title:title,text:text,url:url})
      .then(()=>{
        console.log('Shared')
      })
      .catch(()=>{
        console.error('An error occurred while trying to share the content')
      });
    }
  }
  return (
    <React.Fragment>
    <div className='bg-white dark:bg-black  dark:text-white' >
      <div id='' className={`alert bg-red-400 alert-error shadow-lg sm:w-[100%] text-white ${errorMessageState}`}>
       <div>
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>{errorMessage}</span>
  </div>
</div>
      <div className='text-left '>
      <div className='font-bold mb-2 ml-2'>Now Playing</div>
      <div>
      <button className='text-1xl my-2 ml-3'>
      <i className='fal fa-chevron-right' />
      </button>
      {loading?
      <span className='font-light ml-5 text-2xl'><i className='fal fa-spinner-third animate-spin' /></span>:
      <span className='font-light ml-2 text-2xl'>{params.title}: {currentVideo.name}</span>
      }
      
      </div>
      <div id='screen' className='h-[230px]  w-[100%] md:w-[600px] md:mx-auto  bg-gradient-to-r from-sky-500 to-sky-900' >
      {messageState?
       <button onClick={playVideo} className=' absolute z-50 text-1xl mx-[2%] md:ml-[15%] text-gray-400 '>
      <i className='fa fa-info-circle' />
      <span className='ml-2' >{messageText}</span>
      </button>: ''
      }
       <button onClick={playVideo} className=' hidden absolute z-50 animate-ping text-5xl my-20 mx-[45%] md:mx-[15%] '>
      <i className='fal fa-play-circle' />
      </button>
      {/*
      <video id='videoElement' className='w-[100%] h-[230px]'   src={'https://youtube.com/watch?v='+currentVideo.key} controls></video>
         */}
         <ReactPlayer 
         config={{
           
         }} 
         ref={reactPlayer} 
         url={'https://youtube.com/watch?v='+currentVideo.key} 
         controls={false} 
         muted={muted}
         pip={true} 
         playing={false} 
         width={'100%'} 
         height={'230px'} 
         light={params.cover} 
         onPlay={() => {
             setInterval(function(){
    let myTime = reactPlayer.current.getCurrentTime();
    //alert(myTime);
    videoProgress(myTime);
    
  },100);
         }}
         onProgress={()=>{
          
         }}
         onDuration={videoDuration}
         playIcon={ <button onClick={playVideo} className=' animate- text-5xl my-20 mx-[45%] md:mx-[15%] text-green-400'>
      <i className='fad fa-play-circle' />
      </button>}  />
      </div>
      <div id='controls' className='sm:shadow-2xl md:w-[600px] md:mx-auto ' >
      <div id='seek' className={`py-[0.4px] bg-green-300 transition-all linear duration-${1500} ${seek}`}>
        
      </div>
      <div id='sub-controls' className='flex justify-around'>
      <button onClick={showPreview} className='text-1xl my-2 ml-2 font-bold'>
      
      <i className='fal fa-sync' />
      </button>
      <div className='dropdown dropdown-top my-2 ml-2' >
     <button tabIndex={0} className='text-1xl  font-bold my-2 ml-2'>
      <i className='fal fa-rectangle-landscape mx-1' />
      HD
      </button>
      <ul tabIndex={0} className="dropdown-content menu  shadow bg-white dark:bg-black w-35 opacity-60">
    <button className=' text-[8pt] btn-active btn-error text-green-400 hover:bg-slate-200 p-2' >1080p</button>
    <button className=' text-[8pt] btn-active btn-error text-green-400 hover:bg-slate-200 p-2' >720p</button>
    <button className=' text-[8pt] btn-active btn-error text-green-400 hover:bg-slate-200 p-2' >480p</button>
    <button className=' text-[8pt] btn-active btn-error text-green-400 hover:bg-slate-200 p-2' >360p</button>
    <button className=' text-[8pt] btn-active btn-error text-green-400 hover:bg-slate-200 p-2' >260p</button>
    <button className=' text-[8pt] btn-active btn-error text-green-400 hover:bg-slate-200 p-2' >144p</button>
    
  </ul>
      </div>
      <div className='my-5 ml-1 text-[8pt]'>
      <i className='fal fa-clock mx-2 '  />
        <span className='mx-1' >{currentTime.minutes}:{currentTime.seconds}</span>
        -
         <span className='mx-1' >{time.minutes}:{time.seconds}</span>
      </div>
      <div className='flex justify-end'>
      <div className='my-5 ml-5' >
      <button className='animate-ping' >
      <i className='fal fa-heart' />
      </button>
      </div>
      <div className='my-5 ml-5' >
      <button className='' >
      <i className='fal fa-cloud-download' />
      </button>
      </div>
       <div className='my-5 ml-5' >
       <button onClick={() => share(movie.title,params.movie_description,window.location.href)}>
      <i className='fal fa-share-alt' />
      </button>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className='md:mx-auto md:w-[600px]' >
        <table className='table-fixed font-light'>
        
          <tbody>
          <tr>
          <td>
          Year
          </td>
          
          <td>
            {movie.year}
          </td>
          </tr>
          <tr>
          <td>
          Genre
          </td>
          <td>
          {movie.category}
          </td>
          </tr>
          <tr>
          <td>
          PG
          </td>
          <td>
         R{movie.parentalGuide}
          </td>
          </tr>
          </tbody>
        </table>
        <div className='hidden md:block' >
        <div className='text-left'>
          Description
        </div>
        {params.movie_description}
        </div>
        <div className='block md:hidden' >
      <div className="collapse collapse-arrow md:collapse-show">
  <input type="checkbox" /> 
  <div className="collapse-title text-xl font- text-left">
    Description
  </div>
  <div className="collapse-content font-light "> 
    <p>{params.movie_description}</p>
  </div>
</div>
        <a href={'https://youtu.be/'+currentVideo.id} >URL</a>
        
        <ol>
        </ol>
      </div>
      </div>
      <div id='relatedMovies' className='' >
             <div className='text-2xl text-left ml-2 my-2 font-light' >
        Related movies <i className='fal fa-chevron-right text-green-400' />
        </div>
           <Swiper
        modules={[Navigation,Pagination,EffectCreative,Lazy]}
        lazy={true}
        slidesPerView={3}
        grabCursor={true}
          keyboard={{
            enabled:true,
          }}
          
        onReachEnd={()=> {} }
        navigation={true} 
        effect={'slide'}
        pagination={{ clickable: true }}
        >
      
        {related_movies_remote.map((mov:any,index:number) => (
        <SwiperSlide className='h-[150px] w-[40%] bg-gradient-to-r from-yellow-500 to-yellow-900 my-5 mx-2' style={{background:`url(${mov.imageSource})`,backgroundSize:'contain',backgroundRepeat:'no-repeat'}} >
       <Link  to={{pathname:'/player',hash:uuidv4(),search:'?movieId='+mov.id+'&cover='+mov.imageSource+'&title='+mov.title+'&movie_description='+mov.description}} >
              <button onClick={playVideo} className='absolute z-50 text-4xl my-20 ml-[-15%] md:mx-[-10%] text-green-400'>
      <i className='fas fa-play-circle' />
      </button>
        </Link>
         <div>
            
            {mov.original_title}
         </div>
        </SwiperSlide>
       )) }
        </Swiper>
      </div>
    </div>
    </React.Fragment>
    );
}