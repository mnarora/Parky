import React, { Component } from 'react';
import NavigationBar from './Navigationbar';
import { Button, Form, FormGroup, Label, Input, Col  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {handleContact, handleName} from '../FormValidation';


export default class EditProfile extends Component{
    
    state = {
        email : '',
        name : '',
        contact_no : ''
    }
    componentDidMount() {
        //console.log(this.props.params.email)
        axios.get("http://localhost:3001/editprofile/" + this.props.match.params.email)
        .then(res => {
            this.setState({
                name : res.data.user.name,
                contact_no : res.data.user.contact,
                email:  res.data.user.email
            })
        })
    } 
    
    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        axios.post('http://localhost:3001/editprofile/' + this.props.match.params.email, this.state)
        .then(res => {
                console.log(res.data.updated_user)
                window.sessionStorage.setItem('useremail', res.data.updated_user.email);
                this.props.history.push('/profile')
                toast.success("Successfully Updated")
            
        })
        .catch(err => {
            console.log(err)
            toast.error(err)
        })
    }

    render(){
        return(
            <div>
            <NavigationBar/>
            <Container>
                <h1 style={{ textAlign: 'center', marginTop: "30px" }}>Update Profile</h1>
                <Form style={{ width: '50%', alignItems:"center" ,marginLeft: "250px", marginTop: "100px"}} > 
                    <FormGroup row onSubmit= {this.onSubmit}>
                        <Label for="exampleName" sm={2}>Name</Label>
                        <Col>
                            <Input 
                                type="text" 
                                name="Name" 
                                id="name" 
                                onBlur={handleName}
                                value={this.state.name}
                                onChange={(e) => this.setState({name : e.target.value})}
                                
                            />
                            <span id="namemsg"></span>
                        </Col>
                    </FormGroup>
                    <span id="namemsg"></span>

                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Email</Label>
                        <Col>
                            <Input 
                                type="email" 
                                name="email" 
                                id="exampleEmail" 
                                disabled="disabled"
                                value={this.state.email}
                                onChange={(e) => this.setState({email : e.target.value})}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="Contact" sm={2}>Contact Number</Label>
                        <Col>
                            <Input 
                                type="number" 
                                name="contact_no" 
                                id="contact" 
                                onBlur={handleContact}
                                value={this.state.contact_no}
                                onChange={(e) => this.setState({contact_no : e.target.value})}
                            />
                        </Col>
                    </FormGroup>
                    <span id="contactmsg"></span>
                </Form>
                <Button style={{marginLeft: '450px', marginTop: "50px", width: "200px"}} color="primary" id="submit" onClick ={this.onSubmit}>Update</Button>
            </Container>
            </div>
        )
    }
}