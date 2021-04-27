import React from 'react';
import NavigationBar from './Navigationbar';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Component } from 'react';
import {  toast } from 'react-toastify';
import {Link} from 'react-router-dom';
class ShowSpaces extends Component{
    state = {
        spaces : [],
        filenames : []
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
        if (sessionStorage.useremail) {
           // this.setState({email:sessionStorage.useremail});
            
            
            axios.post(process.env.REACT_APP_BACKEND  + '/showspaces/')
            .then(res => {
                this.setState({
                  spaces : res.data.spaces,
                  filenames : res.data.filenames
                })
            })

           
        }
    }

    deleteParkingSpaceHandler = (id) => {
        if (window.confirm('Do you want to delete?')) {
            axios.delete(process.env.REACT_APP_BACKEND  + '/deleteparkingspace/'+ id)
            .then(res => {
                this.props.history.push('/showspaces')
                toast.success("Parking Space deleted")
                window.location.reload()
            })
            .catch(err => {
                toast.error(err)
            })
        }
    }
    verifySpaceHandler = (id) => {
       
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
            </div>
        );
    }
}
export default ShowSpaces;