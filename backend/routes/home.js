const express = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay')
const shortid = require('shortid')
const nodemailer = require('nodemailer');
const ParkingSpace = require('../models/Parkingspace.models');
const BookingSpace = require('../models/Bookingspace.models');
const PaymentModel = require('../models/Payment.models');
require('dotenv').config();

const router = express.Router()
var useremail 

const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET
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
                                            name: user.name,
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
        
        useremail = user.email;
        return res.status(200).json({
          token,
          user: {
            id: user._id,
            isuser: user.isuser,
            email: user.email,
            name: user.name,
            contact: user.contact
          }
        });
      } 
      catch (e) {
        return res.status(200).json({ msg: e.message });
      }
      
   

});

router.post('/razorpay', async (req, res) => {
  console.log("//////")
  console.log(req.body)
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

router.post('/sendmail', async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({email});
    if (!user)
      return res.status(200).json({msg: 'User Account Does not exist'});
    var otp = Math.floor((Math.random() * 10000) + 1);
    otp = otp.toString();
    console.log(req.body)

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.PARKY_EMAIL_ID,
          pass: process.env.PARKY_EMAIL_PASS
        }
      });
      var mailOptions = {
        from: process.env.PARKY_EMAIL_ID,
        to: req.body.email,
        subject: 'OTP to reset Password',
        text: `\nYou have requested to reset your password of Parking Management System. Your One Time Confidential Password to reset your password is ${otp}\n`
      };
      
      await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            console.log("Email sent: " + info.response);
          return res.status(200).json({OTP: otp})
        }
      });
})


router.post("/resetpassword", async(req, res) => {
    const email = req.body.email;
    const user = await User.findOne({email});
    console.log(req.body)
    console.log(user)
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            user.password = hash
            user.save()
            return res.status(200).json({msg: "Password reseted successfully"})
        })
    })
})

router.post("/parkingspace/add", async(req, res) => {
    console.log(req.body)
    const newSpace = new ParkingSpace(req.body)
    newSpace.save()
        .then(space => {
            console.log("Saves sucessfully")
            return res.status(200).json({
                msg : "Parking Space details saved successfully"
              });
        })
        .catch(err => {
            console.log(err)
            return res.status(200).json({error : err})
        })
    
})

router.get("/bookaslot", async(req, res) =>{
  await ParkingSpace.find()
  .then(spaces => {
    res.status(200).json(spaces);
  }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

router.post("/profile/:email", async(req, res) =>{
  const email = req.params.email;
  
  const user = await User.findOne({email});
 
  return res.status(200).json({user})
})

router.get("/editprofile/:email", async(req, res) => {
  const email = req.params.email;
 
  const user = await User.findOne({email})
  
  return res.status(200).json({user})
})

router.post("/editprofile/:email", async(req, res) => {
  const email = req.params.email;
  const updated_user = await User.findOne({email})
  const email2 = req.body.email;
  console.log(email2)
  const existing_user = await User.findOne({email2})
  console.log(existing_user)
  if (existing_user)
    return res.status(400).json({msg: "User with given email already exists"})
  updated_user.email = req.body.email
  updated_user.contact = req.body.contact_no
  updated_user.name = req.body.name
  updated_user.save()
  return res.status(200).json({updated_user})
})

router.delete("/deleteaccount/:email", async(req, res) => {
  const email = req.params.email;
  await ParkingSpace.deleteMany({email})
  .then(spaces => {
    console.log("Spaces deleted")
  })
  .catch(err => {console.log(err)})
  await User.findOneAndDelete({email})
  .then(res.status(200).json({status: 'ACCOUNT_DELETED',}))
  .catch(err => res.status(400).json({err}))
})

router.post("/bookspace", async(req, res) => {
  console.log(req.body)
  const BookedSpace = new BookingSpace(req.body)
    BookedSpace.save()
        .then(space => {
            console.log("Saves sucessfully")
            return res.status(200).json({
                msg : "Space Booked"
              });
        })
        .catch(err => {
            console.log(err)
            return res.status(200).json({error : err})
        })
  await ParkingSpace.findById(req.body.booked_space_id)
  .then(bookedspace => {
      console.log(bookedspace)
      bookedspace.spacenumber = bookedspace.spacenumber - req.body.no_of_booked_spaces
      bookedspace.save()
      .then(space => {
        console.log(space)
      })
  })
    const email = req.body.email;
    const user = await User.findOne({email});
    if (!user)
      return res.status(200).json({msg: 'User Account Does not exist'});
      
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.PARKY_EMAIL_ID,
          pass: process.env.PARKY_EMAIL_PASS
        }
      });
      var mailOptions = {
        from: process.env.PARKY_EMAIL_ID,
        to: req.body.email,
        subject: 'Parky - Booking Confirmed',
        html: `<html><body><br>Dear ${user.name},<p><br>Hurray!!! You have successfully booked Parking Space at ${req.body.address}.<br><br>Please read details of your Booking below.<br>Date - ${req.body.date}<br>Arrival Time - ${req.body.arrival_time}<br>Departure Time - ${req.body.departure_time}<br>Booking Price - ${req.body.price}<br>Payment Method - Prepaid<br><br>To avoid any inconvenience Please reach 10 min before ${req.body.arrival_time}<br><br>Thanks and Regards,<br>Parky</p></html></body>`
      };
      
      await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            console.log("Email sent: " + info.response);
          return res.status(200).json({OTP: otp})
        }
      });
})

router.get("/bookinghistory/:email", async(req, res) =>{
  const email = req.params.email
  await BookingSpace.find({email})
  .then(spaces => {
   
    return res.status(200).json({spaces})
  })
})

router.get("/myspaces/:email", async(req, res) =>{
  const email = req.params.email
  await ParkingSpace.find({email})
  .then(myspaces => {
   
    return res.status(200).json({myspaces})
  })
})

router.delete("/deleteparkingspace/:id", async(req, res) => {
 
  const id = req.params.id;
  console.log(id)
  await ParkingSpace.findByIdAndDelete(id)
  .then(res.status(200).json({status: 'Parking Space_DELETED',}))
  .catch(err => res.status(400).json({err}))
})

router.get("/editparkingspace/:id", async(req, res) => {
  const id = req.params.id;
  await ParkingSpace.findById(id)
  .then(space => {
    console.log(space);
    return res.status(200).json({space})
  })
  .catch(err => res.status(400).json({err})) 
  
})

router.post("/editparkingspace/:id", async(req, res) => {
  const id = req.params.id;
  await ParkingSpace.findByIdAndUpdate(id, req.body)
  .then(res.status(200).json({status: 'Successfully Updated',}))
  .catch(err => res.status(400).json({err}))
  
})

router.post("/savepaymentdetails", async(req, res)=>{
  const Payment = new PaymentModel(req.body)
  Payment.save()
        .then(payment => {
            console.log("Saved sucessfully")
            return res.status(200).json({
                msg : "Payment Done"
              });
        })
        .catch(err => {
            console.log(err)
            return res.status(200).json({error : err})
        })
})

router.post("/cancelorder/:id", async(req, res) => {
  const id = req.params.id
  console.log(id)
  space = await BookingSpace.findById(id);
  space.order_status = "Cancelled";
  space.save();
  console.log(space)
  // .catch(err => res.status(400).json({err})) 

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.PARKY_EMAIL_ID,
      pass: process.env.PARKY_EMAIL_PASS
    }
  });
  var mailOptions = {
    from: process.env.PARKY_EMAIL_ID,
    to: space.email,
    subject: 'Parky - Booking Confirmed',
    html: `<html><body><br>Dear User,<p><br>Your parking order at ${space.address} was cancelled by you. The Refund Amount of Rs ${space.price - 20} will be provided to you in your Original Payment Method within 24 hrs.<br><br>Refund Details : <br><br>Order Price - Rs ${space.price}<br>Cancellation Charges - Rs 20<br>Refund Amount - Rs ${space.price - 20}<br><br>Thank You for using Parky.<br><br>Thanks and Regards,<br>Parky</p></html></body>`
  };
  
  await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
        console.log("Email sent: " + info.response);
    }
  });

  return res.status(200).json({status: 'Booking Canceled'})
})

router.delete("/deleteorder/:id", async(req, res) => {
  const id = req.params.id
  var space = await BookingSpace.findByIdAndDelete(id);
  space.save();
  return res.status(200).json({status: 'Order Deleted'})
})

module.exports = router;
