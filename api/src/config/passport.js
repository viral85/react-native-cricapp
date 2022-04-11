const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const User = require("../users/user.model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    (username, password, done) => {
      User.findOne({ username: username.toLowerCase() }, (err, user) => {
        // console.log(user);
        if (err) return done(err);

        if (!user) {
          return done(null, false, { msg: `Username ${username} not found.` });
        }

        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile."
          });
        }

        user.comparePassword(password, (err, isMatch) => {
          //   console.log(password);
          if (err) return done(err);
          if (isMatch) {
            // console.log("done");
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    function(jwtPayload, done) {
      return User.findOneById(jwtPayload.id)
        .then(user => {
          return done(null, user);
        })
        .catch(err => {
          return done(err);
        });
    }
  )
);

exports.isAuthenticated = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthenticated." });
  }
  return next();
};
