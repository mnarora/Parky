import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default class NavigationBar extends Component {

    state = {
        loggedIn: false
    }
    componentWillMount() {
        if (localStorage.getItem('token')) {
            this.setState({loggedIn : true});
        }
        else 
          this.setState({loggedIn : false});
    }

    logout = () => {
      localStorage.removeItem('token');
      console.log(this.props);
    }

    render() {
        return (
            <Navbar bg="light" variant="light" expand="lg">
            <Navbar.Brand href="/">PMS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              
              
                {!this.state.loggedIn ? (
                    <div className="ml-auto mr-5">
                      <Nav>
                    <NavDropdown title="Register" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/userregister">User</NavDropdown.Item>
                  <NavDropdown.Item href="/ownerregister">Parking Space Owner</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
                </div>
                ):(
                  <div className="ml-auto mr-5">
                  <Nav >
                <Nav.Link onClick={this.logout} href="/">Logout</Nav.Link>
                </Nav>
                </div>
                )}
              
            </Navbar.Collapse>
          </Navbar>
        )
    }   
}