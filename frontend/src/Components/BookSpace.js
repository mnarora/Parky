import React, { Component } from 'react';
import NavigationBar from './Navigationbar';
import { Form, Input } from 'reactstrap';
import Bookspacecss from '../CSS/BookSpace.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
import Payment from './Payment';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

export default class BookSpace extends Component {

    state = {

        address: '',
        arrival_time: '',
        departure_time: '',
        arrival_date: '',
        departure_date: '',
        price: '',
        email: '',
        no_of_booked_spaces: '',
        booked_space_id: ''
    }

    payment = true;
    pay = true;

    yesterday = moment().subtract(1, 'day');

    disablePastDt = current => {
        return current.isAfter(this.yesterday);
    };

    disableDate = current => {
        var a = new Date(this.state.arrival_date)
        var b = moment().set({ 'year': a.getFullYear(), 'month': a.getMonth(), 'date': a.getDate() - 1 })
        return current.isAfter(b)
    }

    bookSpaceHandler = (e) => {

        e.preventDefault()
        axios.post(process.env.REACT_APP_BACKEND + '/bookspace', this.state)
            .then(res => {
                if (res.data.error)
                    toast.error(res.data.error)
                else {
                    this.props.history.push('/')

                    toast.success(res.data.msg)
                }
            })
            .catch(err => {
                toast.error(err)
            })
    }

    checkArrivalTime = () => {
        if (document.getElementById('arrival_time').value) {
            var arrival_date = new Date(this.state.arrival_date)
            var today_date = new Date();
            if (arrival_date.setHours(0, 0, 0, 0) === today_date.setHours(0, 0, 0, 0)) {
                var currenttime = new Date().getHours() + ":" + new Date().getMinutes();
                if (new Date().getHours() < 10)
                    currenttime = "0" + new Date().getHours() + ":" + new Date().getMinutes();
                if (new Date().getMinutes() < 10)
                    currenttime = new Date().getHours() + ":0" + new Date().getMinutes();
                if (new Date().getHours() < 10 && new Date().getMinutes() < 10)
                    currenttime = "0" + new Date().getHours() + ":0" + new Date().getMinutes();
                var arrivaltime = document.getElementById("arrival_time").value;
                if (currenttime > arrivaltime) {
                    document.getElementById('arrival_timemsg').style.color = 'red';
                    document.getElementById('arrival_timemsg').innerHTML = 'Please Enter Valid Arrival Time';
                    this.payment = false
                }
                else {
                    document.getElementById('arrival_timemsg').innerHTML = '';
                    this.payment = true
                }
            }
        }
    }

    checkDepartureTime = () => {
        if (document.getElementById("departure_time").value) {
            var arrival_date = new Date(this.state.arrival_date)
            var departure_date = new Date(this.state.departure_date);
            var currenttime = new Date().getHours() + ":" + new Date().getMinutes();
            if (new Date().getHours() < 10)
                currenttime = "0" + new Date().getHours() + ":" + new Date().getMinutes();
            if (new Date().getMinutes() < 10)
                currenttime = new Date().getHours() + ":0" + new Date().getMinutes();
            if (new Date().getHours() < 10 && new Date().getMinutes() < 10)
                currenttime = "0" + new Date().getHours() + ":0" + new Date().getMinutes();
            if (arrival_date.setHours(0, 0, 0, 0) === departure_date.setHours(0, 0, 0, 0)) {
                if (document.getElementById("departure_time").value <= document.getElementById("arrival_time").value || ((departure_date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) && (currenttime > document.getElementById("departure_time").value))) {
                    document.getElementById('departure_timemsg').style.color = 'red';
                    document.getElementById('departure_timemsg').innerHTML = 'Please Enter Valid Departure Time';
                    this.payment = false;
                }
                else {
                    document.getElementById('departure_timemsg').innerHTML = '';
                    this.payment = true;
                }
            }
        }
    }

    handleSpace = async (e) => {
        e.preventDefault()
        await axios.post(process.env.REACT_APP_BACKEND + '/getSpace', this.state)
            .then(res => {
                if (res.data.no_of_available_space <= 0) {
                    this.pay = false
                    alert("Spot not Available for Specified Interval.\nPlease Change Your Date of Booking or Look for Nearyby Spaces");
                    return false
                }
                else if (res.data.no_of_available_space < parseInt(this.state.no_of_booked_spaces)) {
                    this.pay = false
                    alert("No of Available Space " + res.data.no_of_available_space + "\nTry to book " + res.data.no_of_available_space + " or less\n")
                    return false
                }
                else {
                    this.pay = true
                    return true
                }
            })
            .catch(err => {
                toast.error(err)
            })
    }

    componentDidMount() {
        window.sessionStorage.setItem('booking_id', this.props.location.state.parkingspace._id)
        this.setState(prevstate => ({
            ...prevstate,
            address: this.props.location.state.parkingspace.address,
            price: this.props.location.state.parkingspace.price,
            email: sessionStorage.useremail,
            booked_space_id: this.props.location.state.parkingspace._id
        }))
    }

    componentDidUpdate() {
        this.checkArrivalTime();
        this.checkDepartureTime();
    }

    render() {
        return (
            <div className={Bookspacecss.background}>
                <NavigationBar />

                <Container className={"container mb-5 " + Bookspacecss.container}>
                    <h1 className="ml-5 mt-5">Checkout</h1>
                    <div className="mt-5" style={{ fontSize: '25px', marginLeft: '20%' }}>
                        <p><b>Address : </b>{this.props.location.state.parkingspace.address}</p>
                        <p><b>Total No of Spaces: </b>{this.props.location.state.parkingspace.spacenumber}</p>
                        <p><b>Surface Type: </b>{this.props.location.state.parkingspace.surfacetype}</p>
                        <p><b>Accepted Vehicles: </b>{this.props.location.state.parkingspace.accepted_vehicles}</p>
                        <p><b>Price per hour: </b>{this.props.location.state.parkingspace.price}</p>
                        <Form>
                            <p><b>Select Arrival Date -</b></p>
                            <div style={{ width: '50%', marginLeft: '10%' }}>
                                <DatePicker
                                    timeFormat={false}
                                    id="arrival_date"
                                    isValidDate={this.disablePastDt}
                                    onChange={(e) => this.setState({ arrival_date: e.format("YYYY-MM-DD") })}
                                    inputProps={{ placeholder: "Arrival Date" }}
                                />

                            </div>
                            <p><b>Select Departure Date -</b></p>
                            <div style={{ width: '50%', marginLeft: '10%' }}>
                                <DatePicker
                                    timeFormat={false}
                                    isValidDate={this.disableDate}
                                    onChange={(e) => this.setState({ departure_date: e.format("YYYY-MM-DD") })}
                                    inputProps={{ placeholder: "Departure Date" }}
                                />
                            </div>
                            <p className="mt-3"><b>Select Arrival Time -</b></p>
                            <Input
                                type="time"
                                name="time"
                                id="arrival_time"
                                style={{ width: '50%', marginLeft: '10%' }}
                                required
                                onChange={(e) => { this.setState({ arrival_time: e.target.value }); this.checkArrivalTime(); }}
                            />
                            <span style={{ marginLeft: '10%' }} id="arrival_timemsg"></span>
                            <p className="mt-3"><b>Select Departure Time -</b></p>
                            <Input
                                type="time"
                                name="time"
                                id="departure_time"
                                style={{ width: '50%', marginLeft: '10%' }}
                                required
                                placeholder="Departure time"
                                onChange={(e) => { this.setState({ departure_time: e.target.value }); this.checkDepartureTime() }}
                            />
                            <span style={{ marginLeft: '10%' }} id="departure_timemsg"></span>
                            <p className="mt-3"><b>No of Spaces required -</b></p>
                            <Input
                                type="number"
                                className="mb-5"
                                style={{ width: '50%', marginLeft: '10%' }}
                                required
                                onChange={(e) => {
                                    this.handleSpace(e);
                                    if (e.target.value <= this.props.location.state.parkingspace.spacenumber) {
                                        this.setState({ no_of_booked_spaces: e.target.value })
                                    }
                                    else {
                                        alert("You selected more spaces. Available spaces are: " + this.props.location.state.parkingspace.spacenumber)
                                    };
                                    
                                }}
                            />
                        </Form>

                    </div>
                    {this.state.arrival_date && this.state.departure_date && this.state.arrival_time && this.state.departure_time && this.state.no_of_booked_spaces && this.payment && this.pay && <Payment parkinginfo={this.state} {...this.props} />}
                    <br />
                </Container>
                <Footer />

            </div>
        )

    }
}