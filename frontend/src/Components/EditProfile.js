import React, { Component } from 'react';
import NavigationBar from './Navigationbar';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleContact, handleName } from '../FormValidation';
import Footer from './Footer';


export default class EditProfile extends Component {

    state = {
        email: '',
        name: '',
        contact_no: ''
    }
    componentDidMount() {
        axios.post(process.env.REACT_APP_BACKEND + '/editprof/' + this.props.match.params.email)
            .then(res => {
                this.setState({
                    name: res.data.user.name,
                    contact_no: res.data.user.contact,
                    email: res.data.user.email
                })
            })
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_BACKEND + '/editprofile/' + this.props.match.params.email, this.state)
            .then(res => {
                window.sessionStorage.setItem('useremail', res.data.updated_user.email);
                window.sessionStorage.setItem('name', res.data.updated_user.name);
                window.sessionStorage.setItem('contact', res.data.updated_user.contact);
                this.props.history.push('/profile')
                toast.success("Successfully Updated")

            })
            .catch(err => {
                toast.error(err)
            })
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <Container>
                    <h1 style={{ textAlign: 'center', marginTop: "30px" }}>Update Profile</h1>
                    <center>
                    <Form className="mt-5" style={{ width: '50%', alignItems: "center" }} >
                        <FormGroup row onSubmit={this.onSubmit}>
                            <Label for="exampleName" sm={2}>Name</Label>
                            <Col>
                                <Input
                                    type="text"
                                    name="Name"
                                    id="name"
                                    value={this.state.name}
                                    onChange={(e) => { this.setState({ name: e.target.value }); handleName(); }}

                                />
                                <span id="namemsg"></span>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="exampleEmail" sm={2}>Email</Label>
                            <Col>
                                <Input
                                    type="email"
                                    name="email"
                                    id="exampleEmail"
                                    disabled="disabled"
                                    value={this.state.email}
                                    onChange={(e) => this.setState({ email: e.target.value })}
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
                                    value={this.state.contact_no}
                                    onChange={(e) => { this.setState({ contact_no: e.target.value }); handleContact(); }}
                                />
                                <span id="contactmsg"></span>
                            </Col>

                        </FormGroup>

                    </Form>
                    
                    <Button style={{ width: "200px" }} color="primary" id="submit" onClick={this.onSubmit}>Update</Button>
                    </center>
                </Container>
                <div style={{ position: "fixed", bottom: '0', width: '100%' }}>
                    <Footer />
                </div>
            </div>
        )
    }
}