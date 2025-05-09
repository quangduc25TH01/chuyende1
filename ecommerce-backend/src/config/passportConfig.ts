import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import AppDataSource from "../ormconfig";
import { User } from "../entities/User";

// Initialize User Repository
const userRepository = AppDataSource.getRepository(User);

// Serialize user (store user ID in session)
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user (retrieve user data from ID)
passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await userRepository.findOneBy({ id });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Local Strategy for sign-in
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await userRepository.findOneBy({ email });
        if (!user) return done(null, false, { message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return done(null, false, { message: "Incorrect password" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
