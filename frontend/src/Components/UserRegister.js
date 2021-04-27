import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import userregister from '../CSS/UserRegister.module.css';
import NavigationBar from './Navigationbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { handleContact, handleName, handleEmail, checkform } from '../FormValidation';
import Footer from './Footer';

export default class UserRegister extends Component {
    state = {
        name: '',
        email: '',
        contact: '',
        password: '',
        userType: 'user'
    };


    onSubmit = (e) => {
        e.preventDefault()
        axios.post(process.env.REACT_APP_BACKEND + '/userregistration', this.state)
            .then(res => {
                if (res.data.msg)
                    toast.error(res.data.msg)
                else {
                    localStorage.setItem('userType', 'user');
                    this.props.history.push('/login')
                    toast.success("Successfully Registered, Login to Continue")
                }
            })
            .catch(err => {
                toast.error(err)
            })
    }



    render() {



        return (
            <div className={userregister.background}>
                <NavigationBar />

                <div align="center">
                    <form className={userregister.regform} onSubmit={this.onSubmit}>
                        <h1 style={{ fontFamily: "Muli-SemiBold" }}>Rentee Registration</h1>
                        <div className="form-group mt-5">
                            <input className={userregister.formcontrol} type="text" onChange={(e) => { this.setState({ name: e.target.value }); handleName(); }} id="name" placeholder="Name" required />
                            <span id="namemsg"></span>
                        </div>
                        <div className="form-group ">
                            <input type="email" className={userregister.formcontrol} onChange={(e) => { this.setState({ email: e.target.value }); handleEmail() }} id="email" aria-describedby="emailHelp" placeholder="Email" required />
                            <span id="emailmsg"></span>
                        </div>
                        <div className="form-group">
                            <input type="number" className={userregister.formcontrol} onChange={(e) => { this.setState({ contact: e.target.value }); handleContact() }} id="contact" placeholder="Contact No" required />
                            <span id="contactmsg"></span>
                        </div>
                        <div className="form-group ">
                            <input type="password" className={userregister.formcontrol} id="password" onChange={(e) => { this.setState({ password: e.target.value }); checkform(); }} placeholder="Password" required />
                            <span id="passmsg"></span>
                        </div>
                        <div className="form-group ">
                            <input className={userregister.formcontrol} type="password" onChange={() => checkform()} id="confirm_password" placeholder="Confirm Password" required />
                            <span id="msg"></span>
                        </div>

                        <button className={userregister.buttonnx} type="submit" id="submit" >Register</button>
                        <p className="text-muted mt-4" style={{ textAlign: "right" }}>Already have an Account? <Link to="/userlogin" style={{ color: 'gray' }}>Sign In</Link></p>
                    </form>
                </div>
                <ToastContainer position={toast.POSITION.TOP_CENTER} />
                    <Footer />
            </div>
        )
    }
}