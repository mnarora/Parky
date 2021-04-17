import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import editparkingspace from '../CSS/EditParkingSpace.module.css';
import NavigationBar from './Navigationbar';
import { Form, FormGroup, Label, Input, Col  } from 'reactstrap';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class EditParkingSpace extends Component{
    state= {
        address : '',
        info: '',
        surfacetype: '',
        spacenumber: '',
        price : ''
    }

    componentDidMount() {
        //console.log(this.props.params.email)
        axios.get("http://localhost:3001/editparkingspace/" + this.props.match.params.id)
        .then(res => {
            this.setState({
                address : res.data.space.address,
                info : res.data.space.info,
                surfacetype:  res.data.space.surfacetype,
                spacenumber: res.data.space.spacenumber,
                price: res.data.space.price
            })
        })
    } 
    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        axios.post('http://localhost:3001/editparkingspace/' + this.props.match.params.id, this.state)
        .then(res => {
             
                this.props.history.push('/myspaces')
                toast.success("Successfully Updated")
            
        })
        .catch(err => {
            console.log(err)
            toast.error(err)
        })
    }

    render(){
        return(
            
            <div className={editparkingspace.mainPage}>
                <NavigationBar/>
                <Container className={editparkingspace.Container}>
                   
               
                        
                    <main>
                        <section className={editparkingspace.about}>
                        <h1 style= {{textAlign : 'center', marginTop: '20px'}}><u>Update Parking Spaces Details</u></h1>
                        <Form style={{ width: '50%', alignItems:"center" ,marginLeft: "200px", marginTop: "100px"}} > 
                            <FormGroup row onSubmit= {this.onSubmit}>
                                <Label for="exampleName" sm={4}>Address</Label>
                                <Col>
                                    <Input 
                                        type="text" 
                                        name="Name" 
                                        id="exampleName" 
                                        
                                        value={this.state.address}
                                        onChange={(e) => this.setState({address : e.target.value})}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="exampleEmail" sm={4}>Information</Label>
                                <Col>
                                    <Input 
                                        type="text" 
                                        name="email" 
                                        id="exampleEmail" 
                                        
                                        value={this.state.info}
                                        onChange={(e) => this.setState({info : e.target.value})}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="Contact" sm={4}>Surface Type</Label>
                                <Col>
                                    <Input 
                                        type="text" 
                                        name="contact_no" 
                                        id="Contact" 
                                        
                                        value={this.state.surfacetype}
                                        onChange={(e) => this.setState({surfacetype : e.target.value})}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="number" sm={4}>Number of Spaces</Label>
                                <Col>
                                    <Input 
                                        type="text" 
                                        name="number" 
                                        id="number" 
                                        
                                        value={this.state.spacenumber}
                                        onChange={(e) => this.setState({spacenumber : e.target.value})}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="price" sm={4}>Cost of Parking per hour</Label>
                                <Col>
                                    <Input 
                                        type="text" 
                                        name="price" 
                                        id="price" 
                                        
                                        value={this.state.price}
                                        onChange={(e) => this.setState({price : e.target.value})}
                                    />
                                </Col>
                            </FormGroup>
                        </Form>
                        <Button className = {editparkingspace.buttonn} onClick={this.onSubmit}>Edit</Button>
                        </section>
                    </main>
                   
               
                   
                </Container>
                
               
            </div>
        )
    }
}