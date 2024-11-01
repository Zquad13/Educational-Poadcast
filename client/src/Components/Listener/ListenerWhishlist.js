import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Baseurl';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import '../Creator/creatorpodcastlist.css';

function ListenerWhishlist({url}) {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  // const url='http://localhost:4000/'

    useEffect(() => {
        axiosInstance
            .post("/getWishlist", {
                id: localStorage.getItem("listenerid")
            })
            .then((response) => {
                setWishlist(response.data.data);
                console.log(response.data.data);
            })
            .catch((error) => {
                console.log("Error submitting data: ", error);
            });
    }, []);

  useEffect(() => {
    if (localStorage.getItem("listenerid") !== null) {
      navigate("/listenerWhishlist");
    } else {
      navigate("/");
    }
  }, []);

  const gotoPayment=(id)=>{
    navigate(`/paymentform/${id}`)
  }

  return (
    <div className="podcast_list_main container">
      <h4>Wishlist</h4>
      <div class="row">
            {wishlist.length ? (
              wishlist.map((a) => {
                return (
                  <div className="card col-3" id="podcastlist_card">
                    <div class="podcastlist_card_img">
                      <img
                        src={a.podcastId ? url + a.podcastId.coverimage.filename:""}
                        class="card-img-top"
                        id="adminclub"
                        alt="..."
                      />
                    </div>
                    <div class="podcastlist_card_content">
                      <h4 class="card-title mt-3 mb-2t">{a.podcastId ?a.podcastId.podcastname:""}</h4>
                      <h6 class="card-text col">{a.podcastId ?a.podcastId.creatorname:""}</h6>
                      <h6 class="card-text" style={{height:"100px"}}>{a.podcastId ?a.podcastId.description:""}</h6>
                      <button className='episodebtn' onClick={()=>gotoPayment(a.podcastId._id)} >Subscribe</button>
                      <audio controls className="w-100">
                        <source src={a.podcastId ?a.podcastId.audio ? url + a.podcastId.audio.filename : '':""} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no_data">
                <h4 className='text-success text-center'>No Wishlist found</h4>
              </div>
            )}
          </div>
    </div>
  );
}

export default ListenerWhishlist;
