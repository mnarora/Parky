import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import editparkingspace from '../CSS/EditParkingSpace.module.css';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class EditParkingSpace extends Component{
    state= {
        isVerified: true
    }

    componentDidMount() {
 
        const userType  = window.sessionStorage.getItem('userType')
       
        if(userType === 'user' ) {
            this.props.history.push({
                pathname: "/searchspace",
                
            });
        }
        if(userType === 'owner'){
            this.props.history.push({
                pathname: "/ParkingSpace/Add",
                
            });
        }
        axios.post(process.env.REACT_APP_BACKEND  + '/editparkingspace/' + this.props.match.params.id, this.state)
        .then(res => {
                
                this.props.history.push('/showspaces')
                toast.success("Successfully Updated")
                
            
        })
        .catch(err => {
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