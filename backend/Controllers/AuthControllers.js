const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const UserModel = require("../Models/User");
const { hashPassword } = require("../HashPassowrds");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exist, you can login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "Signup successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server errror",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Success",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server errror",
      success: false,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const alldata = await UserModel.find();
    return res.status(200).json({
      message: " All successfully",
      success: true,
      alldata,
    });
  } catch (error) {}
};
const getUsersiD = async (req, res) => {
  try {
    const alldata = await UserModel.findById(req.params.userId);
    return res.status(200).json({
      message: " Get SigleUser successfully",
      success: true,
      alldata,
    });
  } catch (error) {}
};
const deleteUsers = async (req, res) => {
  try {
    const alldata = await UserModel.findByIdAndDelete(req.params.DeleteuserId);
    return res.status(200).json({
      message: " Delete successfully",
      success: true,
      alldata,
    });
  } catch (error) {}
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    const errorMsgemail = "user Not Existed";
    if (!user) {
      return res.status(400).json({ message: errorMsgemail, success: false });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    const link = `http://localhost:3010/auth/resetPassword/${user._id}/${jwtToken}`;
    console.log(link);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,

      auth: {
        user: "rambabukovvuri93@gmail.com",
        pass: "myerndxsztzsyekb",
      },
    });

    const receiver = {
      from: "rambabukovvuri0@gmail.com",
      to: email,
      subject: "Reset Your password",
      text: `http://localhost:3010/auth/reset-password/${user._id}/${jwtToken}`,
    };
    await transporter.sendMail(receiver);
    return res.status(200).json({
      message: "Password reset link send successfully on your gmail account",
      success: true,
      // link
    });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id, jwtToken } = req.params;
    console.log(id);

    const { password } = req.body;

    if (!password) {
      return res.status(400).send({ message: "Please provide password" });
    }

    const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);

    const user = await UserModel.findOne({ email: decode.email, });

    const newhashPassword = await hashPassword(password);

    user.password = newhashPassword;
    await user.save();

    return res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const resetGetPassword1 = async (req, res) => {
  const { id, jwtToken } = req.params;
  console.log(req.params);
  const oldUser = await UserModel.findOne({ id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  try {
    const verify = jwt.verify(jwtToken, process.env.JWT_SECRET);
    res.send({ email: verify.email, status: "Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
};

module.exports = {
  signup,
  login,
  getUsers,
  getUsersiD,
  deleteUsers,
  forgotPassword,
  resetPassword,
  resetGetPassword1,
  // changePassword
};
