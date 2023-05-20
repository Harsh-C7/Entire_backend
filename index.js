import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

require('dotenv').config();

// Import routes
import authRoutes from "./routes/auth";
import createCoursesRoutes from "./routes/createCourses";
import enrollCoursesRoutes from "./routes/enrollCourses";

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Database connection
const mongoDBURL = process.env.MONGODB_URL;
mongoose
  .connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Routes
app.use('/auth', authRoutes);
app.use('/create-courses', createCoursesRoutes);
app.use('/enroll-courses', enrollCoursesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
