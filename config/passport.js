import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

export const googleStrategy = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Find or create user
          let user = await User.findOne({ googleId: profile.id });
          if (!user) {
            user = new User({
              fullname: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              // You can add more user details here if needed
              
            });
            await user.save();
          }
          done(null, user);
        } catch (err) {
          done(err, false);
        }
      }
    )
  );

  // Serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
