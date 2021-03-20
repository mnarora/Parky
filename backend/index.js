const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const homeRouter = require('./routes/home');

const app = express();

app.use(express.json());
app.use(cors({credentials: true, origin: true}));

app.use("/", homeRouter);




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


