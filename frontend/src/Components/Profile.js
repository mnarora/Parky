import React, { Component } from 'react';
import NavigationBar from './Navigationbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Profilecss from '../CSS/Profile.module.css';

export default class Profile extends Component {
    render() {
        return (
            <div>
                <NavigationBar />

                <div>
                <h1 style={{textAlign: 'center'}} className="mt-5 mr-5">Profile</h1>
                    <div className="mt-5 row">
                        <div className="col-sm-4">
                        </div>
                        <div className="col-sm-2">
                        <h4>First Name</h4>
                        <p class="text-muted">Manish</p>
                        </div>
                        <div className="col-sm-6">
                        <h4>Last Name</h4>
                        <p class="text-muted">Arora</p>
                        </div>
                       
                    </div>
                </div>

                {/* <div className="page-content page-container mt-5" id="page-content">
        <div className="padding">
            <div className="row container d-flex justify-content-center">
                <div className="col-xl-8 col-md-12">
                    <div className="card user-card-full" style={{borderRadius: '5px 0 0 5px'}}>
                        <div className="row m-l-0 m-r-0">
                            <div className="col-sm-4 bg-c-lite-green user-profile" style={{borderRadius: '5px 0 0 5px', padding : '20px 0'}}>
                                <div className="card-block text-center text-white mt-5">
                                    <div className="m-b-25"> <img src="//img.icons8.com/fluent/96/000000/test-account.png" className={Profilecss.imgradius} alt="User-Profile-Image" /> </div>
                                    <h6 className="f-w-600">Manish</h6>
                                    <p>COEP</p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="card-block">
                            
                                    <h6 style={{fontSize: 'xx-large', fontWeight: 'bold'}}>Profile</h6>
                                    

                                    <div className="row mt-5">
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600">Email</p>
                                            <h6 className="text-muted f-w-400">mnarora2000@gmail.com</h6>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600">Phone</p>
                                            <h6 className="text-muted f-w-400">+91 7249335682</h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600">Gender</p>
                                            <h6 className="text-muted f-w-400">Male</h6>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600">Degree</p>
                                            <h6 className="text-muted f-w-400">B.tech</h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600">Branch</p>
                                            <h6 className="text-muted f-w-400">Computer</h6>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600">Year of Graduation</p>
                                            <h6 className="text-muted f-w-400">2022</h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600">Current-Location</p>
                                            <h6 className="text-muted f-w-400">Pune</h6>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600">Current Position</p>
                                            <h6 className="text-muted f-w-400">Summer Analyst at Goldman Sachs</h6>
                                        </div>
                                    </div>
                               
                                    
                                    <div className="row">
                                        
                                        <form method ="GET">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <a href = "/editprofile"> <button type="button" className="btn btn-dark">Edit Profile</button></a>
                                            </div>
                                            <div className="col-sm-6" >
                                                <a href = "/deleteaccount"><button type="button" className="btn btn-danger">Delete Account</button></a>
                                            </div>
                                            
                                        </div>
                                    </form>
                                    </div>
                                  

                                   


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>*/}
</div> 
        )
    }
}