const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const auth = require('./middleware/auth');
const jwt = require('jsonwebtoken');
var cors = require('cors');



const app = express();
app.use(express.json());
app.use(cors());

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

app.get("/", (req, res) => {
    return res.send("In / func");
})

app.post('/userregistration', (req, res) => {
    const { email } = req.body;
    User.findOne({email}) 
        .then(user => {
            if(user)
                return res.status(400).json({msg: "User already exists"});
            const newUser = new User({
                ...req.body
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    // if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign( 
                                {id:user.id},
                                "sl_myJwtSecret",
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    console.log(token);
                                    return res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.uname,
                                            email: user.email
                                        }    
                                    });
                                }
                            )
                        });
                });
            });
        });
    
    
});


app.post("/userlogin", (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    
    User.findOne({email}) 
        .then(user => {
            if(!user)
                return res.status(400).json({msg: 'User doesnt exist'});

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({msg: 'invalid credentials'});
                    //else return res.send("logged in")
                });

                jwt.sign( 
                    {id:user.id},
                    "sl_myJwtSecret",
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        console.log(token);
                        return res.json({
                            token,
                            user: {
                                id: user.id,
                                email: user.email,
                                isuser: user.isuser
                            }    
                        });
                    }
                )
        }) 


});