import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import passport from './passport-setup';
import session from 'express-session';

import adminRoutes from './routes/adminRoutes';
import classRoutes from './routes/classRoutes';

import { isAuthenticated } from './middleware/isAuthenticated';


dotenv.config();

const app = express();
const PORT = 3001;
var MONGODB_URI = process.env.MONGODB_URI; 

if (!MONGODB_URI) {
    console.log(MONGODB_URI)
  throw new Error('Please define the MONGODB_URI environment variable');
}
app.use(express.json());

app.use(session({
  secret: 'defaultSecret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(MONGODB_URI, {})
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use('/api/classes', isAuthenticated, classRoutes);
app.use('/api/admins', isAuthenticated, adminRoutes);

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/',
  successRedirect: '/dashboard', // Redirect to Admin dashboard after successful login
}));

app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Welcome to your dashboard!');
  } else {
    res.send('Please log in.');
  }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});