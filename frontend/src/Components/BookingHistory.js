import React, { Component } from 'react';
import NavigationBar from './Navigationbar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from 'axios';
import { Button } from 'reactstrap';
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    cancelBookingHandler = (spaceid) =>{
        console.log(spaceid)
        axios.delete("http://localhost:3001/cancelorder/" +spaceid)
        .then(res => {
           window.location.reload(false)
            console.log(res.data.status)
           
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div style={{backgroundImage: `url("https://www.carrentalscript.com/wp-content/uploads/powerful-online-car-and-taxi-booking-software.jpg")`, backgroundSize: "cover", backgroundRepeat:'repeat-y', height: "100vh", fontFamily: "Muli-SemiBold", fontSize: "20px"}}>
                <NavigationBar />
                <div >
                    <center>
                    <h1 className="mt-5">Booking Details</h1>
                    </center>
                    <div className="container mt-6" >

                    <div className ="row mt-3">
                        <div className="col-sm">
                            Order No
                        </div>
                        <div className="col-sm">
                        Address
                        </div>
                        <div className="col-sm">
                        Price
                        </div>
                        <div className="col-sm">
                        Date
                        </div>
                        <div className="col-sm">
                           Time
                        </div>
                        <div className="col-sm">
                           Order Status
                        </div>
                        <div className="col-sm">
                           Directions
                        </div>
                        <div className="col-sm">
                           Cancel Booking
                        </div>
                    </div>
                    <hr style={{backgroundColor: "black"}}></hr>
                    {this.state.booked_spaces.reverse().map((space, index) => (
                            <div className ="row mt-3" style={{backgroundColor: "white", padding: "10px"}}>
                                <div className="col-sm">
                            {index+1}
                        </div>
                        <div className="col-sm">
                        {space.address}
                        </div>
                        <div className="col-sm">
                        {space.price}
                        </div>
                        <div className="col-sm">
                        {space.date.split('T')[0]}
                        </div>
                        <div className="col-sm">
                        {space.arrival_time}-{space.departure_time}
                        </div>
                        <div className="col-sm">
                           Completed
                        </div>
                        <div className="col-sm">
                        <form action="http://maps.google.com/maps" method="get" target="_blank">
                            <div >
                                <input type="hidden" name="daddr" value={space.address} />
                                <button type="button" class="btn btn-primary" type="submit">Get Directions</button>
                            </div>
                        </form>
                        
                        </div>
                        <div className="col-sm">
                            
                           <Button color="primary" onClick = {() => {this.cancelBookingHandler(space._id)}}><FontAwesomeIcon icon= {faWindowClose}/> </Button>{' '}
                        </div>    
                        </div>
                    ))}
                   </div>
                    
                </div>
                <div className="mt-5">
                <Footer />
                </div>
            </div>
        )
    }
    
} 