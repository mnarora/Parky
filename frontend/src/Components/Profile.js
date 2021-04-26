import React, { Component } from 'react';
import NavigationBar from './Navigationbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
//import Profilecss from '../CSS/Profile.module.css';
import axios from 'axios';
import { Table, Button } from 'reactstrap';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

export default class Profile extends Component {

    state = {
        email: '',
        name: '',
        contact_no: '',
        editprofile: 0
    }

    componentDidMount() {
        if (sessionStorage.useremail) {
            this.setState({ email: sessionStorage.useremail });

            axios.post(process.env.REACT_APP_BACKEND + '/profile/' + sessionStorage.useremail, this.state)
                .then(res => {
                    this.setState({
                        name: res.data.user.name,
                        contact_no: res.data.user.contact
                    })
                })

        }
    }


    editProfileHandler = (e) => {
        this.setState({ editprofile: 1 })
        this.props.history.push(`/editprofile/${this.state.email}`)

    }

    deleteAccountHandler = () => {
        if (window.confirm("Are you sure you want to leave?")) {
            axios.delete(process.env.REACT_APP_BACKEND + '/deleteaccount/' + sessionStorage.useremail)
                .then(res => {
                    sessionStorage.clear();
                    this.props.history.push('/')
                    toast.success("Account deleted")
                })
                .catch(err => {
                    toast.error(err)
                })
        }
    }

    render() {
        return (
            <div >
                <NavigationBar />

                <div >
                    <h1 style={{ textAlign: 'center' }} className="mt-5 mr-5">My Profile</h1>
                    <Container style={{ marginTop: '50px' }}>
                        <Table hover>

                            <tbody>
                                <tr>
                                    <th scope="row"></th>
                                    <td><strong>Name</strong></td>
                                    <td>{this.state.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td><strong>Email</strong></td>
                                    <td>{this.state.email}</td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td><strong>Mobile Number</strong></td>
                                    <td>{this.state.contact_no}</td>
                                </tr>
                                <tr>

                                    <th scope="row"></th>
                                    <td><strong></strong></td>
                                    <td></td>
                                </tr>
                            </tbody>

                        </Table>
                        <center>
                            <div className="row container" style={{ justifyContent: 'center' }}>
                                <Button className="col-sm-2 mt-3" color="primary" onClick={this.editProfileHandler}>Edit Profile</Button>
                                <div className="col-sm-1"></div>
                                <Button className="col-sm-2 mt-3" color="primary" onClick={this.deleteAccountHandler}>Delete Account</Button>
                            </div>
                        </center>
                    </Container>



                </div>
                <div style={{ position: "fixed", bottom: '0', width: '100%' }}>
                    <Footer />
                </div>
            </div>
        )
    }
}