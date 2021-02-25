import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';
import homecss from './Homepage.module.css';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

export default class Homepage extends Component {
    render () {

        return (
            <div className={homecss.homepage} >
                
   <Navbar bg="light" variant="light" expand="lg">
  <Navbar.Brand href="#home">PMS</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto mr-5">
     
      <NavDropdown title="Register" id="basic-nav-dropdown">
        <NavDropdown.Item href="/userregister">User</NavDropdown.Item>
        <NavDropdown.Item href="/ownerregister">Parking Space Owner</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="/login">Login</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>

<div class={homecss.font}>
    <h1>We Provide Easy</h1>
    <h1 style={{marginLeft : '7%'}}>Solutions For Parking</h1>
</div>

            
</div>
        )
    }
}