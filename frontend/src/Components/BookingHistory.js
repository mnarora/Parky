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
        if (localStorage.getItem('useremail')) {
            this.setState({email:localStorage.getItem('useremail')});
            
            
            axios.get('http://localhost:3001/bookinghistory/' + localStorage.getItem('useremail'))
            .then(res => {
               
                this.setState({
                   booked_spaces: res.data.spaces
                })
                
            })

           
        }
        else{
            console.log("No user")
        }
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <div >
                    <center>
                    <h1 className="mt-5">Booking Details</h1>
                    </center>
                    <div className="history" >
                    {this.state.booked_spaces.map(space => {
                        // 
                        //     <div className ="row mt-5" style={{backgroundColor: "mediumturquoise", height: "11vh"}}>
                        //         <div className="col-sm-3 mt-4 ml-5">
                        //         {space.address}
                        //         </div>
                        //         <div className="col-sm-1"></div>
                        //         <div className="col-sm-2 mt-4">
                        //         {space.price}
                        //         </div>
                        //         <div className="col-sm-2 mt-4">
                        //         {space.date.split('T')[0]}
                        //         </div>
                        //         <div className="col-sm-2 mt-4">
                        //             {space.arrival_time}-{space.departure_time}
                        //         </div>
                        //     </div>
                        
                        // </div>
                       
                        <p key={space.address}>{space.address}</p>
                    })}
                   </div>
                    
                </div>

                <Footer />
            </div>
        )
    }
    
} 