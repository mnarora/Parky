import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import homecss from '../CSS/Homepage.module.css';
import NavigationBar from './Navigationbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

export default class Homepage extends Component {
    render () {

        return (
            <div >
              <NavigationBar />

            <img className={homecss.homepage} src="https://www.bits.ae/Images/Backcover/Car%20Park%20Manage_F.jpg" />

                <div className="mt-5 container">
                    <div className="row">
                        <div className="col-sm-5 mt-5 ml-5">
                        <br /><br /><br />
                            <h2 style={{fontWeight: "bold"}}>Have an Empty Space?</h2>
                            <p className="text-muted">Earn money by renting your space with parky as per your convenient time and Space. Currently We are serving Maharashtra. Soon we will be open in other states. <br />Create Your Account to Learn More</p>
                            <Link to="/ownerregister" style={{ textDecoration: 'none', color: 'black' }}><button className={homecss.btn}>Create Account</button></Link>
                            
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-4">
                            <img style={{height: "120%", width: "120%"}} src="http://www.parkiez.com/images/details-1-office-worker.svg" />
                        </div>
                   </div>
                   <br /><br /><br />
                   <div className="row mt-5 ">
                        <div className="col-sm-6">
                            <img style={{height: "80%"}} src="http://www.parkiez.com/images/details-2-office-team-work.svg" />
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
        )
    }
}