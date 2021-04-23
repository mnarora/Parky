import React, { useState , useRef, useEffect} from 'react';
import NavigationBar from './Navigationbar';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import homecss from '../CSS/Homepage.module.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Link } from 'react-router-dom';
import Footer from './Footer';


   
export default function AdminPage (){
    const [state, setState] = useState({
        email: '',
        price: '',
        address: '',
        info: '',
        surfacetype: '',
        spacenumber: 0,
        accepted_vehicles: [],
       
    })

    /* eslint-enable */

   
    return (
        <div  >
            <NavigationBar />
            <div className="mt-5 container">
                    <div className="row">
                        <div className="col-sm-5 ">
                            <br></br>
                            <h2 style={{fontWeight: "bold"}}>Manage User Details</h2>
                            <p className="text-muted">Manage the details of rentees and owners here.</p>
                            <Link to="/showusers" style={{ textDecoration: 'none', color: 'black' }}><button className={homecss.btn}>Manage Users</button></Link>
                            
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-4">
                            <img style={{height: "100%"}} className={homecss.image} src="pictures/client.jpg" alt="image"/>
                        </div>
                   </div>
                   <div className="row mt-5">
                        <div className="col-sm-5 mt-5">
                            <img style={{height: "90%"}} className={homecss.image} src="pictures/home2.svg" alt="image"/>
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-4 mt-5">
                            <h2 style={{fontWeight: "bold"}}>Want to Park Your Vehicles?</h2>
                            <p className="text-muted">Now You can Book Your Parking Space according to your convenient time and space with Parky. </p>
                            <Link to="/userregister" style={{ textDecoration: 'none', color: 'black' }}><button className={homecss.btn}>Create Account</button></Link>
                            
                        </div>
                   </div>
                </div>

                <br /><br /><br /><br /><br /><br />
                < Footer />

        </div>
    );
}