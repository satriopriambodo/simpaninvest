const { User } = require("../models");
const bcrypt = require("bcrypt");
const { token } = require("../helpers/jwt");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const response = await User.create({
      username,
      email,
      password: password,
    });
    res.status(201).json({
      id: response.id,
      username: response.username,
      email: response.email,
    });
  } catch (error) {
    console.log(error);
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      error.errors.forEach((el) => {
        errMsgs = el.message;
      });
      res.status(400).json({
        code: 400,
        status: "failed",
        message: errMsgs,
        data: [],
      });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw { name: "Bad Request" };
    }

    const response = await User.findOne({ where: { email } });
    if (!response) {
      throw { name: "Unauthorized" };
    }

    const isValid = bcrypt.compareSync(password, response.password);
    if (!isValid) {
      throw { name: "Unauthorized" };
    }

    const payload = {
      id: response.id,
      email: response.email,
    };
    const role = response.role;
    const userEmail = response.email;
    res.status(200).json({
      access_token: token(payload),
      userRole: role,
      userEmail: userEmail,
    });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      (errorCode = 400), (msg = error.errors.map((el) => el.message));
    } else if (error.name === "Bad Request") {
      res.status(400).json({
        code: 400,
        status: "failed",
        message: "Email and Password cannot be blank",
        data: [],
      });
    } else if (error.name === "Unauthorized") {
      res.status(400).json({
        code: 400,
        status: "failed",
        message: "Wrong email or password",
        data: [],
      });
    }
  }
};

module.exports = { register, login };
