import React, { Component } from 'react';
import NavigationBar from './Navigationbar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

export default class BookingHistory extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <div className="container">
                    <center>
                    <h1 className="mt-5">Booking Details</h1>
                    </center>
                    <div className="history">
                        <div className ="row mt-5" style={{backgroundColor: "mediumturquoise", height: "11vh"}}>
                            <div className="col-sm-3 mt-4 ml-5">
                            Jangali Maharaj Parking, Shivaji Nagar Pune
                            </div>
                            <div className="col-sm-1"></div>
                            <div className="col-sm-2 mt-4">
                            Rs 120
                            </div>
                            <div className="col-sm-2 mt-4">
                            12/04/2021
                            </div>
                            <div className="col-sm-2 mt-4">
                                5pm to 8pm
                            </div>
                        </div>
                        <div className ="row mt-3" style={{backgroundColor: "mediumturquoise", height: "11vh"}}>
                            <div className="col-sm-3 mt-4 ml-5">
                            Jangali Maharaj Parking, Shivaji Nagar Pune
                            </div>
                            <div className="col-sm-1"></div>
                            <div className="col-sm-2 mt-4">
                            Rs 120
                            </div>
                            <div className="col-sm-2 mt-4">
                            12/04/2021
                            </div>
                            <div className="col-sm-2 mt-4">
                                5pm to 8pm
                            </div>
                        </div>
                    </div>
                    
                </div>

                <Footer />
            </div>
        )
    }
    
} 