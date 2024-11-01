import React, { useEffect, useState } from "react";
import image from "../../Assest/Group 2151.png";
import { Link } from "react-router-dom";
import axiosInstance from "../../Baseurl";
function ViewReport({url}) {
  const [report, setReport] = useState();

  const creatorId = localStorage.getItem("creatorid");
  console.log(creatorId);

  useEffect(() => {
    axiosInstance
      .post("/getAnswersByCreatorid/" + creatorId)
      .then((res) => {
        console.log(res.data, "pp");
        setReport(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="container" style={{minHeight:"100vh"}}>
      <div className="text-center">
        <h3 className="add-question-h3">Exam Report</h3>
      </div>
      <div className="row  mt-5  text-center pt-3 view-question-back">
        <div className="col">
          <b>Profile</b>
        </div>
        <div className="col">
          <b>Name</b>
        </div>
        <div className="col">
          <b>PodCast Name</b>
        </div>
        <div className="col">
          <b>Phone Number</b>
        </div>
        <div className="col">
          <b>Email</b>
        </div>
        <div className="col">
          <b>View Request</b>
        </div>
      </div>
      {report?.map((item) => (
        <div className="row  mt-4 text-center  view-question-back">
          <div className="col pt-2">
            <img src={url+item.listenerid.image.filename} className="view-report-img"></img>
          </div>
          <div className="col pt-3">
            <b>{item.listenerid.firstname}</b>
          </div>
          <div className="col pt-3">
            <b>{item.podcastId.podcastname}</b>
          </div>
          <div className="col pt-3">
            <b>{item.listenerid.mobile}</b>
          </div>
          <div className="col pt-3">
            <b>{item.listenerid.email}</b>
          </div>
          <div className="col pt-3">
            <Link to={"/createrviewreportdetail/"+item._id}>
              <button className="view-request-vqbtn">VR</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewReport;
