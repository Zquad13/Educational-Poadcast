import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Baseurl';

function ExamQuestionStatus() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const creatorId = localStorage.getItem('creatorid');
    axiosInstance.post(`/getQuestionByCreatorId/${creatorId}`)
      .then((response) => {
        console.log(response, "p");
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  // Group questions by podcastId
  const groupedQuestions = questions.reduce((acc, question) => {
    if (!acc[question.podcastId._id]) {
      acc[question.podcastId._id] = {
        podcastName: question.podcastId.podcastname,
        status: question.status,
        comments: question.comments || '------'
      };
    }
    return acc;
  }, {});

  const uniqueQuestions = Object.values(groupedQuestions);

  return (
    <div className='container'>
      <div className="text-center">
        <h3 className="add-question-h3">Exam Question Status</h3>
      </div>
      <div className="row mt-5 text-center pt-3 exam-question-status-back ">
        <div className="col"><b>Sl.no</b></div>
        <div className="col"><b>Podcast</b></div>
        <div className="col"><b>Status</b></div>
      </div>
      {uniqueQuestions.length === 0 ? (
        <div className="text-center mt-5">
          <p>No questions found.</p>
        </div>
      ) : (
        uniqueQuestions.map((item, index) => (
          <div
            key={index}
            className={`row text-center pt-3 ${index % 2 === 0 ? 'exam-question-status-backcolors' : 'exam-question-status-backcolor'} `}
          >
            <div className="col"><b>{index + 1}.</b></div>
            <div className="col"><b>{item.podcastName}</b></div>
            <div className="col"><b>{item.status}</b></div>
          </div>
        ))
      )}
    </div>
  );
}

export default ExamQuestionStatus;
