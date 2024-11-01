const Question = require("./QuestionSchema");

// Create a new question
const createQuestion = async (req, res) => {
  console.log(req.body);
  try {
    const {
      select,
      creatorId,
      podcastId,
      question1,
      option11,
      option12,
      option13,
      option14,
      answer1,
      question2,
      option21,
      option22,
      option23,
      option24,
      answer2,
      question3,
      option31,
      option32,
      option33,
      option34,
      answer3,
      question4,
      option41,
      option42,
      option43,
      option44,
      answer4,
      question5,
      option51,
      option52,
      option53,
      option54,
      answer5,
      question6,
      option61,
      option62,
      option63,
      option64,
      answer6,
      question7,
      option71,
      option72,
      option73,
      option74,
      answer7,
      question8,
      option81,
      option82,
      option83,
      option84,
      answer8,
      question9,
      option91,
      option92,
      option93,
      option94,
      answer9,
      question10,
      option101,
      option102,
      option103,
      option104,
      answer10,
      status,
    } = req.body;

    const existingQuestion = await Question.findOne({ podcastId });
    if (existingQuestion) {
      return res
        .status(400)
        .json({ error: "A question set already exists for this podcast" });
    }

    const questionData = {
      select,
      creatorId,
      podcastId,
      question1,
      option11,
      option12,
      option13,
      option14,
      answer1,
      question2,
      option21,
      option22,
      option23,
      option24,
      answer2,
      question3,
      option31,
      option32,
      option33,
      option34,
      answer3,
      question4,
      option41,
      option42,
      option43,
      option44,
      answer4,
      question5,
      option51,
      option52,
      option53,
      option54,
      answer5,
      question6,
      option61,
      option62,
      option63,
      option64,
      answer6,
      question7,
      option71,
      option72,
      option73,
      option74,
      answer7,
      question8,
      option81,
      option82,
      option83,
      option84,
      answer8,
      question9,
      option91,
      option92,
      option93,
      option94,
      answer9,
      question10,
      option101,
      option102,
      option103,
      option104,
      answer10,
      status: status || "Pending",
    };

    const question = new Question(questionData);
    const savedQuestion = await question.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the question" });
  }
};
// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching questions" });
  }
};

const getAllPendingQuestions = async (req, res) => {
  try {
    const questions = await Question.find({status:"Pending" }).populate("creatorId podcastId")
    res.status(200).json(questions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching questions" });
  }
};
const getAllAcceptedQuestions = async (req, res) => {
  try {
    const questions = await Question.find({status:"Approved"}).populate("creatorId podcastId")
    res.status(200).json(questions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching questions" });
  }
};
const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json(question);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the question" });
  }
};

// Update a question
const updateQuestion = async (req, res) => {
  try {
    const { podcastId } = req.params;
    const questions = req.body; // Array of question objects

    const updatePromises = questions.map(async (question) => {
      const { _id, ...updateData } = question;
      return Question.findByIdAndUpdate(_id, updateData, { new: true });
    });

    const updatedQuestions = await Promise.all(updatePromises);

    if (updatedQuestions.some((q) => !q)) {
      return res.status(404).json({ error: "One or more questions not found" });
    }

    res.status(200).json(updatedQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the questions" });
  }
};

// Delete a question
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the question" });
  }
};

// Get a single question by ID
const getQuestionByPodcastId = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.find({ podcastId: id }).populate(
      "podcastId creatorId"
    );
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json(question);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the question" });
  }
};

// Get a single question by ID
const getQuestionByCreatorId = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.find({ creatorId: id }).populate(
      "podcastId creatorId"
    );
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json(question);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the question" });
  }
};


const acceptQuestion= async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "question not found" });
    }

    question.status = "Approved";
    
    await question.save();
    return res.status(200).json({
      message: "Question accepted",
      data: question,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error on accept question", error });
  }
};

const rejectQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "question not found" });
    }

    question.status = "Rejected";
    await question.save();
    return res
      .status(200)
      .json({ message: " question rejected", data: question });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error on reject question", error });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getQuestionByCreatorId,
  getQuestionByPodcastId,

  getAllPendingQuestions,
  getAllAcceptedQuestions,
  acceptQuestion,
  rejectQuestion
};
