import React, { Component } from 'react';
import NavigationBar from './Navigationbar';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
        this.setState(prevstate => ({
            ...prevstate,
            address: this.props.location.state.parkingspace.address,
            price: this.props.location.state.parkingspace.price,
            email: sessionStorage.useremail
        }))
    }

    render(){
        return(
            <div className={Bookspacecss.background}>
                <NavigationBar/>

                <Container className= {Bookspacecss.container}>
                    <h1 className="ml-5 mt-5">Checkout</h1>
                    <div className="mt-5" style={{fontSize: '25px', marginLeft:'30%'}}>
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
                        {/* <Input
                                type="date"
                                name="date"
                                id="exampleDate"
                                className="datepicker"
                                mindate="20-04-2021"
                                style={{width:'50%', marginLeft: '10%'}}
                                required
                                placeholder="date placeholder"
                                onChange={(e) => this.setState({date : e.target.value})}
                            /> */}
                            <p className="mt-3"><b>Select Arrival Time -</b></p>
                        <Input
                                type="time"
                                name="time"
                                id="ArrivalTime"
                                style={{width:'50%', marginLeft: '10%'}}
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
                            />
                        </Form>
                        {console.log(this.state)}
                        
                    </div>
                    {this.state.date && this.state.arrival_time && this.state.departure_time && <Payment parkinginfo={this.state} {...this.props}/>}
                </Container>
                <br/><br/><br/><br/>
                <Footer />
            </div>
        )
           
    }
}