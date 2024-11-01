const Question = require("../ExamCordinator/QuestionSchema");
const Answer = require("./answerSchema");

// Create a new answer
const createAnswer = async (req, res) => {
  try {
    const {
      questionId,
      listenerid,
      answerOption1,
      answerOption2,
      answerOption3,
      answerOption4,
      answerOption5,
      answerOption6,
      answerOption7,
      answerOption8,
      answerOption9,
      answerOption10,
    } = req.body;

    if (!questionId || !listenerid) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingAns = await Answer.findOne({
      listenerid,
      questionId,
      // status: "Reviewed",
    });
    if (existingAns) {
      return res
        .status(400)
        .json({ error: "You have already attended this Set of Questions" });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    const answer = new Answer({
      questionId,
      listenerid,
      answerOption1,
      answerOption2,
      answerOption3,
      answerOption4,
      answerOption5,
      answerOption6,
      answerOption7,
      answerOption8,
      answerOption9,
      answerOption10,
      creatorId: question.creatorId,
      podcastId: question.podcastId,
    });

    await answer.save();

    res.status(201).json(answer);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the answer" });
  }
};

// Get all answers
const getAllAnswers = async (req, res) => {
  try {
    const answers = await Answer.find()
      .populate("questionId")
      .populate("listenerid")
      .populate("creatorId")
      .populate("podcastId");
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching answers" });
  }
};

// Get a single answer by ID
const getAnswerById = async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await Answer.findById(id)
      .populate("questionId")
      .populate("listenerid")
      .populate("creatorId")
      .populate("podcastId");
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }
    res.status(200).json(answer);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the answer" });
  }
};

// Update an answer
const updateAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedAnswer = await Answer.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!updatedAnswer) {
      return res.status(404).json({ error: "Answer not found" });
    }
    res.status(200).json(updatedAnswer);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the answer" });
  }
};

// Delete an answer
const deleteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAnswer = await Answer.findByIdAndDelete(id);
    if (!deletedAnswer) {
      return res.status(404).json({ error: "Answer not found" });
    }
    res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the answer" });
  }
};

// Get answers by question ID
const getAnswersByQuestionId = async (req, res) => {
  try {
    const { questionId } = req.params;
    const answers = await Answer.find({ questionId })
      .populate("listenerid")
      .populate("creatorId")
      .populate("podcastId");
    res.status(200).json(answers);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while fetching answers by question ID",
      });
  }
};

// Get answers by listener ID
const getAnswersByListenerId = async (req, res) => {
  try {
    const { id } = req.params;
    const answers = await Answer.find({ listenerid: id });
    res.status(200).json(answers);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while fetching answers by listener ID",
      });
  }
};

// Get a single question by ID
const getAnswersByCreatorid = async (req, res) => {
  try {
    const { id } = req.params;
    const answers = await Answer.find({ creatorId: id }).populate("questionId listenerid creatorId podcastId")
    res.status(200).json(answers);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while fetching answers by listener ID",
      });
  }
};

// Calculate the score for a given answer ID
const calcScore = async (req, res) => {
  try {
    const answerId = req.params.id;

    const answer = await Answer.findById(answerId).populate("questionId");

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    const question = answer.questionId;

    let score = 0;

    const checkAnswer = (questionAnswer, userAnswer) =>
      questionAnswer === userAnswer;

    // Iterate through each question and compare with answers
    for (let i = 1; i <= 10; i++) {
      const questionKey = `question${i}`;
      const answerKey = `answer${i}`;
      const userAnswerOptionKey = `answerOption${i}`;

      if (question[questionKey] && question[answerKey]) {
        const correctAnswer = question[answerKey];
        const userAnswer = answer[userAnswerOptionKey];

        if (checkAnswer(correctAnswer, userAnswer)) {
          score += 1; // Increment score for correct answer
        }
      }
    }

    // Respond with the calculated score
    res.status(200).json({ score });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ error: "An error occurred while calculating the score" });
  }
};
module.exports = {
  createAnswer,
  getAllAnswers,
  getAnswerById,
  updateAnswer,
  deleteAnswer,
  getAnswersByQuestionId,
  getAnswersByListenerId,
  getAnswersByCreatorid,
  calcScore,
};
