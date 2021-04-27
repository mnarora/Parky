import React from 'react';
import NavigationBar from './Navigationbar';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Component } from 'react';
import {  toast } from 'react-toastify';

class ShowUsers extends Component{
    state = {
        users : [],
        msg: ""
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
            
            
            axios.post(process.env.REACT_APP_BACKEND  + '/showusers/')
            .then(res => {

                this.setState({
                  users : res.data.users
                })
            })

           
        }
    }
    deleteUserHandler = (email) => {
        if (window.confirm("Are you sure you want to delete?")) {
            axios.delete(process.env.REACT_APP_BACKEND  + '/deleteaccount/' + email)
            .then(res => {
                window.location.reload();
                this.props.history.push('/showusers')
                toast.success("Account deleted")
            })
            .catch(err => {
                toast.error(err)
            })
        }
    }
        editUserDetailsHandler = (email) => {
       
        this.props.history.push(`admineditprofile/${email}`)
       
    }

    render(){
        return(
            <div>
                <NavigationBar/>
                <h1 style= {{textAlign : 'center', marginTop: '50px'}} ><u>Users</u></h1>
                <div className={"mt-5 "} style={{marginLeft: "10%", marginRight: "10%"}} >
                <div className="table-responsive">
                <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">User Type</th>
                    <th scope="col">Edit</th>
                    {/* <th scope="col">Options</th> */}
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.users.map((user, index) => (
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{user.name}</td>
                        <td> {user.email}</td>
                        <td>{user.contact}</td>
                        <td>{user.userType}</td>
                        <td><button type="button" onClick= {() => this.editUserDetailsHandler(user.email)} className="btn btn-primary">Edit Details</button></td>
                        {/* <td>{user.userType  == "owner" ? <Link to ="/myspaces"><button className="btn btn-primary">Space Details</button></Link>: <Link to="/user-booking-details"><button className="btn btn-primary">Booking Details</button></Link>}</td>
                        <td><button type="button" onClick= {() => this.editUserDetailsHandler(user.email)} className="btn btn-primary">Edit Details</button></td> */}
                        <td><button type="button" onClick= {() => this.deleteUserHandler(user.email)} className="btn btn-danger">Delete User</button></td>
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
export default ShowUsers;