import React, { useState, useEffect } from "react";
import topimg from "../../Assest/dash.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Sidebar from './AdminSidebar';
import axiosInstance from "../../Baseurl";
import ListenerList from "../../Pages/Admin/ListenerList";
import AdminSidebar from "./AdminSidebar";


function AdminDashboard({url,isDashboard}) {
  const [ListenerCount, setListenerCount] = useState(0);
  const [creatorCount, setCreatorCount] = useState(0);
  const [podcastcount, setPodcastCount] = useState(0);


  const ListenerCollectionCount = async () => {
    try {
      const response = await axiosInstance.post(
        "listenercollection"
      ); // Replace with your backend URL
      setListenerCount(response.data.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const CreatorCollectionCount = async () => {
    try {
      const response = await axiosInstance.post(
        "creatorCollection"
      ); // Replace with your backend URL
      setCreatorCount(response.data.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const PodcastCollectionCount = async () => {
    try {
      const response = await axiosInstance.post(
        "podcastcollection"
      ); // Replace with your backend URL
      setPodcastCount(response.data.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    ListenerCollectionCount()
    CreatorCollectionCount()
    PodcastCollectionCount()
  }, [])
  return (
    <div className="adminbg" >
      <div className="row ">
        <div className="col-3">
          <AdminSidebar />
        </div>
        <div className="col-8 text-center m-5">
          <img src={topimg} alt="img" className=" img-fluid"></img>
          <h4 className="m-4">Podcast Statistics</h4>
          <div className="container">
            <div className="adminbg row">
              <div className="col-4">
                <Card style={{ width: "18rem" }}> <h6>Total Listeners</h6>
                  <h1>{ListenerCount}</h1>
                </Card>
              </div>
              <div className="col-4">
                <Card style={{ width: "18rem" }}>
                 <h6>Total Creators</h6><h1> {creatorCount}</h1>
                </Card>
              </div>
              <div className="col-4">
                <Card style={{ width: "18rem" }}>
                 <h6>Total Podcasts</h6> <h1>{podcastcount}</h1>
                </Card>
              </div>
            </div>
            <div>
            <ListenerList url={url} isDashboard />
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

{/* <p className="text-center">Recent Updates</p>
          <div className="row">
            <div className="col-5">
              <div className="row">
                <div className="col">1</div>
                <div className="col">5</div>
              </div>
            </div>
            <div className="col-7">
              <div className="row">
                <div className="col">1</div>
                <div className="col">5</div>
              </div></div>
          </div> */}