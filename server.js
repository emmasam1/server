require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require("cookie-parser");


const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Routes
app.use("/public",express.static(__dirname+'/'+'public'))
app.use('/', require('./routes/routes'))



// Connect to mongodb
const connect = async () => {
    try {
      await mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Hand shake estalished");
    } catch (error) {
      console.log(error);
    }
  };
  
  const PORT = process.env.PORT || 4000;
  
  app.listen(PORT, () => {
    connect();
    console.log(`Server is runing on port ${PORT}`);
  });