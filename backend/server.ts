import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import classRoutes from './routes/classRoutes';

dotenv.config();

const app = express();
const PORT = 3001;

var MONGODB_URI = process.env.MONGODB_URI; 

if (!MONGODB_URI) {
    console.log(MONGODB_URI)
  throw new Error('Please define the MONGODB_URI environment variable');
}
app.use(express.json());

mongoose.connect(MONGODB_URI, {})
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use('/api/classes', classRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});