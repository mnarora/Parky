import React from 'react';
import {Component} from 'react';
import NavigationBar from './Navigationbar';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import homecss from '../CSS/Homepage.module.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Link } from 'react-router-dom';
import Footer from './Footer';



export default class AdminPage extends Component {
    componentDidMount(){
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
    }
    render(){
    return (
        <div  >
            <NavigationBar />
            <div className="mt-5 container">
                <div className="row">
                    <div className="col-sm-5">
                        <br></br>
                        <h2 style={{ fontWeight: "bold" }} className="mt-5">Manage User Details</h2>
                        <p className="text-muted">Manage the details of rentees and owners here.</p>
                        <Link to="/showusers" style={{ textDecoration: 'none', color: 'black' }}><button className={homecss.btn}>Manage Users</button></Link>

                    </div>
                    <div className="col-sm-2"></div>
                    <div className="col-sm-4">
                        <img style={{ height: "100%" }} className={homecss.image} src="pictures/client.jpg" alt="clientimage" />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-sm-5 mt-5">
                        <img style={{ height: "80%" }} className={homecss.image} src="pictures/verify.png" alt="verifyimage" />
                    </div>
                    <div className="col-sm-2"></div>
                    <div className="col-sm-4 mt-5">
                        <h2 style={{ fontWeight: "bold" }}>Verify Spaces</h2>
                        <p className="text-muted">You can verify the space details uploaded by the owner.</p>
                        <Link to="/showspaces" style={{ textDecoration: 'none', color: 'black' }}><button className={homecss.btn}>Verify Space</button></Link>

                    </div>
                </div>
            </div>
            < Footer />

        </div>
    );
}
}