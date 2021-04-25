const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const fileUpload = require('express-fileupload');
const homeRouter = require('./routes/home');
const path = require('path');
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(cors({credentials: true, origin: true}));

app.use("/", homeRouter);




const Port = 3001;
const URI = process.env.DB_URI;

const connectDB = async() => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false 
    })
    console.log("database connected");
};

connectDB();

app.listen(Port, () => {
    console.log("Server started at port 3001");
});


