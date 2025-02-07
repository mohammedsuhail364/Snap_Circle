const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { uploadMediaToCloudinary } = require("../../helper/cloudinary");
const Photographer = require("../../models/Photographer");

const registerUser = async (req, res) => {
  const { userName, userEmail, password, role } = req.body;
  const existingUser = await User.findOne({
    $or: [{ userEmail }, { userName }],
  });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User name or user email already exists",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    userName,
    userEmail,
    role,
    password: hashPassword,
  });
  await newUser.save();
  const newPhotoGrapher = new Photographer({
    email: userEmail,
  });
  await newPhotoGrapher.save();
  return res.status(201).json({
    success: true,
    user: newUser,
    photographer: newPhotoGrapher,
  });
};
const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;
  const checkUser = await User.findOne({ userEmail });
  const checkPhotographer = await Photographer.findOne({ email: userEmail });
  if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
  const accessToken = jwt.sign(
    {
      _id: checkUser._id,
      userName: checkUser.userName,
      userEmail: checkUser.userEmail,
      role: checkUser.role,
    },
    "JWT_SECRET",
    { expiresIn: "120m" }
  );

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken,
      user: checkUser,
      photographer: checkPhotographer,
    },
  });
};

const updateUser = async (req, res) => {
  const { name, email, dob, gender, contactNumber, address } = req.body;
  let profilePicture = req.body.profilePicture;

  try {
    // If a file is uploaded, process it
    if (req.file) {
      console.log("Uploading profile picture to Cloudinary...");
      const result = await uploadMediaToCloudinary(req.file.path);
      profilePicture = result.secure_url; // Update profilePicture with Cloudinary URL
    }

    // Update user in the database
    const userUpdate = await User.findOneAndUpdate(
      { userEmail: email }, // Query by email
      {
        userName: name,
        userEmail: email,
        dob,
        gender,
        profilePicture,
        contactNumber,
        address,
      },
      { new: true } // Return the updated document
    );

    if (!userUpdate) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: userUpdate,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating user",
    });
  }
};
const updatePhotographer = async (req, res) => {
  const {
    profilePicture,
    samplePhotos,
    name,
    specialization,
    fees,
    address,
    locality,
    availability,
    updatedUniquePhoto,
    email,
  } = req.body;
  const checkPhotographer = await Photographer.findOneAndUpdate(
    { email },
    {
      profilePicture,
      samplePhotos,
      name,
      specialization,
      fees,
      address,
      locality,
      availability,
      uniquePhoto: updatedUniquePhoto,
    },
    { new: true }
  );
  if (!checkPhotographer) {
    return res.status(404).json({
      success: false,
      message: "photographer not found",
    });
  }
  return res.status(200).json({
    success: true,
    photographer: checkPhotographer,
  });
};

const getPhotographers = async (req, res) => {
  try {
    const allPhotographers = await Photographer.find(); // Await the result of the query

    if (!allPhotographers || allPhotographers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No photographers found",
      });
    }

    return res.status(200).json({
      success: true,
      photographers: allPhotographers,
    });
  } catch (error) {
    // Handle any errors that occur during the query
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching photographers",
      error: error.message, // Provide error details for debugging
    });
  }
};

const getPhotographer = async (req, res) => {
  const { id } = req.params;
  const photographer = await Photographer.findById(id);
  if (!photographer) {
    return res.status(401).json({
      success: false,
      message: "photographer not found",
    });
  }
  return res.status(200).json({
    success: true,
    photographer,
  });
};

const registerAppointments = async (req, res) => {
  try {
    const {
      name,
      location,
      functionType,
      selectedDate,
      session,
      photographerName,
      userId,
    } = req.body;
    const { id } = req.params;

    // Find the photographer by ID
    const photographer = await Photographer.findById(id);
    const photographerFees = photographer.fees;
    const photographerImage = photographer.profilePicture;
    const user = await User.findById(userId);

    if (!photographer) {
      return res.status(404).json({
        success: false,
        message: "Photographer not found",
      });
    }

    // Add the appointment to the appointments array
    photographer.appointments.push({
      name,
      location,
      functionType,
      selectedDate,
      session,
    });

    // Save the updated document to the database
    await photographer.save();

    user.myAppointments.push({
      location,
      selectedDate,
      session,
      photographerFees,
      photographerImage,
      photographer:photographer._id,
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Successfully added appointment",
    });
  } catch (error) {
    console.error("Error adding appointment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getUserAppointments = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user Not found",
      });
    }

    const userAppointments = user.myAppointments;
    return res.status(200).json({
      success: true,
      myAppointments: userAppointments,
    });
  } catch (error) {
    console.log(error);
  }
};
  
const cancelAppointment = async (req, res) => {
  try {
    const { photographerId,userId } = req.params; // Photographer's ID
    const { index1,date } = req.body; // Appointment date to cancel

    
    
    // Find the photographer by ID
    const photographer = await Photographer.findById(photographerId);
    const user=await User.findById(userId)

    // Validate if photographer exists
    if (!photographer) {
      return res.status(404).json({ success: false, message: "Photographer not found" });
    }
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const newMyAppointments=user.myAppointments.filter((_,index)=>index !==index1)
    user.myAppointments=newMyAppointments;
    await user.save();

    const newAppointments=photographer.appointments.filter((item)=>item.selectedDate !== date)
    photographer.appointments=newAppointments;
    await photographer.save();
    
    // Respond with success
    res.status(200).json({
      success: true,
      message: "Appointment canceled successfully",
      appointments: user.myAppointments, // Optional: Return updated appointments
    });
  } catch (error) {
    console.error("Error canceling appointment:", error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};



module.exports = {
  registerUser,
  loginUser,
  updateUser,
  updatePhotographer,
  getPhotographers,
  getPhotographer,
  registerAppointments,
  getUserAppointments,
  cancelAppointment
};
