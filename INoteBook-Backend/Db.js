// Connect Mongoose
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/INoteBook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Successfully Mongoose connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

module.exports = connectToMongo;
