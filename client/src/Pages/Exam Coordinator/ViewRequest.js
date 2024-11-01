import React, { useEffect, useState } from "react";
import axiosInstance from "../../Baseurl";
import image1 from "../../Assest/Group 2151.png";
import { useNavigate } from "react-router-dom";

function ViewRequest({ url }) {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .post("/getAllPendingQuestions")
      .then((response) => {
        console.log(response.data);
        setQuestions([]);
        setQuestions(response.data);
      })
      .catch((error) => {
        setError("An error occurred while fetching questions.");
      });
  }, []);

  const handlevq = (id) => {
    navigate(`/examcoordinateviewquestion/${id}`);
  };

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      {
        questions.length>0?
        <>
        <div className="row me-5 mt-5 text-center view-request-div pt-4">
        <div className="col-2">Profile</div>
        <div className="col-2">Name</div>
        <div className="col-2">Phone Number</div>
        <div className="col-2">Email</div>
        <div className="col-2">Technology</div>
        <div className="col-2">View Request</div>
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {questions?.length > 0 ? (
        questions.map((question, index) => (
          <div key={index} className="row mt-5 text-center view-request-div">
            <div className="col-2 pt-2">
              <img
                src={`${url}/${question.creatorId.image.filename}`}
                className="view-request-img"
                alt="Profile"
              />
            </div>
            <div className="col-2 pt-4">{question.creatorId.firstname}</div>
            <div className="col-2 pt-4">{question.creatorId.mobile}</div>
            <div className="col-2 pt-4">{question.creatorId.email}</div>
            <div className="col-2 pt-4">{question.podcastId.podcastname}</div>
            <div className="col-2 pt-4">
              <button
                className="view-request-vqbtn"
                onClick={() => handlevq(question._id)}
              >
                VQ
              </button>
            </div>
          </div>
        ))
      ) : (
        <h4 className="text-success">No Request Found</h4>
      )}
        </>
        :<h4 className="text-success text-center mt-5">No Request Found</h4>
      }
      
    </div>
  );
}

export default ViewRequest;
