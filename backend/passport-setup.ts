import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import AdminModel, { AdminDocument } from './models/Admin'; // Assuming Admin model is defined

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: 'http://localhost:3001/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value;

    if (!email) {
      return done(new Error('No email found in Google profile'), undefined);
    }

    let admin = await AdminModel.findOne({ email });

    if (!admin) {
      admin = await AdminModel.create({
        name: profile.displayName,
        email: profile.emails?.[0]?.value ?? '',
      });
    }

    return done(null, admin);  // Pass the admin object to the done() method
  } catch (error) {
    return done(error, undefined);  // In case of an error, pass it to done
  }
}));
passport.serializeUser((user: AdminDocument, done) => {
  done(null, user.id); // user.id is now a virtual string
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const admin = await AdminModel.findById(id);
    if (!admin) return done(null, false);

    done(null, admin); // Now matches `User` type
  } catch (err) {
    done(err, null);
  }
});
export default passport;