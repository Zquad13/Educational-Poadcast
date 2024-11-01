import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Baseurl";

function AddQuestion() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([
    { question: "", option1: "", option2: "", option3: "", option4: "", answer: "" }
  ]);
  const [errors, setErrors] = useState({});
  const [select, setSelect] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axiosInstance.post("/getAllPodcastByCreator", {
      id: localStorage.getItem("creatorid"),
    })
    .then((result) => {
      setData(result.data.data);
    });
  }, []);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    setQuestions(newQuestions);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [`${index}_${name}`]: "",
    }));
  };

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!select) formErrors.select = "Please select a podcast";
    questions.forEach((question, index) => {
      if (!question.question) formErrors[`${index}_question`] = "Question Required";
      if (!question.option1) formErrors[`${index}_option1`] = "Option A Required";
      if (!question.option2) formErrors[`${index}_option2`] = "Option B Required";
      if (!question.option3) formErrors[`${index}_option3`] = "Option C Required";
      if (!question.option4) formErrors[`${index}_option4`] = "Option D Required";
      if (!question.answer) formErrors[`${index}_answer`] = "Answer Required";
    });
    return formErrors;
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", option1: "", option2: "", option3: "", option4: "", answer: "" }
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const questionData = {
          select,
          creatorId: localStorage.getItem('creatorid'),
          podcastId: data.find(podcast => podcast.podcastname === select)?._id,
          ...flattenQuestions(questions),
          status: 'Pending',
        };

        const res = await axiosInstance.post(`/createQuestion`, questionData);
        if (res.status === 201) {
          alert("Added Successfully");
          navigate("/createrviewquestion");
        }
      } catch (err) {
        if (err.response && err.response.status === 400 && err.response.data.error === 'A question set already exists for this podcast') {
          setErrorMessage('A question set already exists for this podcast');
          alert("A question set already exists for this podcast");
        } else {
          alert("Error occurred while adding question");
          console.error(err);
        }
      }
    }
  };

  const flattenQuestions = (questions) => {
    const flattened = {};
    questions.forEach((q, index) => {
      flattened[`question${index + 1}`] = q.question;
      flattened[`option${index + 1}1`] = q.option1;
      flattened[`option${index + 1}2`] = q.option2;
      flattened[`option${index + 1}3`] = q.option3;
      flattened[`option${index + 1}4`] = q.option4;
      flattened[`answer${index + 1}`] = q.answer;
    });
    return flattened;
  };

  return (
    <div className="container">
      <div className="text-center">
        <h3 className="add-question-h3">Add Questions</h3>
      </div>
      <select
        className="add-question-select ps-3"
        name="select"
        onChange={handleSelect}
        value={select}
      >
        <option value="">Select Podcast</option>
        {data.map((item) => (
          <option key={item._id} value={item.podcastname}>{item.podcastname}</option>
        ))}
      </select>
      {errors.select && (
        <div className="alert alert-danger mt-3" role="alert">
          {errors.select}
        </div>
      )}
      {questions.map((question, index) => (
        <div className="container mt-5" key={index}>
          <div className="mt-5">
            <label className="ms-4 add-question-label me-2 ">
              {index + 1}.
            </label>
            <input
              type="text"
              className="add-question-text ms-3 ps-3"
              placeholder="Enter the Question"
              value={question.question}
              name="question"
              onChange={(e) => handleChange(index, e)}
            />
            {errors[`${index}_question`] && (
              <span className="text-danger ms-5 ps-3">
                {errors[`${index}_question`]}
              </span>
            )}
            <div className="text-end">
            <button
              className="btn btn-danger ms-3 mt-2"
              onClick={() => handleRemoveQuestion(index)}
            >
              Remove
            </button>
              </div>
           
          </div>

          <div>
            <label className="ms-4 add-question-label me-2 mt-5">A.</label>
            <input
              type="text"
              className="add-question-optiontextbox ms-3 ps-3"
              placeholder="Option"
              value={question.option1}
              name="option1"
              onChange={(e) => handleChange(index, e)}
            />
            {errors[`${index}_option1`] && (
              <span className="text-danger ms-5 ps-3">
                {errors[`${index}_option1`]}
              </span>
            )}
          </div>

          <div>
            <label className="ms-4 add-question-label me-2 mt-5">B.</label>
            <input
              type="text"
              className="add-question-optiontextbox ms-3 ps-3"
              placeholder="Option"
              value={question.option2}
              name="option2"
              onChange={(e) => handleChange(index, e)}
            />
            {errors[`${index}_option2`] && (
              <span className="text-danger ms-5 ps-3">
                {errors[`${index}_option2`]}
              </span>
            )}
          </div>

          <div>
            <label className="ms-4 add-question-label me-2 mt-5">C.</label>
            <input
              type="text"
              className="add-question-optiontextbox ms-3 ps-3"
              placeholder="Option"
              value={question.option3}
              name="option3"
              onChange={(e) => handleChange(index, e)}
            />
            {errors[`${index}_option3`] && (
              <span className="text-danger ms-5 ps-3">
                {errors[`${index}_option3`]}
              </span>
            )}
          </div>

          <div>
            <label className="ms-4 add-question-label me-2 mt-5">D.</label>
            <input
              type="text"
              className="add-question-optiontextbox ms-3 ps-3"
              placeholder="Option"
              value={question.option4}
              name="option4"
              onChange={(e) => handleChange(index, e)}
            />
            {errors[`${index}_option4`] && (
              <span className="text-danger ms-5 ps-3">
                {errors[`${index}_option4`]}
              </span>
            )}
          </div>

          <div className="container mt-5 ms-5 ">
            <select
              className="add-question-select ps-3"
              value={question.answer}
              name="answer"
              onChange={(e) => handleChange(index, e)}
            >
              <option value="">Answer</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
            {errors[`${index}_answer`] && (
              <span className="text-danger ms-5 ps-3">
                {errors[`${index}_answer`]}
              </span>
            )}
          </div>
        </div>
      ))}

      <div className="text-center mt-4">
        <button className="add-question-addbtn" onClick={handleAddQuestion}>
          Add +
        </button>
        <button className="add-question-savebtn ms-3" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddQuestion;
