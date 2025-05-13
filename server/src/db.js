import mongoose from 'mongoose';
import dotenv from 'dotenv';

console.log(dotenv.config());
var MONGODB_URI = process.env.MONGODB_URI; 

if (!MONGODB_URI) {
    console.error('MongoDB connection string not found in environment variables.');
    process.exit(1);
}
const connectToDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}
export default connectToDB