# Parking Management System  

## Overview  
Parking Management System is a web app built using MERN stack. This will provide users with a better interactive UI. The user data will be saved in the database once registered. This parking management system will help patrons to easily locate and secure a vacant parking space at any car park deemed convenient to them.If the slot is booked then patron will be redirected to some nearby parking place in the same area. Booking charges can be done prior while will help to solve the problem of cash on delivery. If patrons cancels his/her booking refund will be provided by deducting some cancelation charges. So this web app will help to reduce major traffic problems in the city.  

**Deployed Link**
https://parky.herokuapp.com/  

**How to Run the Application Locally?**  
1. Create .env file in backend/ directory. It should look like :  
```
DB_URI=     # create mongoDb database and paste your link here  
NODE_ENV=development  
PARKY_EMAIL_ID=       # create a gmail account and paste your email id here  
PARKY_EMAIL_PASS=     # password of your gmail account  
PORT=3000  
RAZORPAY_KEY_ID=      # create razorpay account and paste your key id here  
RAZORPAY_KEY_SECRET=      # create razorpay account and paste your key secret here  
SMTP_HOST=smtp-relay.sendinblue.com  
SMTP_PORT=587  
```

2. Create .env file in frontend/ directory. It should look like :  
```
REACT_APP_BACKEND=http://localhost:3000/  
REACT_APP_MAPS_API=         # activate google maps api in google cloud platform and paste your key here  
```

3. Run Backend by :  
```
cd backend
npm install
nodemon index.js
```

4. Run Frontend by :
```
cd frontend
npm install
npm start
```  

## Tech Stack
*Frontend*  
&emsp; React.Js  
*Backend*  
&emsp; Express.Js  
&emsp; Node.Js  
*Database*  
&emsp; MongoDb  
*API*  
&emsp; RazorPay API for Payment  
&emsp; Google Maps API for booking parking space  

## Features of Parky
* The users should be able to create an account on the website, they can be an owner or rentee.
* The users should be able to change the password.
* The owners of the parking space should be able to update the availability of the space.
* Rentee should be able to enter the location and see if there are any available spots for parking and book the space.			
* If a particular space is unavailable the web app should be able to suggest another space which is available nearby.
* Rentee should be able to book a space by completing an online transaction.

## User Classes and Characteristics
*Admin* manages the rentees and parking space owner. He is responsible for verifying the parking space, for development purposes and managing the database.  
*Parking space owners* add the parking area and keep account of availability of parking space in that particular area. He is also responsible for keeping the records of incoming and outgoing vehicles at that particular parking area.  
*Rentee* can book the parking space in a particular area. They can also pay the owner in advance for that parking space.

## User Interface  
<p float="left">
  <img src="https://github.com/mnarora/Parky/blob/main/Report/rentee_registration.png" width="49%" />
  <img src="https://github.com/mnarora/Parky/blob/main/Report/search_space.png" width="49%" /> 
  <img src="https://github.com/mnarora/Parky/blob/main/Report/dispay_space.png" width="49%" />
  <img src="https://github.com/mnarora/Parky/blob/main/Report/checkout.png" width="49%" /> 
  <img src="https://github.com/mnarora/Parky/blob/main/Report/booking_details.png" width="49%" /> 
</p>


Please Refer [Report.pdf](https://github.com/mnarora/Parky/blob/main/Report/Report.pdf) for more details.  

<a href="https://github.com/mnarora/Parky/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/mnarora/Parky?color=2b9348"></a>
