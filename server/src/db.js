import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const connectionString = MONGODB_URI; 
const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected to MongoDB Atlas');} catch (error) {
        console.error('MongoDB connection error:', error);
    }
}
export default connectToDB