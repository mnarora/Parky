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
        isVerified: true
    }

    componentDidMount() {
        //console.log(this.props.params.email)
 

        axios.post(process.env.REACT_APP_BACKEND  + '/editparkingspace/' + this.props.match.params.id, this.state)
        .then(res => {
                
                this.props.history.push('/showspaces')
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
               
            </div>
        )
    }
}