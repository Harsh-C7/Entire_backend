import express from "express";
import Course from "../models/Course";
import { authenticateUser } from "../middlewares/auth";

const router = express.Router();

// Create a new course
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { title, description, videoUrl } = req.body;

    // Create a new course
    const newCourse = new Course({
      title,
      description,
      videoUrl,
    });

    // Save the course to the database
    const savedCourse = await newCourse.save();

    res.status(201).json({ message: 'Course created successfully', course: savedCourse });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create course', error });
  }
});

// Update a course
router.put('/:courseId', authenticateUser, async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, videoUrl } = req.body;

    // Find the course by courseId
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Update the course details
    course.title = title;
    course.description = description;
    course.videoUrl = videoUrl;

    // Save the updated course to the database
    const updatedCourse = await course.save();

    res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update course', error });
  }
});

// Delete a course
router.delete('/:courseId', authenticateUser, async (req, res) => {
  try {
    const { courseId } = req.params;

    // Find the course by courseId
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Delete the course from the database
    await course.remove();

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete course', error });
  }
});

module.exports = router;
