import React, { Component } from 'react';
import NavigationBar from './Navigationbar';
import { Form, Input } from 'reactstrap';
import Bookspacecss from '../CSS/BookSpace.module.css'
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
import Payment from './Payment';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import Footer from './Footer';

export default class BookSpace extends Component{

    state = {

        address : '',
        arrival_time: '',
        departure_time: '',
        date: '',
        price: '',
        email: '',
        no_of_booked_spaces: '',
        booked_space_id: ''
    }
    yesterday = moment().subtract(1, 'day');
    disablePastDt = current => {
        return current.isAfter(this.yesterday);
    };

    bookSpaceHandler = (e) => {
        
        e.preventDefault()
        console.log(this.state.email)
        axios.post('http://localhost:3001/bookspace', this.state)
        .then(res => {
            if (res.data.error)
                toast.error(res.data.error)
            else {
                this.props.history.push('/')
                
                toast.success(res.data.msg)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    
    componentDidMount() {
        console.log(this.props)
        window.sessionStorage.setItem('booking_id', this.props.location.state.parkingspace._id)
        console.log(window.sessionStorage.getItem('booking_id'))
        this.setState(prevstate => ({
            ...prevstate,
            address: this.props.location.state.parkingspace.address,
            price: this.props.location.state.parkingspace.price,
            email: sessionStorage.useremail,
            booked_space_id : this.props.location.state.parkingspace._id
        }))
    }

    render(){
        return(
            <div className={Bookspacecss.background}>
                <NavigationBar/>

                <Container className= {Bookspacecss.container}>
                    <h1 className="ml-5 mt-5">Checkout</h1>
                    <div className="mt-5" style={{fontSize: '25px', marginLeft:'20%'}}>
                        <p><b>Address : </b>{this.props.location.state.parkingspace.address}</p>
                        <p><b>No of Spaces: </b>{this.props.location.state.parkingspace.spacenumber}</p>
                        <p><b>Surface Type: </b>{this.props.location.state.parkingspace.surfacetype}</p>
                        <p><b>Accepted Vehicles: </b>{this.props.location.state.parkingspace.accepted_vehicles}</p>
                        <p><b>Price: </b>{this.props.location.state.parkingspace.price}</p>
                        <Form>
                            <p><b>Select Date -</b></p>
                        <div style={{width:'50%', marginLeft: '10%'}}>
                        <DatePicker 
                        timeFormat={false}
                        isValidDate={this.disablePastDt}
                        onChange={(e) => this.setState({date : e.format("YYYY-MM-DD")})}
                        inputProps={{ placeholder: "Start Date" }}
                        />
                        
                        </div>
                            <p className="mt-3"><b>Select Arrival Time -</b></p>
                        <Input
                                type="time"
                                name="time"
                                id="ArrivalTime"
                                style={{width:'50%', marginLeft: '10%'}}
                                min="11:05"
                                required
                                placeholder="Arrival timw"
                                onChange={(e) => this.setState({arrival_time : e.target.value})}
                            />
                            <p className="mt-3"><b>Select Departure Time -</b></p>
                            <Input
                                type="time"
                                name="time"
                                id="DepartureTime"
                                style={{width:'50%', marginLeft: '10%'}}
                                required
                                placeholder="Departure time"
                                onChange={(e) => this.setState({departure_time : e.target.value})}
                            />
                            <p className="mt-3"><b>No of Spaces required -</b></p>
                            <Input 
                             type="number"
                             className="mb-5"
                             style={{width:'50%', marginLeft: '10%'}}
                             required
                             onChange={(e) => {
                                 if(e.target.value <= this.props.location.state.parkingspace.spacenumber){
                                    this.setState({no_of_booked_spaces : e.target.value})
                                 }
                                 else{
                                    alert("You selected more spaces. Available spaces are: " + this.props.location.state.parkingspace.spacenumber )
                                 }
                                }}
                            />
                        </Form>
                        {console.log(this.state)}
                        
                    </div>
                    {this.state.date && this.state.arrival_time && this.state.departure_time && this.state.no_of_booked_spaces && <Payment parkinginfo={this.state} {...this.props}/>}
                </Container>
                <br/><br/><br/><br/>
                <Footer />
            </div>
        )
           
    }
}