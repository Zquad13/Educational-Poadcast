import React, { useState, useEffect } from "react";
import axiosInstance from "../../Baseurl"; // Make sure to import your axios instance

function ListenerReport() {
  const [data, setData] = useState([]);
  const [ans, setAns] = useState([]);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [select, setSelect] = useState("");
  const [outOf, setOutOf] = useState(0);
  const listenerid = localStorage.getItem("listenerid");

  const sc = async (ansid) => {
    const scor = await axiosInstance.post("/calcScore/" + ansid);
    console.log(scor, "scr");
    setScore(scor.data.score);
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const responseans = await axiosInstance.post(
          "/getAnswersByListenerId/" + listenerid
        );
        const response = await axiosInstance.post(
          "/viewSubscriptionByListenerId",
          { id: listenerid }
        );
        if (response.data.status === 200) {
          console.log(response.data, "9999");

          setData(response.data.data);
          console.log(responseans.data, "pppp");

          var temp = {};
          for (var i in responseans.data) {
            var rans = responseans.data[i];
            temp[rans.questionId] = rans;
          }
          setAns(temp);
        } else {
          console.error("Error fetching subscriptions:", response.data.msg);
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, [listenerid]);

  const handleSelect = async (e) => {
    const { value } = e.target;
    setSelect(value);
    for (var i in ans) {
      if (ans[i].podcastId == value) {
        sc(ans[i]._id);
      }
      console.log(ans[i]);
    }
    try {
      const response = await axiosInstance.post(
        `/getQuestionByPodcastId/${value}`
      );
      if (response.status === 200) {
        const approvedQuestions = response.data.filter(questionSet => questionSet.status === "Approved");
        setQuestions(approvedQuestions);
        console.log(approvedQuestions, "222222222");

        // Calculate the number of questions in the selected question set
        const questionCount = response.data.reduce((count, questionSet) => {
          return (
            count +
            Object.keys(questionSet).filter((key) => key.startsWith("question"))
              .length
          );
        }, 0);

        setOutOf(questionCount); // Update the "Out Of" count
      } else {
        console.error("Error fetching questions:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <div>
      <div className="container" style={{minHeight:"70vh"}}>
        <select
          className="add-question-select ps-3"
          name="select"
          onChange={handleSelect}
          value={select}
        >
          <option value="">Select Podcast</option>
          {data.map((item) => (
            <option key={item.podcastid._id} value={item.podcastid._id}>
              {item.podcastid.podcastname}
            </option>
          ))}
        </select>

        <div className="">
          <div className="col-5 listener-report-divbox mt-3">
            <div className="row">
              <div className="col-5 ms-4 pt-5">
                <h6>Total Marks</h6>
                <h6 className="pt-3">Out Of</h6>
                <h6 className="pt-3">Total Percentage</h6>
              </div>
              <div className="col-1 pt-5">
                <h6>:</h6>
                <h6 className="pt-3">:</h6>
                <h6 className="pt-3">:</h6>
              </div>
              <div className="col-5 pt-5">
                <h6>
                  {select ? score : "please select a podcast to see the score"}
                </h6>
                <h6 className="pt-3">{outOf}</h6>
                <h6 className="pt-3">{outOf ? (score / outOf) * 100 : 0}%</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {questions.length > 0 ? (
        questions.map((questionSet, index) => (
          <div key={questionSet._id} className="mt-5 container ms-5 ps-5">
            {[...Array(10)].map(
              (_, i) =>
                questionSet[`question${i + 1}`] && (
                  <div key={i} className="mb-4">
                    <h5>Question {i + 1}</h5>
                    <h6 className="mt-4 ">{questionSet[`question${i + 1}`]} ?</h6>
                    <div
                      className={
                        ans[questionSet._id] &&
                        ans[questionSet._id][`answerOption${i + 1}`] &&
                        ans[questionSet._id][`answerOption${i + 1}`] === "A"
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
                        ans[questionSet._id] &&
                        ans[questionSet._id][`answerOption${i + 1}`] &&
                        ans[questionSet._id][`answerOption${i + 1}`] === "B"
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
                        ans[questionSet._id] &&
                        ans[questionSet._id][`answerOption${i + 1}`] &&
                        ans[questionSet._id][`answerOption${i + 1}`] === "C"
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
                        ans[questionSet._id] &&
                        ans[questionSet._id][`answerOption${i + 1}`] &&
                        ans[questionSet._id][`answerOption${i + 1}`] === "D"
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
        <p className="text-center fs-5 text-success">No questions available</p>
      )}
    </div>
  );
}

export default ListenerReport;
