import React, { Component } from 'react';
import NavigationBar from './Navigationbar';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../CSS/BookSpace.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';


export default class BookSpace extends Component{

    state = {
        address : '',
        arrival_time: '',
        departure_time: '',
        date: '',
        price: '',
        email: ''
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

    render(){
        return(
            <div>
                <NavigationBar/>

                <Container className= "container">
                    <h1 style={{ textAlign: 'center', marginTop: "30px" }}>Book the ParkingSpace</h1>
                    <Form style={{ width: '50%', alignItems:"center" ,marginLeft:"150px", marginTop: "100px"}} > 
                        <FormGroup row>
                            <Label for="exampleAddress" >Address</Label>
                            <Input
                                type="textarea"
                                name="address"
                                id="exampleAddress"
                                placeholder="Address"
                                required
                                onChange={(e) => this.setState({
                                    address : e.target.value,
                                    email : localStorage.getItem('useremail')
                                })}
                            />
                        </FormGroup>

                        <FormGroup row>
                            <Label for="exampleDate">Date</Label>
                            <Input
                                type="date"
                                name="date"
                                id="exampleDate"
                                required
                                placeholder="date placeholder"
                                onChange={(e) => this.setState({date : e.target.value})}
                            />
                        </FormGroup>

                        <FormGroup row>
                            <Label for="examplePrice">Price</Label>
                            <Input
                                type="text"
                                name="price"
                                id="examplePrice"
                                required
                                placeholder="Cost of space"
                                onChange={(e) => this.setState({price : e.target.value})}
                            />
                        </FormGroup>

                        <FormGroup row>
                            <Label for="ArrivalTime">Arrival Time</Label>
                            <Input
                                type="time"
                                name="time"
                                id="ArrivalTime"
                                required
                                placeholder="Arrival timw"
                                onChange={(e) => this.setState({arrival_time : e.target.value})}
                            />
                        </FormGroup>

                        <FormGroup row>
                            <Label for="DepartureTime">Departure Time</Label>
                            <Input
                                type="time"
                                name="time"
                                id="DepartureTime"
                                required
                                placeholder="Departure time"
                                onChange={(e) => this.setState({departure_time : e.target.value})}
                            />
                        </FormGroup>
                    </Form>
                    <Button style={{ marginTop: "50px", width: "200px"}}  onClick ={this.bookSpaceHandler} className='buttonn'>Save</Button>
                </Container>
            </div>
        )
           
    }
}