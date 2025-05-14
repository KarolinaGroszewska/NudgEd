import express from 'express';
import { ClassModel } from '../models/Class';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Extract class data from request body
    const { name, adminId } = req.body;

    // Create a new Class document
    const newClass = new ClassModel({ name, adminId });
    // studentIds and assignmentIds will start as empty arrays by default

    // Save to MongoDB
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create class' });
  }
});

export default router;