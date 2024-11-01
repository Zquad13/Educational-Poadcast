import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Baseurl";

function ViewQuestion() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [select, setSelect] = useState("");
  const [questions, setQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPodcastId, setSelectedPodcastId] = useState("");

  const handleEdit = () => {
    navigate("/createreditquestion");
  };

  const handleSelect = (e) => {
    const podcastName = e.target.value;
    setSelect(podcastName);

    const selectedPodcast = data.find(
      (podcast) => podcast.podcastname === podcastName
    );

    setSelectedPodcastId(selectedPodcast._id)

    if (selectedPodcast) {
      axiosInstance
        .post(`/getQuestionByPodcastId/${selectedPodcast._id}`)
        .then((result) => {
          if (result.data.length > 0) {
            setQuestions(result.data);
            setErrorMessage("");
          } else {
            setQuestions([]);
            setErrorMessage("No questions added for this podcast");
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            setErrorMessage("No questions found for the selected podcast");
          } else {
            setErrorMessage("An error occurred while fetching questions");
          }
          setQuestions([]);
        });
    }
  };

  useEffect(() => {
    axiosInstance
      .post("/getAllPodcastByCreator", {
        id: localStorage.getItem("creatorid"),
      })
      .then((result) => {
        const podcasts = result.data.data;
        setData(podcasts);

        if (podcasts.length > 0) {
          const firstPodcast = podcasts[0];
          setSelect(firstPodcast.podcastname);

          axiosInstance
            .post(`/getQuestionByPodcastId/${firstPodcast._id}`)
            .then((result) => {
              if (result.data.length > 0) {
                setQuestions(result.data);
                setErrorMessage("");
              } else {
                setQuestions([]);
                setErrorMessage("No questions added for this podcast");
              }
            })
            .catch((err) => {
              if (err.response && err.response.status === 404) {
                setErrorMessage("No questions found for the selected podcast");
              } else {
                setErrorMessage("An error occurred while fetching questions");
              }
              setQuestions([]);
            });
        }
      });
  }, []);

  console.log(select);
  console.log(selectedPodcastId);
  

  return (
    <div className="container">
      <div className="text-center">
        <h3 className="add-question-h3">View Questions</h3>
      </div>
      <div className="mt-5 ms-5">
        <select
          className="add-question-select ps-3"
          name="select"
          onChange={handleSelect}
          value={select}
        >
          {data.map((item) => (
            <option key={item._id} value={item.podcastname}>
              {item.podcastname}
            </option>
          ))}
        </select>
      </div>
      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}
      <div>
        {questions.length > 0 ? (
          questions.map((questionSet, index) => (
            <div className="ms-5 mt-5" key={index}>
              {Object.keys(questionSet).map((key) => {
                if (key.startsWith("question")) {
                  const questionNumber = key.replace("question", "");
                  return (
                    <div key={questionNumber}>
                      <h5>Question {questionNumber}</h5>
                      <h6>{questionSet[key]} ?</h6>
                      <p>
                        A.{" "}
                        {questionSet[`option${questionNumber}1`] ||
                          questionSet[`option1${questionNumber}`]}
                      </p>
                      <p>
                        B.{" "}
                        {questionSet[`option${questionNumber}2`] ||
                          questionSet[`option2${questionNumber}`]}
                      </p>
                      <p>
                        C.{" "}
                        {questionSet[`option${questionNumber}3`] ||
                          questionSet[`option3${questionNumber}`]}
                      </p>
                      <p>
                        D.{" "}
                        {questionSet[`option${questionNumber}4`] ||
                          questionSet[`option4${questionNumber}`]}
                      </p>
                      <p>Answer: {questionSet[`answer${questionNumber}`]}</p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))
        ) : (
          <div className="ms-5 mt-5">
            <h5>No questions added for this podcast</h5>
          </div>
        )}
      </div>
      {questions.length > 0 && (
        <div className="text-center">
          <button className="view-question-editbtn" onClick={handleEdit}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default ViewQuestion;
