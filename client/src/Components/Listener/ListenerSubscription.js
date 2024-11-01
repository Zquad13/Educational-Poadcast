import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../Baseurl";
import { FaPlus } from "react-icons/fa6";
import '../Creator/creatorpodcastlist.css'
import { FaEye } from "react-icons/fa";

import ReactStars from "react-rating-stars-component";

function ListenerSubscription({ data }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("listenerid") == null) {
      navigate("/");
    }
  }, []);
  const [creatorpodcast, setCreatorpodcast] = useState([]);
  useEffect(() => {
    axiosInstance
      .post("/viewSubscriptionByListenerId", {
        id: localStorage.getItem("listenerid"),
      })
      .then((response) => {
        console.log(response, "ajeena");
        setCreatorpodcast(response.data.data, "ajeena");
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });
    console.log(creatorpodcast, "ll");
  }, []);

  const handleSubscribe = () => {

  }

  const handleViewEpisode = (id) => {
    navigate(`/listenerviewepisode/${id}`);
  }
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <div>
      <div className="podcast_list_main">
        <div class="container ">
          <h5 className="text-dark"> podcasts</h5>
          <div class="row">
            {creatorpodcast.length ? (
              creatorpodcast.map((a) => {
                return (
                  <div className="card col-3" id="podcastlist_card">
                    <div class="podcastlist_card_img">
                      <img
                        src={data.url + a.podcastid.coverimage.filename}
                        class="card-img-top"
                        id="adminclub"
                        alt="..."
                      />
                    </div>
                    <div class="podcastlist_card_content">
                      <h4 class="card-title mt-3 mb-2t">{a.podcastid.podcastname}</h4>
                      <h6 class="card-text col">{a.podcastid.creatorname}</h6>
                      <h6 class="card-text" style={{ height: "100px" }}>{a.podcastid.description}</h6>
                      <audio controls className="w-100">
                        <source src={a.podcastid.audio ? data.url + a.podcastid.audio.filename : ''} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                      {data.role === 'listener' ? <div className='text-center '><button className='episodebtn' onClick={() => { handleViewEpisode(a.podcastid._id + ',' + a.podcastid.podcastname) }} >view episodes <FaEye /></button></div> : <button onClick={() => handleSubscribe(a._id + ',' + a.podcastname)}>Subscribe</button>}
                      <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                    />
                    </div>
                    
                  </div>
                );
              })
            ) : (
              <div className="no_data">
                <h4 className='text-success text-center'>No subscriptions found</h4>
              </div>
            )}
          </div>
        </div>
      </div>


    </div>
  )
}

export default ListenerSubscription
// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../Baseurl";
// import { FaPlus } from "react-icons/fa6";
// import './creatorpodcastlist.css';
// import { useNavigate } from "react-router-dom";

// function CreatorPodcastList({ data }) {
//   const navigate=useNavigate()

//   const [creatorpodcast, setCreatorpodcast] = useState([]);
//   useEffect(() => {
//     axiosInstance
//       .post("/getAllPodcastByCreator", {
//         id: localStorage.getItem("creatorid"),
//       })
//       .then((response) => {
//         console.log(response.data.data, "ajeena");
//         setCreatorpodcast(response.data.data, "ajeena");
//       })
//       .catch((error) => {
//         console.error("Error submitting data: ", error);
//       });
//     console.log(creatorpodcast, "ll");
//   }, []);

//   const gotoEpisode=(id)=>{
//     navigate(`/creatorepisodadd/${id}`)
//   }
//   return (
//     <div className="podcast_list_main">
//       <div class="container ">
//       <h5 className="text-dark">My podcasts</h5>
//         <div class="row">
//           {creatorpodcast.length ? (
//             creatorpodcast.map((a) => {
//               return (
//                 <div  className="card col-3" id="podcastlist_card">
//                   <div class="podcastlist_card_img">
//                     <img
//                     src={data.url + a.coverimage.filename}
//                     class="card-img-top"
//                       id="adminclub"
//                       alt="..."
//                     />
//                   </div>
//                   <div class="podcastlist_card_content">
//                     <h4 class="card-title mt-3 mb-2t">{a.podcastname}</h4>
//                     <h6 class="card-text col">{a.creatorname}</h6>
//                     <h6 class="card-text">{a.description}</h6>
//                     {data.role === 'creator' ? '' : <button>Subscribe</button>}
//                     <button onClick={()=>gotoEpisode(a._id + ',' + a.podcastname)} className="episodebtn">Add Episode
//                       <FaPlus  />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="no_data">
//               <h1>No podcast found</h1>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreatorPodcastList;
