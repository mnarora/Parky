import React, { useState , useRef, useEffect} from 'react';
import NavigationBar from './Navigationbar';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import homecss from '../CSS/Homepage.module.css';
import 'bootstrap/dist/js/bootstrap.js';
import Footer from './Footer';
import { Component } from 'react';
import {  toast } from 'react-toastify';
import {Link} from 'react-router-dom';
class ShowSpaces extends Component{
    state = {
        spaces : [],
        filenames : []
    }

    componentDidMount() {
        if (sessionStorage.useremail) {
           // this.setState({email:sessionStorage.useremail});
            
            
            axios.get('http://localhost:3001/showspaces/')
            .then(res => {
                console.log(res.data)
                this.setState({
                  spaces : res.data.spaces,
                  filenames : res.data.filenames
                })
            })

           
        }
        else{
            console.log("Not an admin")
        }
    }

    deleteParkingSpaceHandler = (id) => {
        if (window.confirm('Do you want to delete?')) {
            axios.delete('http://localhost:3001/deleteparkingspace/'+ id)
            .then(res => {
                this.props.history.push('/showspaces')
                toast.success("Parking Space deleted")
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    verifySpaceHandler = (id) => {
        
        console.log(id)
       
        this.props.history.push(`/verifyspace/${id}`)
       
    }
       
    

    render(){
        return(
            <div>
                <NavigationBar/>
                <h1 style= {{textAlign : 'center', marginTop: '50px'}} ><u>Spaces</u></h1>
                <div className={"mt-5 "} style={{marginLeft: "10%", marginRight: "10%"}} >
                <div className="table-responsive">
                <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">Price</th>
                    <th scope="col">Address</th>
                    <th scope="col">Surface Type</th>
                    <th scope="col">Number of Spaces</th>
                    <th scope="col">Accepted Vehicles</th>
                    <th scope="col">Verification Status</th>
                    <th scope="col">Document</th>
                    <th scope="col">Verify</th>
                    <th scope="col">Delete Space</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.spaces.map((space, index) => (
                    
                
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{space.email}</td>
                        <td> {space.price}</td>
                        <td>{space.address}</td>
                        <td>{space.surfacetype}</td>
                        <td>{space.spacenumber}</td>
                        <td>{space.accepted_vehicles}</td>
                        
                        <td>{space.isVerified ? 'Verified' : 'Not Verified'}</td>
                        
                        <td><Link to = {space.filepath} download target="_blank">{space.filename}</Link></td>
                        
                        <td><button type="button" onClick= {() => this.verifySpaceHandler(space._id)} className="btn btn-primary">Verify Space</button></td>
                        <td><button type="button" onClick= {() => this.deleteParkingSpaceHandler(space._id)} className="btn btn-danger">Delete Space</button></td>
                    </tr>
                ))}
                
                </tbody>
                </table>
                </div>
                </div>
                <div style={{position: "fixed", bottom: '0', width: '100%'}}>
                <Footer />
                </div>
            </div>
        );
    }
}
export default ShowSpaces;