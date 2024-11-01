const mongoose = require('mongoose');
const { Schema } = mongoose;

const answerSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'questions', 
    required: true
  },
  listenerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "listeners",
},
answerText1: {
    type: String,

  },
  answerOption1: {
    type: String
  },
  answerText2: {
    type: String,

  },
  answerOption2: {
    type: String
  },
  answerText3: {
    type: String,
 
  },
  answerOption3: {
    type: String
  },
  answerText4: {
    type: String,
 
  },
  answerOption4: {
    type: String
  },
  answerText5: {
    type: String,
 
  },
  answerOption5: {
    type: String
  },
  answerText6: {
type: String
  },
  answerOption6: {
    type: String
  },
  answerText7: {
    type: String,

  },
  answerOption7: {
    type: String
  },
  answerText8: {
    type: String,
    
  },
  answerOption8: {
    type: String
  },
  answerText9: {
    type: String,
   
  },
  answerOption9: {
    type: String
  },
  answerText10: {
    type: String,
   
  },
  answerOption10: {
    type: String
  },

  
  status: {
    type: String,
    enum: ['Pending', 'Reviewed'],
    default: 'Pending'
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'creators', 
    required: true
  },
  podcastId: {
    type: Schema.Types.ObjectId,
    ref: 'creatorsPodcast', 
    required: true
  },
}, {
  timestamps: true
});

const Answer = mongoose.model('answers', answerSchema);

module.exports = Answer;
