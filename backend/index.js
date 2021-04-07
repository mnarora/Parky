const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const homeRouter = require('./routes/home');
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(cors({credentials: true, origin: true}));

app.use("/", homeRouter);




const Port = 3001;
const URI = process.env.DB_URI;

const connectDB = async() => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    console.log("database connected");
};

connectDB();

app.listen(Port, () => {
    console.log("Server started at port 3001");
});


