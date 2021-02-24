const express = require("express");
const mongoose = require("mongoose");


const app = express();

const Port = 3001;
const URI = "mongodb+srv://manish:Pass@1234@cluster0.kzjdx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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