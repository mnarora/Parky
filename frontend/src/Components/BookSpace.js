import React, { Component } from 'react';
import NavigationBar from './Navigationbar';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Bookspacecss from '../CSS/BookSpace.module.css'
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
import Payment from './Payment';
export default class BookSpace extends Component{

    state = {
        address : '',
        arrival_time: '',
        departure_time: '',
        date: '',
        price: '',
        email: '',

    }

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
                        <p>Address : {this.props.location.state.parkingspace.address}</p>
                        <p>No of Spaces: {this.props.location.state.parkingspace.spacenumber}</p>
                        <p>Surface Type: {this.props.location.state.parkingspace.surfacetype}</p>
                        <p>Accepted Vehicles: {this.props.location.state.parkingspace.accepted_vehicles}</p>
                        <p>Price: {this.props.location.state.parkingspace.price}</p>
                        <Form>
                            <p>Select Date -</p>
                        <Input
                                type="date"
                                name="date"
                                id="exampleDate"
                                className="datepicker"
                                style={{width:'50%', marginLeft: '10%'}}
                                required
                                placeholder="date placeholder"
                                onChange={(e) => this.setState({date : e.target.value})}
                            />
                            <p className="mt-3">Select Arrival Time -</p>
                        <Input
                                type="time"
                                name="time"
                                id="ArrivalTime"
                                style={{width:'50%', marginLeft: '10%'}}
                                required
                                placeholder="Arrival timw"
                                onChange={(e) => this.setState({arrival_time : e.target.value})}
                            />
                            <p className="mt-3">Select Departure Time -</p>
                            <Input
                                type="time"
                                className="mb-5"
                                name="time"
                                id="DepartureTime"
                                style={{width:'50%', marginLeft: '10%'}}
                                required
                                placeholder="Departure time"
                                onChange={(e) => this.setState({departure_time : e.target.value})}
                            />
                        </Form>
                        {console.log(this.state)}
                        
                    </div>
                    {this.state.date && this.state.arrival_time && this.state.departure_time && <Payment parkinginfo={this.state} {...this.props}/>}
                </Container>
            </div>
        )
           
    }
}