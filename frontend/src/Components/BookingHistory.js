import React, { Component } from 'react';
import NavigationBar from './Navigationbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from 'axios';
import { Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';

export default class BookingHistory extends Component {

    state = {
        booked_spaces: []
    }

    componentDidMount() {
        if (sessionStorage.useremail) {
            this.setState({ email: sessionStorage.useremail });


            axios.post(process.env.REACT_APP_BACKEND + '/bookinghistory/' + sessionStorage.useremail)
                .then(res => {

                    this.setState({
                        booked_spaces: res.data.spaces
                    })

                })

            $(document).ready(function () {
                $("#myInput").on("keyup", function () {
                    var value = $(this).val().toLowerCase();
                    $("#myTable tr").filter(function () {
                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                    });
                });
            });


        }
    }
    cancelBookingHandler = (spaceid) => {
        axios.post(process.env.REACT_APP_BACKEND + '/cancelorder/' + spaceid)
            .then(res => {
                window.location.reload(false)
                toast.success("Booking Cancelled")

            })
            .catch(err => toast.error(err))
    }

    getReciept = (spaceid) => {

        if (window.confirm("Your reciept will be mailed on " + sessionStorage.useremail)) {
            axios.post(process.env.REACT_APP_BACKEND + '/getreciept/' + spaceid)
                .then(res => {
                    window.location.reload(false)
                    toast.success(res.data.status)

                })
                .catch(err => toast.error(err))
        }
    }

    orderStatus = (space) => {
        if (space.order_status === "Cancelled")
            return "Cancelled"
        var startTime = new Date(space.arrival_date.split('T')[0] + ' ' + space.arrival_time)
        if (startTime > new Date())
            return "Confirmed"
        else
            return "Completed"
    }

    render() {
        return (
            <div >
                <NavigationBar />
                <div >
                    <center>
                        <h1 className="mt-5">Booking Details</h1>
                    </center>
                    <div className="mt-6" style={{ marginLeft: "10%", marginRight: "10%" }} >
                        <input className="form-control col-sm-3 mb-4" style={{ marginRight: "0" }} id="myInput" type="text" placeholder="Search.."></input>
                        <div className="table-responsive mt-5">
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Order No</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Order Amount</th>
                                        <th scope="col">Booked Date and Time</th>
                                        <th scope="col">Order Status</th>
                                        <th scope="col">Directions</th>
                                        <th scope="col">Options</th>
                                    </tr>
                                </thead>
                                <tbody id="myTable">
                                    {this.state.booked_spaces.reverse().map((space, index) => (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{space.address}</td>
                                            <td> {this.orderStatus(space) === "Cancelled" && <div>{space.price} (Refund - {space.price - 20})</div>}
                                                {(this.orderStatus(space) === "Confirmed" || this.orderStatus(space) === "Completed") && space.price}</td>
                                            <td>{space.arrival_date.split('T')[0]} {space.arrival_time} - {space.departure_date.split('T')[0]} {space.departure_time}</td>
                                            <td> {this.orderStatus(space)}</td>
                                            <td>
                                                <form action="http://maps.google.com/maps" method="get" target="_blank">
                                                    <div >
                                                        <input type="hidden" name="daddr" value={space.address} />
                                                        <button type="button" className="btn btn-primary" type="submit">Get Directions</button>
                                                    </div>
                                                </form>
                                            </td>
                                            <td>{(this.orderStatus(space) === "Cancelled" || this.orderStatus(space) === "Completed") &&
                                                <Button color="primary" data-toggle="modal" onClick={() => { this.getReciept(space._id) }} >Get Reciept</Button>
                                            }
                                                {this.orderStatus(space) === "Confirmed" &&
                                                    <Button color="primary" data-toggle="modal" data-target="#exampleModal" >Cancel Order</Button>
                                                }</td>
                                            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Confirm Cancellation!!!</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body" style={{ marginLeft: "20%" }}>
                                                            Order Price: Rs {space.price}<br />
                            Cancellation Charges: Rs 20<br />
                            Refund Amount: {space.price - 20}<br /><br />
                                                            <p className="text-muted">Refund will be credited to your Original Payment Method within 24hrs</p>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                            <button type="button" onClick={() => { this.cancelBookingHandler(space._id) }} className="btn btn-primary">Confirm</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                        </div>

                    </div>


                </div>
                <ToastContainer position={toast.POSITION.TOP_CENTER} />
            </div>
        )
    }

}