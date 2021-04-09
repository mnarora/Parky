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
      localStorage.removeItem('isuser')
      console.log(this.props);
    }

    render() {
        return (
                <Navbar style={{height: '70px'}} bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Parky</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
              
              
                {!this.state.loggedIn ? (
                    <div className="ml-auto mr-5">
                      <Nav>
                        <NavDropdown title="Register" id="basic-nav-dropdown">
                          <NavDropdown.Item href="/userregister">User</NavDropdown.Item>
                          <NavDropdown.Item href="/ownerregister">Parking Space Owner</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Login" id="basic-nav-dropdown">
                          <NavDropdown.Item href="/userlogin">User</NavDropdown.Item>
                          <NavDropdown.Item href="/ownerlogin"> Owner</NavDropdown.Item>
                        </NavDropdown>
                       
                      </Nav>
                    </div>
                ):(
                  <div className="ml-auto mr-5">
                    <Nav >
                        <NavDropdown className="mr-4" title="Manish" id="basic-nav-dropdown">
                          <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                          <NavDropdown.Item href="/bookinghistory">Booking History</NavDropdown.Item>
                        </NavDropdown>
                      <Nav.Link onClick={this.logout} href="/">Logout</Nav.Link>
                    </Nav>
                  </div>
                )}
              
            </Navbar.Collapse>
          </Navbar>
        )
    }   
}