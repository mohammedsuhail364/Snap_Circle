require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes");


const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


app.use(
    cors({
      origin:['http://localhost:5173', "https://lms-j8i4.onrender.com","https://mohammedsuhail364.github.io/LMSClient/"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
  );

app.use(express.json());

app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({
        success:false,
        message:"Something went wrong"
    })
})

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("mongodb is connected successfully"))
    .catch((e)=>console.log(e));


app.use('/auth',authRoutes)


app.listen(PORT,()=>{
    console.log(`Server is now running on port ${PORT}`);
    
})