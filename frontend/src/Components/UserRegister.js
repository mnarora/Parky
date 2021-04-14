import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import userregister from '../CSS/UserRegister.module.css';
import NavigationBar from './Navigationbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class UserRegister extends Component {
    state = {
        uname : '',
        email : '',
        contact: '',
        password : '',
        isuser: true
    };


    checkform = () => {
        if (document.getElementById('password').value ===
          document.getElementById('confirm_password').value) {
            if (document.getElementById('password').value.length) {
            document.getElementById('msg').style.color = 'green';
            document.getElementById('msg').innerHTML = 'matching<br>';
            }
            else {
            document.getElementById('msg').innerHTML = '';
            }
          document.getElementById('submit').disabled = false;
        } else {
          document.getElementById('msg').style.color = 'red';
          document.getElementById('msg').innerHTML = 'not matching<br>';
          document.getElementById('submit').disabled = true;
        }
      };

    onSubmit = (e) => {
          e.preventDefault()    
          axios.post('http://localhost:3001/userregistration', this.state)
            .then(res => {
                if (res.data.msg)
                    toast.error(res.data.msg)
                else {
                    this.props.history.push('/userlogin')
                    toast.success("Successfully Registered, Login to Continue")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleEmail = () => {
        var x = document.getElementById('email').value;
        console.log(x);
        if (x.indexOf("@") <= -1 && (x != '')) {
            document.getElementById('emailmsg').style.color = 'red';
            document.getElementById('emailmsg').innerHTML = 'invalid email';
            document.getElementById('submit').disabled = true;
        }
        else {
            document.getElementById('emailmsg').innerHTML = '';
            document.getElementById('submit').disabled = false;
        }
    };

    handleContact = () => {
        var x = document.getElementById('contact').value;
        console.log(x);
        if ((x.length != 10) && (x != '')) {
            document.getElementById('contactmsg').style.color = 'red';
            document.getElementById('contactmsg').innerHTML = 'Contact No should be of 10 digits';
            document.getElementById('submit').disabled = true;
        }
        else {
            document.getElementById('contactmsg').innerHTML = '';
            document.getElementById('submit').disabled = false;
        }
    };

    render() {



        return (
            <div>
                <NavigationBar/>
                
                <div align="center">
                <form className={userregister.regform} onSubmit={this.onSubmit}>
                <h1>User Registration</h1>
                    <div className="form-group mt-5">
                        <label className="form-label" for="name">Name</label>
                        <input className="form-control" type="text" onChange={(e) => this.setState({uname : e.target.value})} placeholder="name" required />
                    </div>
                    <div className="form-group ">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" onChange={(e) => this.setState({email : e.target.value})} onBlur={this.handleEmail} id="email" aria-describedby="emailHelp" placeholder="Enter email" required/>
                        <span id="emailmsg"></span>
                    </div>
                    <div className="form-group">
                        <label>Contact No</label>
                        <input type="number" className="form-control" onChange={(e) => this.setState({contact : e.target.value})} onBlur={this.handleContact} id="contact" placeholder="9999999999" required />
                        <span id="contactmsg"></span>
                    </div>
                    <div className="form-group ">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password" onChange={(e) => this.setState({password : e.target.value})} onBlur={this.checkform} placeholder="Password" required />
                    </div>
                    <div className="form-group ">
                        <label className="form-label" >Confirm Password</label>
                        <input className="form-control" type="password" onChange={this.checkform} id="confirm_password" placeholder="Confirm Password" required/>
                        <span id="msg"></span>
                    </div>
                    
                    <button className={userregister.buttonnx} type="submit" id="submit" >Register</button>
                </form>
                </div>
                <ToastContainer position={toast.POSITION.TOP_CENTER}/>
            </div>
        )
    }
}