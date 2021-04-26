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


const Port = process.env.PORT || 3001;
const URI = process.env.DB_URI;

const connectDB = async() => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false 
    })
    console.log("database connected");
};

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

app.use("/", homeRouter);

connectDB();

app.listen(Port, () => {
    console.log("Server started at port 3001");
});


