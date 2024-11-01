import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../Baseurl";

function ExamReportDetail({ url }) {
  const [report, setReport] = useState({});
  const [questions, setQuestions] = useState([]);
  const { ansid } = useParams();
  const [outOf, setOutOf] = useState(0); 
  const [score, setScore] = useState(0);

  const sc = async (ansid) => {
    try {
      const scor = await axiosInstance.post(`/calcScore/${ansid}`);
      console.log(scor, "scr");
      setScore(scor.data.score);
    } catch (error) {
      console.error("Error fetching score:", error);
    }
  };

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axiosInstance.post(`/getAnswerById/${ansid}`);
        setReport(res.data);
        console.log(res.data, "99");

        if (res.data.podcastId?._id) {
          await fetchQuestions(res.data.podcastId._id);
        }
      } catch (err) {
        console.error("Error fetching report:", err);
      }
    };

    if (ansid) {
      fetchReport();
      sc(ansid); 
    }
  }, [ansid]);

  const fetchQuestions = async (podcastId) => {
    try {
      const res = await axiosInstance.post(`/getQuestionByPodcastId/${podcastId}`);
      if (res.status === 200) {
        setQuestions(res.data);

        const questionCount = res.data.reduce((count, questionSet) => {
          return count + Object.keys(questionSet).filter(key => key.startsWith("question")).length;
        }, 0);

        setOutOf(questionCount);
      } else {
        console.error("Error fetching questions:", res.data.error);
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  return (
    <div>
      <div className="ms-5">
        <Link to="/createrviewreport">
          <IoMdArrowBack className="exam-report-detail-icon" />
        </Link>
      </div>
      <div className="text-center">
        <label className="exam-report-detail-divbox">
          <img
            src={`${url}/${report?.listenerid?.image?.filename}`}
            className="exam-report-detail-img mt-3"
            alt="Listener"
          />
          <div className="row">
            <div className="col-3">
              <div>
                <label className="mt-2">Name</label>
              </div>
              <div>
                <label className="mt-2">Podcast Name</label>
              </div>
            </div>
            <div className="col-1">
              <div>
                <label className="mt-2">:</label>
              </div>
              <div>
                <label className="mt-2">:</label>
              </div>
            </div>
            <div className="col-3">
              <div>
                <label className="mt-2">{report?.listenerid?.firstname}</label>
              </div>
              <div>
                <label className="mt-2">{report?.podcastId?.podcastname}</label>
              </div>
            </div>
            <div className="col-4 exam-report-detail-divbox2">
              <h6 className="pt-4">Total Marks</h6>
              <h5 className="text-center">{outOf ? ((score / outOf) * 100).toFixed(2) : 0}%</h5>
            </div>
          </div>
        </label>
      </div>
      <div className="exm_report_details mt-3">
        {/* <div className="col-3"></div> */}
        {/* <div className="col-5"> */}
          {/* <div className="row"> */}
            <div className="d-flex justify-content-between" >
            <b>Total Number of Questions</b>
            <b>{outOf}</b>

            </div>
            {/* <div>
            </div> */}
            <div className="d-flex justify-content-between" >
            <b>Total Number of Correct Answer</b>
            <b>{score}</b>
            </div>
          
            {/* <div className="col-lg-8 col-md-8 col-sm-8 mt-3 ps-5 ms-5">
              <div>
                <b>Total Number of Questions</b>
              </div>
              <div>
                <b>Total Number of Correct Answer </b>
              </div>
            </div>
            <div className="col-lg-1 col-md-1 col-sm-1 mt-3">
              <div>
                <b>:</b>
              </div>
              <div>
                <b>:</b>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 mt-3">
              <div>
                <b>{outOf}</b>
              </div>
              <div>
                <b>{score}</b>
              </div>
            </div> */}
          {/* </div> */}
        {/* </div> */}
        {/* <div className="col-lg-4 col-md-4 col-sm-4"></div> */}
      </div>
      <div className="container">
        {questions.length > 0 ? (
          questions.map((questionSet, index) => (
            <div key={questionSet._id} className="mt-5 container ms-5 ps-5">
              {[...Array(10)].map(
                (_, i) =>
                  questionSet[`question${i + 1}`] && (
                    <div key={i} className="mb-4">
                      <h5>Question {i + 1}</h5>
                      <h6 className="mt-4">{questionSet[`question${i + 1}`]} ?</h6>
                      <div
                        className={
                          report[`answerOption${i + 1}`] &&
                          report[`answerOption${i + 1}`] === "A"
                            ? questionSet[`answer${i + 1}`] === "A"
                              ? "listener-report-correctanswer"
                              : "listener-report-wronganswer mt-2"
                            : questionSet[`answer${i + 1}`] === "A"
                            ? "listener-report-correctanswer"
                            : ""
                        }
                      >
                        <p>A. {questionSet[`option${i + 1}1`]}</p>
                      </div>
                      <div
                        className={
                          report[`answerOption${i + 1}`] &&
                          report[`answerOption${i + 1}`] === "B"
                            ? questionSet[`answer${i + 1}`] === "B"
                              ? "listener-report-correctanswer"
                              : "listener-report-wronganswer mt-2"
                            : questionSet[`answer${i + 1}`] === "B"
                            ? "listener-report-correctanswer"
                            : ""
                        }
                      >
                        <p>B. {questionSet[`option${i + 1}2`]}</p>
                      </div>
                      <div
                        className={
                          report[`answerOption${i + 1}`] &&
                          report[`answerOption${i + 1}`] === "C"
                            ? questionSet[`answer${i + 1}`] === "C"
                              ? "listener-report-correctanswer"
                              : "listener-report-wronganswer mt-2"
                            : questionSet[`answer${i + 1}`] === "C"
                            ? "listener-report-correctanswer"
                            : ""
                        }
                      >
                        <p>C. {questionSet[`option${i + 1}3`]}</p>
                      </div>
                      <div
                        className={
                          report[`answerOption${i + 1}`] &&
                          report[`answerOption${i + 1}`] === "D"
                            ? questionSet[`answer${i + 1}`] === "D"
                              ? "listener-report-correctanswer"
                              : "listener-report-wronganswer mt-2"
                            : questionSet[`answer${i + 1}`] === "D"
                            ? "listener-report-correctanswer"
                            : ""
                        }
                      >
                        <p>D. {questionSet[`option${i + 1}4`]}</p>
                      </div>
                    </div>
                  )
              )}
            </div>
          ))
        ) : (
          <p>No questions available</p>
        )}
      </div>
    </div>
  );
}

export default ExamReportDetail;
