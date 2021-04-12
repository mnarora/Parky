import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/NavigationBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile';

export default class NavigationBar extends Component {

    state = {
        loggedIn: Boolean,
        isuser: Boolean,
    }

    componentWillMount() {
        if (localStorage.getItem('token')) {
            this.setState({loggedIn : true, isuser: Boolean(localStorage.getItem('isuser'))});
        }
        else 
          this.setState({loggedIn : false, isuser: false});
    }
    
    logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('isuser');
      toast.success("Successfully Logged Out")
    }
   
    render() {
        return (
          <div>
                <Navbar style={{height: '70px'}} bg="dark" variant="dark" expand="lg">
                {(this.state.loggedIn) && !(this.state.isuser) &&
                  <Navbar.Brand><Link to="/parkingspace/add" style={{ textDecoration: 'none', color: 'white' }}>Parky</Link></Navbar.Brand>
                }
                {(this.state.loggedIn) && (this.state.isuser) &&
                  <Navbar.Brand><Link to="/searchspace" style={{ textDecoration: 'none', color: 'white' }}>Parky</Link></Navbar.Brand>
                }
                {!this.state.loggedIn &&
                  <Navbar.Brand><Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Parky</Link></Navbar.Brand>
                }
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
              
              
                {!this.state.loggedIn ? (
                    <div className="ml-auto mr-5">
                      <Nav>
                        <NavDropdown title="Register" id="basic-nav-dropdown">
                          <NavDropdown.Item><Link to="/userregister" style={{ textDecoration: 'none', color: 'black' }}>User</Link></NavDropdown.Item>
                          <NavDropdown.Item><Link to="/ownerregister" style={{ textDecoration: 'none', color: 'black' }}>Parking Space Owner</Link></NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Login" id="basic-nav-dropdown">
                          <NavDropdown.Item><Link to="/userlogin" style={{ textDecoration: 'none', color: 'black' }}>User</Link></NavDropdown.Item>
                          <NavDropdown.Item><Link to="/ownerlogin" style={{ textDecoration: 'none',  color: 'black' }}>Owner</Link></NavDropdown.Item>
                        </NavDropdown>
                       
                      </Nav>
                    </div>
                ):(
                  <div className="ml-auto mr-5">
                    <Nav >
                        <NavDropdown className="mr-4" title={localStorage.getItem('useremail')} id="basic-nav-dropdown">
                          <NavDropdown.Item><Link to="/profile" style={{ textDecoration: 'none', color: 'black' }} onClick ={this.props.profilehandler}>Profile</Link></NavDropdown.Item>
                          <NavDropdown.Item><Link to="/bookinghistory" style={{ textDecoration: 'none', color: 'black' }}>Booking History</Link></NavDropdown.Item>
                        </NavDropdown>
                      <Nav.Link onClick={this.logout}><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Logout</Link></Nav.Link>
                    </Nav>
                  </div>
                )}
                <ToastContainer position={toast.POSITION.TOP_CENTER}/>
            </Navbar.Collapse>
          </Navbar>
          </div>
        )
    }   
}