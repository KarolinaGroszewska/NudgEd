import express from 'express';
import AdminModel from '../models/Admin';

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error fetching Admins:', error);
    res.status(500).json({ error: 'Server error fetching Admins' });
  }
});
// Create a new admin (or log in if you add auth later)
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
        res.status(400).json({ error: 'Name and email are required' });
        return;
    }
    
    let admin = await AdminModel.findOne({ email });
    if (!admin) {
      admin = new AdminModel({ name, email });
      await admin.save();
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error('Error creating Admin:', error);
    res.status(500).json({ error: 'Server error creating Admin' });
  }
});

export default router;
