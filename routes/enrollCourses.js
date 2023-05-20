import express from "express";
import Course from "../models/Course";
import { authenticateUser } from "../middlewares/auth";

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('enrolledStudents', 'name email'); // Populate the enrolledStudents field with user details
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve courses', error });
  }
});

// Enroll in a course
router.post('/:courseId/enroll', authenticateUser, async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.user;

    // Find the course by courseId
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the user is already enrolled in the course
    if (course.enrolledStudents.includes(userId)) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    // Add the userId to the enrolledStudents array in the course
    course.enrolledStudents.push(userId);
    await course.save();

    res.status(200).json({ message: 'Enrolled in the course successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to enroll in the course', error });
  }
});

module.exports = router;
