const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  select: {
    type: String,
    required: true
    
  },
  question1: {
    type: String,
    required: true

  },
  option11: {
    type: String,
    required: true

  },
  option12: {
    type: String,
    required: true

  },
  option13: {
    type: String,
    required: true

  },
  option14: {
    type: String,
    required: true

  },
  answer1: {
    type: String,
    required: true

  },
  question2: {
    type: String,
  },
  option21: {
    type: String,
    
  },
  option22: {
    type: String,
    
  },
  option23: {
    type: String,
    
  },
  option24: {
    type: String,
    
  },
  answer2: {
    type: String,
    
  },
  question3: {
    type: String,
  },
  option31: {
    type: String,
    
  },
  option32: {
    type: String,
    
  },
  option33: {
    type: String,
    
  },
  option34: {
    type: String,
    
  },
  answer3: {
    type: String,
    
  },
  question4: {
    type: String,
  },
  option41: {
    type: String,
    
  },
  option42: {
    type: String,
    
  },
  option43: {
    type: String,
    
  },
  option44: {
    type: String,
    
  },
  answer4: {
    type: String,
    
  },
  question5: {
    type: String,
  },
  option51: {
    type: String,
    
  },
  option52: {
    type: String,
    
  },
  option53: {
    type: String,
    
  },
  option54: {
    type: String,
    
  },
  answer5: {
    type: String,
    
  },
  question6: {
    type: String,
  },
  option61: {
    type: String,
    
  },
  option62: {
    type: String,
    
  },
  option63: {
    type: String,
    
  },
  option64: {
    type: String,
    
  },
  answer6: {
    type: String,
    
  },
  question7: {
    type: String,
  },
  option71: {
    type: String,
    
  },
  option72: {
    type: String,
    
  },
  option73: {
    type: String,
    
  },
  option74: {
    type: String,
    
  },
  answer7: {
    type: String,
    
  },
  question8: {
    type: String,
  },
  option81: {
    type: String,
    
  },
  option82: {
    type: String,
    
  },
  option83: {
    type: String,
    
  },
  option84: {
    type: String,
    
  },
  answer8: {
    type: String,
    
  },
  question9: {
    type: String,
  },
  option91: {
    type: String,
    
  },
  option92: {
    type: String,
    
  },
  option93: {
    type: String,
    
  },
  option94: {
    type: String,
    
  },
  answer9: {
    type: String,
    
  },
  question10: {
    type: String,
  },
  option101: {
    type: String,
    
  },
  option102: {
    type: String,
    
  },
  option103: {
    type: String,
    
  },
  option104: {
    type: String,
    
  },
  answer10: {
    type: String,
    
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
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

const Question = mongoose.model('questions', questionSchema);

module.exports = Question;
