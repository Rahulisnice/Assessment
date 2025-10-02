import User from "../models/userModel.js";

//create
export const createData = async (req, res) => {
  try {
    const { firstname, lastname, phone, email } = req.body;
    if (!firstname || !lastname || !phone || !email) {
      return res.status(500).send({
        success: false,
        message: "please provide complete details",
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

    const detail = new User({
      firstname,
      lastname,
      phone,
      email,
      owner: req.userId,
    });
    const result = await detail.save();
    res.status(201).send({
      success: true,
      message: "your data has been created",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succsss: false,
      message: "error in create create api",
    });
  }
};

//delete
export const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "no record found in this id",
      });
    }

    const data = await User.findByIdAndDelete({ _id: id, owner: req.userId });
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "no data found",
      });
    }
    res.status(200).send({
      success: true,
      message: "your record has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete delete api",
    });
  }
};

//update
export const UpdateData = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "please provide data id",
      });
    }
    const data = req.body;

    const updated = await User.findByIdAndUpdate(
      { _id: id, owner: req.userId },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).send({
        success: false,
        message: "No record found with this ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "your data is updated",
      updated,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).send({
        success: false,
        message: `Duplicate field value entered: ${JSON.stringify(
          error.keyValue
        )}`,
      });
    }

    res.status(500).send({
      success: false,
      message: "error in update api",
    });
  }
};

// get all
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ owner: req.userId });
    res.status(200).send({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error fetching users" });
  }
};
