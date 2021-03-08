const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const auth = require('./middleware/auth');
const jwt = require('jsonwebtoken');
var cors = require('cors');



const app = express();
app.use(express.json());
app.use(cors({credentials: true, origin: true}));

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

app.post('/userregistration', async (req, res) => {
    const { email } = req.body;
    await User.findOne({email}) 
        .then(user => {
            if(user)
                return res.status(200).json({msg: "User already exists"});
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


app.post("/userlogin",async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    
      try {
        // Check for existing user
        const user = await User.findOne({ email });
        if (!user) return res.status(200).json({msg:"User does not exist"});
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(200).json({msg:"Invalid Credentials"});
    
        const token = jwt.sign({ id: user._id }, "sl_myJwtSecret", { expiresIn: 3600 });
        if (!token) throw Error('Couldnt sign the token');
        
    
        return res.status(200).json({
          token,
          user: {
            id: user._id,
            isuser: user.isuser,
            email: user.email
          }
        });
      } 
      catch (e) {
        return res.status(200).json({ msg: e.message });
      }
      
    // await User.findOne({email}) 
    //     .then(user => {
    //         if(!user)
    //             return res.status(400).json({msg: 'User doesnt exist'});

    //         bcrypt.compare(password, user.password)
    //             .then(isMatch => {
    //                 console.log(isMatch)
    //                 if (!isMatch) {
    //                     console.log(password)
    //                     console.log(user.password)
    //                     return res.status(401).json({msg:"Invalid Credentials"});

    //                 }
    //                 //else return res.send("logged in")
    //             });
    //             console.log("In jwt");
    //             jwt.sign( 
    //                 {id:user.id},
    //                 "sl_myJwtSecret",
    //                 { expiresIn: 3600 },
    //                 (err, token) => {
    //                     if (err) throw err;
    //                     console.log(token);
    //                     return res.json({
    //                         token,
    //                         user: {
    //                             id: user.id,
    //                             email: user.email,
    //                             isuser: user.isuser
    //                         }    
    //                     });
    //                 }
    //             )
    //     }) 


});