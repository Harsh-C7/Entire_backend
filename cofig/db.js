import mongoose from 'mongoose';

// MongoDB connection URL and database name
const mongoURL = 'mongodb://localhost:27017'; // Replace with your MongoDB connection URL
const dbName = 'your_database_name'; // Replace with your database name

// Configure the connection options (if necessary)
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Other options, such as authentication details
};

// Connect to the MongoDB database
mongoose
  .connect(`${mongoURL}/${dbName}`, options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
