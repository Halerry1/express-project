const statusCodes = require("../constants/statusCodes");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    return res
      .status(statusCodes.missingParameters)
      .json({ error: "missing information" });
  } else {
    const hash = bcrypt.hashSync(password, 10);

    try {
      const user = new userModel({ email, username, password: hash });
      await user.save();

      return res.status(statusCodes.success).json({ message: "User saved" });
    } catch (error) {
      return res.status(statusCodes.queryError).json({ error: error.message });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(statusCodes.missingParameters)
      .json({ error: "missing information" });
  } else {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res
        .status(statusCodes.badRequest)
        .json({ message: "user not found" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(statusCodes.badRequest)
        .json({ message: "user not found" });
    }

    req.session.user = {
      _id: user._id,
    };

    const token = jwt.sign(
      { user: { id: user._id, email: user.email } },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.status(statusCodes.success).json({ token });
  }
};

const logout = async (req, res) => {
  if (req.session.user) {
    delete req.session;

    return res.status(statusCodes.success).json({ message: "Disconnected" });
  }

  return res
    .status(statusCodes.badRequest)
    .json({ message: "No session found" });
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.session.user._id);

    return res.status(statusCodes.success).json(user);
  } catch (error) {
    return res.status(statusCodes.queryError).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getUser,
};
