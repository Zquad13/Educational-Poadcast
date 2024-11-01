
const mongoose = require("mongoose");

const cSchema = mongoose.Schema({

  email: {
    type: String,
   required: true,

  },
  password: {
    type: String,
    required: true,
  },

 
  userRole: {
    type: String,
    default: 'cordinator'
  },
  
});
module.exports = mongoose.model("cordinators", cSchema);
