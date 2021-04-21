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


export default class MySpace extends Component{
    state = {
        myspaces : [],
        imagePreviewUrl: ''
    }

    componentDidMount() {
        if (sessionStorage.useremail) {
           // this.setState({email:sessionStorage.useremail});
            
            
            axios.get('http://localhost:3001/myspaces/' + sessionStorage.useremail)
            .then(res => {

                this.setState({
                  myspaces : res.data.myspaces
                })
            })

           
        }
        else{
            console.log("No user")
        }
    }

    deleteParkingSpaceHandler = (id) => {
        if (window.confirm('Do you want to delete?')) {
            axios.delete('http://localhost:3001/deleteparkingspace/'+ id)
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
    render(){
        return(
            
            <div className={mySpace.background}>
                <NavigationBar/>
                <h1 style= {{textAlign : 'center', marginTop: '50px'}}><u>Parking Spaces</u></h1>
                <div className={"mt-5 "} style={{marginLeft: "10%", marginRight: "10%"}} >
                    <hr style={{backgroundColor: "black"}}></hr>
                    <div className ="row mt-3">
                        <div className="col-sm">
                            Sr No
                        </div>
                        <div className="col-sm">
                        Address
                        </div>
                        <div className="col-sm">
                        Price per hour
                        </div>
                        <div className="col-sm">
                        Number of Parking Space
                        </div>
                        <div className="col-sm">
                            Surface Type
                        </div>
                        <div className="col-sm">
                           Details
                        </div>
                        <div className="col-sm">
                           Edit Space Info
                        </div>
                        <div className="col-sm">
                           Delete Space
                        </div>
                    </div>
                    <hr style={{backgroundColor: "black"}}></hr>
                    {this.state.myspaces.reverse().map((space, index) => (
                            <div className ="row mt-3" style={{backgroundColor: "white", padding: "10px"}}>
                                <div className="col-sm">
                                    {index+1}
                                </div>
                                <div className="col-sm">
                                    {space.address}
                                </div>
                                <div className="col-sm">
                                    {space.price} Rs
                                </div>
                                <div className="col-sm">
                                    {space.spacenumber}
                                </div>
                                <div className="col-sm">
                                    {space.surfacetype}
                                </div>
                                <div className="col-sm">
                                <button type="button" className="btn btn-success">View Details</button>
                                </div>
                                <div className="col-sm">
                                <button type="button" onClick= {() => this.editParkingSpaceHandler(space._id)} className="btn btn-primary">Edit Space</button>
                                </div>
                                <div className="col-sm">
                                <button type="button" onClick= {() => this.deleteParkingSpaceHandler(space._id)} className="btn btn-danger">Delete Space</button>
                                </div>
                        </div>
                    ))}
                    
                </div>
                <Container>
                {(this.state.myspaces.length === 0) && 
                    <h3 className="mt-5" style={{textAlign: 'center', color: 'red'}}>Currently, You don't have any Parking Spaces<br /><Link to="/parkingspace/add" style={{color: 'red'}}>Click here to Add</Link></h3>    
                }
                   
                </Container>
                
               
            </div>
        )
    }
}