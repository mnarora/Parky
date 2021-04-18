import React, { Component } from 'react';
import NavigationBar from './Navigationbar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from 'axios';

export default class BookingHistory extends Component {

    state = {
        booked_spaces: []
    }
   
    componentDidMount() {
        if (sessionStorage.useremail) {
            this.setState({email:sessionStorage.useremail});
            
            
            axios.get('http://localhost:3001/bookinghistory/' + sessionStorage.useremail)
            .then(res => {
               
                this.setState({
                   booked_spaces: res.data.spaces
                })

                //console.log(this.state.booked_spaces[0].address);
                
            })

           
        }
        else{
            console.log("No user")
        }
    }

    render() {
        return (
            <div style={{backgroundImage: `url("https://www.carrentalscript.com/wp-content/uploads/powerful-online-car-and-taxi-booking-software.jpg")`, backgroundSize: "cover",height: "100vh", fontFamily: "Muli-SemiBold", fontSize: "20px"}}>
                <NavigationBar />
                <div >
                    <center>
                    <h1 className="mt-5">Booking Details</h1>
                    </center>
                    <div className="container mt-5" >

                    <div className ="row mt-3">
                        <div className="col-sm-2 mt-4">
                            Order No
                        </div>
                        <div className="col-sm-2 mt-4">
                        Address
                        </div>
                        <div className="col-sm-1 mt-4">
                        Price
                        </div>
                        <div className="col-sm-1 mt-4">
                        Date
                        </div>
                        <div className="col-sm-2 mt-4">
                           Time
                        </div>
                        <div className="col-sm-2 mt-4">
                           Order Status
                        </div>
                        <div className="col-sm-2 mt-4">
                           Directions
                        </div>
                    </div>
                    <hr style={{backgroundColor: "black"}}></hr>
                    {this.state.booked_spaces.map((space, index) => (
                        
                            <div className ="row mt-3" style={{backgroundColor: "white", height: "11vh"}}>
                                <div className="col-sm-2 mt-4">
                            {index+1}
                        </div>
                        <div className="col-sm-2 mt-4">
                        {space.address}
                        </div>
                        <div className="col-sm-1 mt-4">
                        {space.price}
                        </div>
                        <div className="col-sm-1 mt-4">
                        {space.date.split('T')[0]}
                        </div>
                        <div className="col-sm-2 mt-4">
                        {space.arrival_time}-{space.departure_time}
                        </div>
                        <div className="col-sm-2 mt-4">
                           Completed
                        </div>
                        <div className="col-sm-2 mt-4">
                        <form action="http://maps.google.com/maps" method="get" target="_blank">
                            <div >
                                <input type="hidden" name="daddr" value={space.address} />
                                <button type="button" class="btn btn-primary" type="submit">Get Directions</button>
                            </div>
                        </form>
                        </div>
                        </div>
                    ))}
                   </div>
                    
                </div>
            </div>
        )
    }
    
} 