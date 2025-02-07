const express = require("express");
const multer = require("multer");
const { uploadMediaToCloudinary } = require("../../helper/cloudinary");
const {
  registerUser,
  loginUser,
  updateUser,
  updatePhotographer,
  getPhotographers,
  getPhotographer,
  registerAppointments,
  getUserAppointments,
  cancelAppointment,
} = require("../../controllers/auth-controller/index");
const authenticateMiddleware = require("../../middleware/auth-middleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/update',updateUser)
router.post('/update-portfolio',updatePhotographer)
router.post('/get-photographers',getPhotographers)  
router.get('/photographer/:id',getPhotographer)  
router.put('/register-appointments/:id',registerAppointments)  
router.get('/my-bookings/:id',getUserAppointments)  
router.delete('/cancel-appointment/:photographerId/:userId',cancelAppointment)  
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
}); 

const upload = multer({ dest: "uploads/" }); // Temp directory for uploads

// Endpoint to handle image upload
router.post("/updateImage", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMediaToCloudinary(req.file.path);
    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Error in /auth/updateImage:", error);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
});
router.get("/check-auth", authenticateMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    data: {
      user,
    },
  });
});

module.exports = router;
