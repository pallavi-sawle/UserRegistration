const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI


mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected!'))
  .catch(() => console.log('Error in connection'));

  exports.connect=()=>{
    mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected!'))
    .catch(() => console.log('Error in connection')); 
  };