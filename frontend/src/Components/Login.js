import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import login from '../CSS/login.module.css';
import axios from 'axios';
import NavigationBar from './Navigationbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import {handleEmail} from '../FormValidation';

export default class Login extends Component {
    state = {
        email : '',
        password : ''
    };

      onSubmit = async (e) => {
          e.preventDefault()    
          await axios.post('http://localhost:3001/login', this.state)
            .then(async res => {
                if (res.data.msg)
                    toast.error(res.data.msg);
                else {

                    window.sessionStorage.setItem('name', res.data.user.name);
                    window.sessionStorage.setItem('isuser', res.data.user.isuser);
                    window.sessionStorage.setItem('useremail', res.data.user.email);
                    window.sessionStorage.setItem('contact', res.data.user.contact);
                    window.sessionStorage.setItem('userid', res.data.user._id)
                    if (res.data.user.isuser) {
                        this.props.history.push({
                            pathname: "/searchspace",
                            state: {loggedin : true}
                        });
                    }
                    else
                        this.props.history.push("/");
                    toast.success("Successfully Logged In")
                }
                
            })
            .catch(err => {
                alert(err);
                console.log(err);
                toast.error(err);
            })
      }

      
      
    render() {



        return (
            <div className={login.background}>
                <NavigationBar />
                
                <div align="center" className="mt-5">
                <form className={login.logform} onSubmit={this.onSubmit}>
                <center>
                <img src="pictures/login.jpg" alt="description of image" height="150px"/>
                <h1>User Login</h1>
                </center>
                    <div className="form-group mt-4">
                        <input type="email" className={login.formcontrol} onChange={(e) => {this.setState({email : e.target.value}); handleEmail()}} id="email" aria-describedby="emailHelp" placeholder="Enter email" required />
                        <span id="emailmsg"></span>
                    </div>
                 
                    <div className="form-group ">
                        <input type="password" className={login.formcontrol} id="password" onChange={(e) => this.setState({password : e.target.value})} placeholder="Password" required/>
                    </div>
                    
                    <button type="submit" id="submit" className={"btn btn-primary " + login.buttonn}>Login</button>
                    <Link to="/resetpassword" style={{ textDecoration: 'none', color: 'black' }}><p className="mt-2 text-muted" align="right">Forgot Password</p></Link>
                </form>
                
                </div>
                <ToastContainer position={toast.POSITION.TOP_CENTER}/>
            </div>
        )
    }
}