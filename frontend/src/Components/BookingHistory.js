import React, { Component } from 'react';
import NavigationBar from './Navigationbar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from 'axios';
import { Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        axios.post("http://localhost:3001/cancelorder/" +spaceid)
        .then(res => {
           window.location.reload(false)
           toast.success("Booking Cancelled")
           
        })
        .catch(err => console.log(err))
    }

    deleteHandler = (spaceid) => {
        
        if (window.confirm("Do you want to delete Order?")) {
            axios.delete("http://localhost:3001/deleteorder/" +spaceid)
            .then(res => {
            window.location.reload(false)
                console.log(res.data.status)
                toast.success("Order Deleted")
            
            })
            .catch(err => console.log(err))
        }
    }

    orderStatus = (space) => {
        if (space.order_status == "Cancelled")
            return "Cancelled"
        var startTime = new Date(space.arrival_date.split('T')[0] + ' ' + space.arrival_time)
        if (startTime > new Date())
            return "Confirmed"
        else
            return "Completed"
    }

    render() {
        return (
            <div style={{backgroundImage: `url("https://www.carrentalscript.com/wp-content/uploads/powerful-online-car-and-taxi-booking-software.jpg")`, backgroundSize: "cover", backgroundRepeat:'repeat-y', height: "100", minHeight:"100vh", fontFamily: "Muli-SemiBold", fontSize: "20px"}}>
                <NavigationBar />
                <div >
                    <center>
                    <h1 className="mt-5">Booking Details</h1>
                    </center>
                    <div className="mt-6" style={{marginLeft: "10%", marginRight: "10%"}} >
                    <hr style={{backgroundColor: "black"}}></hr>
                    <div className ="row mt-3">
                        <div className="col-sm">
                            Order No
                        </div>
                        <div className="col-sm">
                        Address
                        </div>
                        <div className="col-sm">
                        Order Amount
                        </div>
                        <div className="col-sm">
                        Booking Date and Time
                        </div>
                        <div className="col-sm">
                           Order Status
                        </div>
                        <div className="col-sm">
                           Directions
                        </div>
                        <div className="col-sm">
                           Options
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
                        {this.orderStatus(space) === "Cancelled" && <div>{space.price} (Refund - {space.price - 20})</div>}
                        {(this.orderStatus(space) === "Confirmed" || this.orderStatus(space) === "Completed") && space.price}
                        </div>
                        <div className="col-sm">
                        {space.arrival_date.split('T')[0]} {space.arrival_time} - {space.departure_date.split('T')[0]} {space.departure_time}
                        </div>
                        <div className="col-sm">
                            {this.orderStatus(space)}
                        </div>
                        <div className="col-sm">
                        <form action="http://maps.google.com/maps" method="get" target="_blank">
                            <div >
                                <input type="hidden" name="daddr" value={space.address} />
                                <button type="button" className="btn btn-primary" type="submit">Get Directions</button>
                            </div>
                        </form>
                        
                        </div>
                        <div className="col-sm">
                            {(this.orderStatus(space) === "Cancelled" || this.orderStatus(space) === "Completed") &&
                                <Button color="primary" data-toggle="modal" onClick = {() => {this.deleteHandler(space._id)}} >Delete Order</Button>
                            }
                            {this.orderStatus(space) === "Confirmed" &&
                                <Button color="primary" data-toggle="modal" data-target="#exampleModal" >Cancel Order</Button>
                            }
                        </div> 
                        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirm Cancellation!!!</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{marginLeft: "20%"}}>
                            Order Price: Rs {space.price}<br/>
                            Cancellation Charges: Rs 20<br/>
                            Refund Amount: {space.price - 20}<br/><br/>
                            <p className="text-muted">Refund will be credited to your Original Payment Method within 24hrs</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick = {() => {this.cancelBookingHandler(space._id)}} className="btn btn-primary">Confirm</button>
                        </div>
                        </div>
                    </div>
                </div>   
                        </div>
                        
                        
                    ))}
                   </div>
                    
                </div>
                <div className="mt-5">
                <Footer />
                </div>
                <ToastContainer position={toast.POSITION.TOP_CENTER}/>
            </div>
        )
    }
    
} 