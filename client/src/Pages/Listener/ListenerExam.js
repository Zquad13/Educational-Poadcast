import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../Baseurl";

function ListenerExam() {
  const { id } = useParams(); // Extracting the podcast ID from the URL
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch questions for the podcast
    axiosInstance
      .post(`/getQuestionByPodcastId/${id}`)
      .then((response) => {
        setQuestions(response.data);
        console.log(response.data, "pp");
      })
      .catch((error) => {
        setError("An error occurred while fetching the questions.");
      });
  }, [id]);

  const handleOptionChange = (questionIndex, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [`answerOption${questionIndex + 1}`]: option,
    }));
  };

  const handleSubmit = () => {
    const listenerId = localStorage.getItem("listenerid");

    // Validate if all questions are answered
    if (questions.some((_, index) => !answers[`answerOption${index + 1}`])) {
      setValidationError("Please answer all questions before submitting.");
      return;
    }

    axiosInstance
      .post(`/createAnswer`, {
        ...answers,
        listenerid: listenerId,
        questionId: questions[0]._id,
      })
      .then((response) => {
        console.log("Answer submitted successfully:", response.data);
        setTimeout(() => {
          navigate("/listenerexamreport");
        }, 2000);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 400 &&           
          error.response.data.error ===
            "Exam attended"
        ) {
          alert("Exam attended");
        } else {
          alert("Exam attended");
          console.error(error);
        }
      });
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <div className="listener-exam-divbox container mt-3">
        <div className="text-center mt-5">
          <h3>{questions[0]?.podcastId?.podcastname || "Podcast Exam"}</h3>
        </div>
        {questions.length === 0 ? (
          <div className="alert alert-info">
            There are no questions for this podcast.
          </div>
        ) : (
          questions.map((question, qIndex) => (
            <div key={qIndex}>
              {Array.from({ length: 10 }).map((_, index) =>
                renderQuestion(question, index)
              )}
            </div>
          ))
        )}
        {validationError && (
          <div className="alert alert-warning">{validationError}</div>
        )}
        {questions.length > 0 && (
          <div className="text-center">
            <button className="mt-5 btn btn-success" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );

  function renderQuestion(question, index) {
    const questionText = question[`question${index + 1}`];
    const options = [
      question[`option${index + 1}1`],
      question[`option${index + 1}2`],
      question[`option${index + 1}3`],
      question[`option${index + 1}4`],
    ];

    if (questionText) {
      return (
        <div key={index} className="mt-5 ms-5 mb-5">
          <h5>Question {index + 1}</h5>
          <h6 className="pt-2">{questionText} ?</h6>
          {options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="radio"
                className="listener-exam-radio"
                name={`question${index}`}
                value={String.fromCharCode(65 + optionIndex)}
                onChange={() =>
                  handleOptionChange(
                    index,
                    String.fromCharCode(65 + optionIndex)
                  )
                }
              />{" "}
              {String.fromCharCode(65 + optionIndex)}. {option}
            </div>
          ))}
        </div>
      );
    }
    return null;
  }
}

export default ListenerExam;
