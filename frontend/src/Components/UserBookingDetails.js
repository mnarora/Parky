import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import mySpace from '../CSS/MySpace.module.css';
import NavigationBar from './Navigationbar';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';

export default class UserBookingDetails extends Component {


    componentDidMount() {
        const userType  = window.sessionStorage.getItem('userType')
       
        if(userType === 'user' ) {
            this.props.history.push({
                pathname: "/searchspace",
                
            });
        }
        
        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#myTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
    }

    render() {
        return (
            <div className={mySpace.background}>
                <NavigationBar />
                <h1 style={{ textAlign: 'center', marginTop: '50px' }}><u>Booking Details</u></h1>
                <div className={"mt-5 "} style={{ marginLeft: "10%", marginRight: "10%" }} >
                    <input className="form-control col-sm-3 mb-4" style={{ marginRight: "0" }} id="myInput" type="text" placeholder="Search.."></input>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Sr No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Contact</th>
                                    <th scope="col">Arrival Date and Time</th>
                                    <th scope="col">Departure Date and Time</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Number of Spaces</th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {this.props.location.state.reverse().map((details, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{details.userdetails.name}</td>
                                        <td>{details.userdetails.email}</td>
                                        <td>{details.userdetails.contact}</td>
                                        <td>{details.spacedetails.arrival_date.split('T')[0]} {details.spacedetails.arrival_time}</td>
                                        <td>{details.spacedetails.departure_date.split('T')[0]} {details.spacedetails.departure_time}</td>
                                        <td>{details.spacedetails.price}</td>
                                        <td>{details.spacedetails.no_of_booked_spaces}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                    {this.props.location.state.length === 0 &&
                        <h3 className="mt-5" style={{ textAlign: 'center', color: 'red' }}>There are no Bookings on this Space</h3>}
                </div>
            </div>
        )
    }
}