const User = require("../models/user");
const { jwtGenerator } = require("../utils/jwtGenerator");

// handle errors
const handleErrors = (err) => {
  let error = { username: "", password: "", general: "" };
  console.log(err.message, err.code);

  // incorrect credentials
  if (err.message === "incorrect credentials") {
    error.general = "Incorrect credentials.";
  }

  // duplicate key errors
  if (err.code === 11000) {
    error.username = "Username is already registered.";
  }

  // validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

module.exports.signupUser = async (req, res) => {
  let ctx = req.body;

  const user = new User({
    username: ctx.username,
    password: ctx.password,
  });

  try {
    await user.save();
    let sendableUser = { username: user.username };
    const token = jwtGenerator(sendableUser);
    res.status(201).json({ user: sendableUser, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports.loginUser = async (req, res) => {
  let ctx = req.body;

  try {
    const user = await User.login(ctx.username, ctx.password);
    let sendableUser = { username: user.username };
    const token = jwtGenerator(sendableUser);
    res.status(200).json({ user: sendableUser, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports.logoutUser = (req, res) => {};
