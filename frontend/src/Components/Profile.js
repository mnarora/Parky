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

export default class Profile extends Component {
    
    state = {
        email : '',
        name : '',
        contact_no : '',
        editprofile : 0
    }
    
    componentDidMount() {
        if (sessionStorage.useremail) {
            this.setState({email:sessionStorage.useremail});
            console.log(sessionStorage.useremail)
            
            axios.post('http://localhost:3001/profile/' + sessionStorage.useremail, this.state)
            .then(res => {
                console.log(res.data.user)
                this.setState({
                    name : res.data.user.name,
                    contact_no : res.data.user.contact
                })
            })

           
        }
        else{
            console.log("No user")
        }
    }

  
    editProfileHandler = (e) => {
        const loggedinuser = this.state;
        this.setState({editprofile : 1})
        this.props.history.push(`/editprofile/${this.state.email}`)
       
    }

    deleteAccountHandler = () => {
        if (window.confirm("Are you sure you want to leave?")) {
            axios.delete('http://localhost:3001/deleteaccount/' + sessionStorage.useremail)
            .then(res => {
                sessionStorage.clear();
                this.props.history.push('/')
                toast.success("Account deleted")
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
   
    render() {
        return (
            <div>
                <NavigationBar/>

                <div>
                <h1 style={{textAlign: 'center'}} className="mt-5 mr-5">My Profile</h1>
                <Container style={{marginTop: '50px'}}>
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
                    <div style={{display: 'inline-flex', marginLeft: '20px'}}>
                        <Button style={{marginLeft: '400px'}} color="primary" onClick={this.editProfileHandler}>Edit Profile</Button>
                        <Button style={{marginLeft: '50px'}} color="primary" onClick= {this.deleteAccountHandler}>Delete Account</Button>
                    </div>
                    
                </Container>
                
                    
            
                </div>

            </div> 
        )
    }
}