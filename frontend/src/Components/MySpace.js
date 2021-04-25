import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import mySpace from '../CSS/MySpace.module.css';
import NavigationBar from './Navigationbar';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Footer from './Footer';

export default class MySpace extends Component{
    state = {
        myspaces : [],
        imagePreviewUrl: ''
    }

    componentDidMount() {
        if (sessionStorage.useremail) {
           // this.setState({email:sessionStorage.useremail});
            
            
            axios.get(process.env.REACT_APP_BACKEND  + '/myspaces/' + sessionStorage.useremail)
            .then(res => {

                this.setState({
                  myspaces : res.data.myspaces
                })
            })

            $(document).ready(function(){
                $("#myInput").on("keyup", function() {
                  var value = $(this).val().toLowerCase();
                  $("#myTable tr").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                  });
                });
              });

           
        }
        else{
            console.log("No user")
        }
    }

    deleteParkingSpaceHandler = (id) => {
        if (window.confirm('Do you want to delete?')) {
            axios.delete(process.env.REACT_APP_BACKEND  + '/deleteparkingspace/'+ id)
            .then(res => {
                this.props.history.push('/myspaces')
                toast.success("Parking Space deleted")
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    editParkingSpaceHandler = (id) => {
        console.log(id)
       
        this.props.history.push(`/editparkingspace/${id}`)
       
    }

    viewUserDetails = (address) => {
        axios.post("http://localhost:3001/bookingdetails/", {address: address})
        .then(res => {
            this.props.history.push({
                pathname: '/user-booking-details',
                state: res.data.bookingDetails
            })
            console.log(res.data.bookingDetails)
        })
    }
    render(){
        return(
            
            <div className={mySpace.background}>
                <NavigationBar />
                <h1 style= {{textAlign : 'center', marginTop: '50px'}} ><u>Parking Spaces</u></h1>
                <div className={"mt-5 "} style={{marginLeft: "10%", marginRight: "10%"}} >
                <input className="form-control col-sm-3 mb-4" style={{marginRight: "0"}} id="myInput" type="text" placeholder="Search.."></input>
                <div className="table-responsive">
                <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Address</th>
                    <th scope="col">Price per Hour</th>
                    <th scope="col">Number of Parking Space</th>
                    <th scope="col">Surface Type</th>
                    <th scope="col">User Details</th>
                    <th scope="col">Edit Space Info</th>
                    <th scope="col">Delete Space</th>
                    </tr>
                </thead>
                <tbody id="myTable">
                {this.state.myspaces.reverse().map((space, index) => (
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{space.address}</td>
                        <td> {space.price} Rs</td>
                        <td>{space.spacenumber}</td>
                        <td>{space.surfacetype}</td>
                        <td><button type="button" className="btn btn-success" onClick={() => this.viewUserDetails(space.address)}>View User Details</button></td>
                        <td><button type="button" onClick= {() => this.editParkingSpaceHandler(space._id)} className="btn btn-primary">Edit Space</button></td>
                        <td><button type="button" onClick= {() => this.deleteParkingSpaceHandler(space._id)} className="btn btn-danger">Delete Space</button></td>
                    </tr>
                ))}
                
                </tbody>
                </table>
                </div>
                </div>
                <Container>
                {(this.state.myspaces.length === 0) && 
                    <h3 className="mt-5" style={{textAlign: 'center', color: 'red'}}>Currently, You don't have any Parking Spaces<br /><Link to="/parkingspace/add" style={{color: 'red'}}>Click here to Add</Link></h3>    
                }
                   
                </Container>
                
                <div style={{position: "fixed", bottom: '0', width: '100%'}}>
                <Footer />
                </div>
            </div>
        )
    }
}