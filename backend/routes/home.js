const express = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay')
const shortid = require('shortid')

const router = express.Router()

const razorpay = new Razorpay({
	key_id: 'rzp_test_4z2vw67s30xv3b',
	key_secret: 'xXsnlR6bo0TQd86ya5j7yjd7'
})


router.get("/", (req, res) => {
    return res.send("In / func");
})


router.post('/userregistration', async (req, res) => {
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

router.post("/login",async (req, res) => {
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
      
   

});

router.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	const amount = 1
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})

module.exports = router;