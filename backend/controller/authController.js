import userModel from "../models/authModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const generateToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//reggister
export const registerController = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password } = req.body;
    if (!firstname || !lastname || !email || !password || !phone) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    if (phone.length !== 10 || !/^[0-9]+$/.test(phone)) {
      return res.status(400).send({
        success: false,
        message: "Enter correct phone number (must be 10 digits)",
      });
    }

    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstname) && !nameRegex.test(lastname)) {
      return res.status(400).send({
        success: false,
        message: "Firstname and Lastname should contain only alphabets",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "user already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      firstname,
      lastname,
      phone,
      email,
      password: hashedPassword,
    });
    const token = generateToken(newUser._id);

    await newUser.save();
    res.status(201).send({
      success: true,
      message: "user register successfully",
      user: {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        phone: newUser.phone,
        email: newUser.email,
        password: newUser.password,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

//login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user does't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "invalid credentials",
      });
    }

    const token = generateToken(user._id);
    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (error) {
    console.log(error);
    res.status().send({
      success: false,
      message: " Error in login api",
      error,
    });
  }
};
