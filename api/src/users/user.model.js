const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: {
      type: String,
      validate: [
        async username => !(await User.exists({ username })),
        "Username is already taken."
      ]
    },
    email: {
      type: String,
      validate: [
        async email => !(await User.exists({ email })),
        "Email is already taken."
      ]
    },
    password: String,
    balance: { type: Number, default: 0 },
    emailVerificationToken: String,
    emailVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  // console.log(candidatePassword, cb, this.password);
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
