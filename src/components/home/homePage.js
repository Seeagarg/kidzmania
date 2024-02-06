import React, { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import classes from "./homePage.module.css";
import axios from 'axios'
import { baseUrl, videosApi } from '../../api/api';
import { videosByIdApi} from "../../api/api";
import Navbar from '../navbar/navbar';
import playBtn from '../../Animations/playBtn.json'
import Lottie from 'lottie-react';
import loading from '../../Animations/loading.json'
import ReactPlayer from "react-player";

function Home() {
const [videosData,setVideosData]=useState([]);
const [isLoading,setIsLoading]=useState(true)
const [randomData,setRandomData] = useState("");
const [isHovered,setIsHovered] = useState(true);
const [learningData,setLearningData] = useState(true);
const [rhymes,setRhymes] = useState(true);
const [story,setStory] = useState(true);
const [dataLength,setDataLength] = useState(1);
const [randomVideo,setRandomVideo] = useState();


console.log("randomdata=",randomData)
const navigate=useNavigate();

const owlCarouselOptions = {
  items: 5,
  responsive: {
    0: {
      items: 2,
    },
    600: {
      items: 3,
    },
    768: {
      items: 3,
    },
    992: {
      items: 5,
    },
  },
};

  

  // console.log(videosData.length)
  // if(videosData){
  //   videoLength = videosData?.length
  // }
   

  useEffect(()=>{
    const randomIndex = Number(Math.floor(Math.random() * videosData.length));
    const data = videosData[randomIndex];
    console.log("r data ",data)
    setRandomData(data);

    console.log("r state",randomData)

    if(randomData){
      console.log("-----m ",data)
    //  const url=baseUrl+videosByIdApi+`?id=${videosData[randomIndex]?.id}`
    //  console.log("url",url)
  
      const getRandomVideo=async()=>{
        console.log(baseUrl+videosByIdApi+`?id=${randomData.id}`)
        const randomVideoData = await axios.get(baseUrl+videosByIdApi+`?id=${randomData.id}`)
  
        console.log('result',randomVideoData.data.video[0].videoUrl)
        setRandomVideo(randomVideoData.data)
        setIsLoading(false)
      }
  
      getRandomVideo();
    }

  },[videosData])

  function AllClick(){
    setStory(true);
    setLearningData(true);
    setRhymes(true);
  }

  function LearningClick(){
    setStory(false)
    setRhymes(false)
    setLearningData(true)
  }

  function StoryClick(){
    setLearningData(false)
    setRhymes(false)
    setStory(true)
  }

  function RhymesClick(){
    setLearningData(false)
    setStory(false)
    setRhymes(true)
  }

  const showAnimation=()=>{
    setIsHovered(false)
  }


  const hideAnimation=()=>{
    setIsHovered(true)
  }


  const pin = localStorage.getItem("PIN");
 

  useEffect(()=>{
    const fetchDataFromBackend=async()=>{
      try {
        const data=await axios.get(`${baseUrl}${videosApi}`)
        setVideosData(data.data.result);

        
        setDataLength(data.data.result.length);
        console.log(videosData,"nnnnnn");
        // setIsLoading(false)
      } catch (error) {
        console.log(error,"erros")
      }
    }
    
    fetchDataFromBackend();
},[])

  return (
    <div className={`container-fluid ${classes.background}`}>
    
        <div className={`row ${classes.container}`}>
        <Navbar/>

        <div className="conatiner mt-3">
          {/* <img src={randomData?.imageUrl} alt="" onClick={()=>navigate(`/play/${randomData?.id}`)} className={`${classes.random}`} /> */}
          <ReactPlayer
          // url={videoUrl.replace("mpd", "mp4")}
          url={randomVideo?.video[0].videoUrl}
          playing={true}
          controls={true}
          width="100%"
          // height="60vh"
          progressInterval={200}
          playsinline={true}
          className={`${classes.random}`} 
          style={{ marginTop:"10vh"}}
        />
          <img src={randomData?.imageUrl} onClick={()=>navigate(`/play/${randomData?.id}`)} alt="" className={`${classes.randomShort}`} />
        </div>



        {isLoading ? 
        <Lottie
        animationData={loading}
        height={"10vh"}
        width={"10vw"}
        loop={true}
        className={`${classes.loadingAnimation}`}
        />
        
        
        :(
          <>

          <div className="conatiner mt-3">  

          <OwlCarousel className='owl-theme' items={5} {...owlCarouselOptions} loop margin={10} autoplay='true' nav>
           {videosData?.slice(0,10).map((data,i)=>{
            return(
            <div className={`${classes.carousel}`} key={i} class='item' >
            <Link to={`/play/${data?.id}`}>
            <img src={data?.imageUrl} className={`${classes.carouselImage}`} alt="..."/>
            </Link>
            
            <button onClick={()=>navigate(`/play/${data?.id}`)} className={classes.btn}>Play Now</button>
          </div>
          )

        })}
       </OwlCarousel>
          </div>
          
          </>
        )}
        </div>








      <div className=''>

      <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link text-dark fw-bold active" data-bs-toggle="tab"  onClick={AllClick} >ALL</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link text-dark fw-bold" data-bs-toggle="tab"  onClick={LearningClick} >Learning</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link text-dark fw-bold" data-bs-toggle="tab" type="button"  onClick={RhymesClick}>Rhymse</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link text-dark fw-bold"  data-bs-toggle="tab"  type="button"  onClick={StoryClick}>Story</button>
          </li>
      </ul>
      




{learningData?
      <div className="container">
      <h4 className={`mt-3 p-2 `} style={{borderRadius:"10px",backgroundColor:"black",color:"white"}}>Learning</h4>
        <div className={`${classes.items}`}>
        {videosData?.map((data,i)=>{
       if(data.categoryId===1){

         return(
           <>
            <div key={i} className={`${classes.card}`} >
            <div className={`${classes.play}`} >
            <Link to={`/play/${data?.id}`}>
            <img src={data?.imageUrl} className={`${classes.cardImage}`} alt="..."/>
            </Link>
            
            
             <button onClick={()=>navigate(`/play/${data?.id}`)} className={`${classes.btn}`}>Play Now</button>
             </div>
             </div>
           </>
         )
       }
     })}
        </div>
      </div>
      :""
    }


    {rhymes?
      <div className="container">
      <h4 className={` mt-3 p-2 `} style={{borderRadius:"10px",backgroundColor:"black",color:"white"}}>Rhymes</h4>
    <div className={`${classes.items}`}>
     
     {videosData?.map((data,i)=>{
       if(data.categoryId===2){

         return(
           <>
            <div key={i} className={`${classes.card}`}>
            <div className={`${classes.play}`} >
            <Link to={`/play/${data?.id}`}>
            <img src={data?.imageUrl} className={`${classes.cardImage}`} alt="..."/>
            </Link>
            <button onClick={()=>navigate(`/play/${data?.id}`)} className={`${classes.btn}`}>Play Now</button>
              </div>
             </div>
           </>
         )
       }
     })}
   
 </div>
      </div>:""
    }

    {story?
      <div className="container">
      <h4 className={`mt-3 p-2 `} style={{borderRadius:"10px",backgroundColor:"black",color:"white"}}>Story</h4>
    <div className={`${classes.items}`}>
     
    {videosData?.map((data,i)=>{
       if(data.categoryId===3){

         return(
           <>
            <div key={i} className={`${classes.card}`}>
            <div className={`${classes.play}`}>
            <Link to={`/play/${data?.id}`}>
            <img src={data?.imageUrl} className={`${classes.cardImage}`} alt="..."/>
            </Link>
            <button onClick={()=>navigate(`/play/${data?.id}`)} className={`${classes.btn}`}>Play Now</button>
            
             </div>
             </div>
           </>
         )
       }
     })}
   
 </div>
      </div>:""
    }



   




{/* <div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
   <h4 className={`bg-dark mt-3 p-2  text-light`}>Learning</h4>
    <div className='row mt-1'>
     
    {videosData?.map((data,i)=>{
       if(data.categoryId===1){

         return(
           <>
            <div key={i} className='col-6 mt-1 col-lg-3 ' style={{backgroundColor:"#DE5A50"}}>
            <div className={`card  ${classes.play}`} style={{backgroundColor:"#DE5A50",border:'none'}}>
            <Link to={`/play/${data?.id}`}>
            <img src={data?.imageUrl} className={`card-img-top ${classes.shadow}`} alt="..."/>
            </Link>
            
            
             <button onClick={()=>navigate(`/play/${data?.id}`)} className={classes.btn}>Play Now</button>
             </div>
             </div>
           </>
         )
       }
     })}
      
    </div>

    <h4 className={`bg-dark mt-3 p-2  text-light`}>Rhymes</h4>
    <div className='row mt-1'>
     
     {videosData?.map((data,i)=>{
       if(data.categoryId===2){

         return(
           <>
            <div key={i} className='col-6 mt-1 col-lg-3'>
            <div className={`card ${classes.play}`} style={{backgroundColor:"#DE5A50",border:'none'}}>
            <Link to={`/play/${data?.id}`}>
            <img src={data?.imageUrl} className={`card-img-top ${classes.shadow}`} alt="..."/>
            </Link>
            <button onClick={()=>navigate(`/play/${data?.id}`)} className={classes.btn}>Play Now</button>
              </div>
             </div>
           </>
         )
       }
     })}
   
 </div>

    <h4 className={`bg-dark mt-3 p-2  text-light`}>Story</h4>
    <div className='row mt-1'>
     
    {videosData?.map((data,i)=>{
       if(data.categoryId===3){

         return(
           <>
            <div key={i} className='col-6 mt-1 col-lg-3'>
            <div className={`card ${classes.play}`} style={{backgroundColor:"#DE5A50",border:'none'}}>
            <Link to={`/play/${data?.id}`}>
            <img src={data?.imageUrl} className={`card-img-top ${classes.shadow}`} alt="..."/>
            </Link>
            <button onClick={()=>navigate(`/play/${data?.id}`)} className={classes.btn}>Play Now</button>
            
             </div>
             </div>
           </>
         )
       }
     })}
   
 </div>
    
  </div>


  <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
  <h4 className={`bg-dark mt-3 p-2  text-light`}>Learning</h4>
    <div className='row mt-1'>
    {videosData?.map((data,i)=>{
       if(data.categoryId===1){
         return(
           <>
            <div key={i} className='col-6 mt-1 col-lg-3'>
            <div className={`card ${classes.play}`} style={{backgroundColor:"#DE5A50",border:'none'}}>
            <Link to={`/play/${data?.id}`}>
            <img src={data?.imageUrl} className={`card-img-top ${classes.shadow}`} alt="..."/>
            </Link>
            <button onClick={()=>navigate(`/play/${data?.id}`)} className={classes.btn}>Play Now</button>
            
             </div>
             </div>
           </>
         )
       }
     })}


    </div>
  </div>
  <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">

  <h4 className={`bg-dark mt-3 p-2  text-light`}>Rhymes</h4>
    <div className='row mt-1'>
     {videosData?.map((data,i)=>{
       if(data.categoryId===2){

         return(
           <>
            <div key={i} className='col-6 mt-1 col-lg-3'>
            <div className={`card ${classes.play}`} style={{backgroundColor:"#DE5A50",border:'none'}}>
            <Link to={`/play/${data?.id}`}>
            <img src={data?.imageUrl} className={`card-img-top ${classes.shadow}`} alt="..."/>
            </Link>
            <button onClick={()=>navigate(`/play/${data?.id}`)} className={classes.btn}>Play Now</button>
            
             </div>
             </div>
           </>
         )
       }
     })}

    </div>
  </div>
  <div className="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabindex="0">


  <h4 className={`bg-dark mt-3 p-2  text-light`}>Story</h4>
    <div className='row mt-1'>
    {videosData?.map((data,i)=>{
       if(data.categoryId===3){

         return(
           <>
            <div key={i} className={`col-6 mt-1 col-lg-3 `}>
            <div className={`card ${classes.play} `} style={{backgroundColor:"#DE5A50",border:'none'}}>
            <Link to={`/play/${data?.id}`}>
            <img src={data?.imageUrl} className={`card-img-top ${classes.shadow}`} alt="..."/>
            </Link>
            <button onClick={()=>navigate(`/play/${data?.id}`)} className={classes.btn}>Play Now</button>
            
             </div>
             </div>
           </>
         )
       }
     })}

    </div>
  </div>
</div>
     */}


      </div>
    </div>
  )
}

export default Home;
