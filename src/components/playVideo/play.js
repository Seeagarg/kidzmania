import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl, videosByIdApi} from "../../api/api";
import ReactPlayer from "react-player";
import { Link, useNavigate } from "react-router-dom";
import classes from "./play.module.css";
import Navbar from "../navbar/navbar";


function Play() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [videoData, setVideoData] = useState();
  const [similarVideo, setSimilarVideo] = useState();

  const fetchDataFromBackend = async (id) => {
    try {
      const data = await axios.get(`${baseUrl}${videosByIdApi}?id=${id}`);
      console.log(data.data, "mmmmmmmmm");
      setVideoData(data.data.video[0]);
      setSimilarVideo(data.data.similarVideo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigateAndScroll = (link) => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    navigate(link);
  };

  useEffect(() => {
    fetchDataFromBackend(id);
  }, [id]);
  return (
    <div className={`container-fluid ${classes.background}`}>
      {/* <div className={`row bg-dark ${classes.navbar}`} >
        <center>
          {" "}
          <Link to={'/'} style={{textDecoration:'none'}}>
          <h1 className={` py-2 ${classes.text}`}>KIDZMANIA</h1>
          
          </Link>
         
        </center>
      </div> */}
     
      <div className={`row  ${classes.container}`}>
      <Navbar/>
      <div>
      <button  className={`${classes.back}`} onClick={()=>{navigate('/home')}}>
      Go back
      </button>
        
      </div>
        <ReactPlayer
          // url={videoUrl.replace("mpd", "mp4")}
          url={videoData?.videoUrl}
          playing={true}
          controls={true}
          width="100%"
          height="60vh"
          progressInterval={200}
          playsinline={true}

          style={{ marginTop:"10vh"}}
        />
      </div>
      <h4 style={{borderRadius:"10px",backgroundColor:"black",color:"white"}} className={` mt-3 p-2 `}>Similar Videos</h4>
      <div className={`${classes.items}`}>
        {similarVideo?.map((data, i) => {
          return (
            <>
              <div key={i} className={`${classes.card}`}>
                <div
                  class={`${classes.play}`}
                  onClick={() => handleNavigateAndScroll(`/play/${data?.id}`)}
                >
                  <Link to={`/play/${data?.id}`}>
                    <img src={data?.imageUrl} className={`${classes.cardImage}`} alt="..." />
                  </Link>
                  <button
                    // onClick={() => handleNavigateAndScroll(`/play/${data?.id}`)}
                    className={`${classes.btn}`}
                  >
                    Play Now
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Play;
