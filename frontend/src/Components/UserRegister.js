import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import userregister from '../CSS/UserRegister.module.css';
import NavigationBar from './Navigationbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

export default class UserRegister extends Component {
    state = {
        name : '',
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
                    localStorage.setItem('isUser', true);
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
        if (x.indexOf("@") <= -1 && (x !== '')) {
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
        if ((x.length !== 10) && (x !== '')) {
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
            <div className={userregister.background}>
                <NavigationBar/>
                
                <div align="center">
                <form className={userregister.regform} onSubmit={this.onSubmit}>
                <h1 style={{fontFamily: "Muli-SemiBold"}}>User Registration</h1>
                    <div className="form-group mt-5">
                        <input className={userregister.formcontrol} type="text" onChange={(e) => this.setState({name : e.target.value})} placeholder="Name" required />
                    </div>
                    <div className="form-group ">
                        <input type="email" className={userregister.formcontrol} onChange={(e) => this.setState({email : e.target.value})} onBlur={this.handleEmail} id="email" aria-describedby="emailHelp" placeholder="Email" required/>
                        <span id="emailmsg"></span>
                    </div>
                    <div className="form-group">
                        <input type="number" className={userregister.formcontrol} onChange={(e) => this.setState({contact : e.target.value})} onBlur={this.handleContact} id="contact" placeholder="Contact No" required />
                        <span id="contactmsg"></span>
                    </div>
                    <div className="form-group ">
                        <input type="password" className={userregister.formcontrol} id="password" onChange={(e) => this.setState({password : e.target.value})} onBlur={this.checkform} placeholder="Password" required />
                    </div>
                    <div className="form-group ">
                        <input className={userregister.formcontrol} type="password" onChange={this.checkform} id="confirm_password" placeholder="Confirm Password" required/>
                        <span id="msg"></span>
                    </div>
                    
                    <button className={userregister.buttonnx} type="submit" id="submit" >Register</button>
                    <p className="text-muted mt-4" style={{textAlign: "right"}}>Already have an Account? <Link to="/userlogin" style={{color: 'gray'}}>Sign In</Link></p>
                </form>
                </div>
                <ToastContainer position={toast.POSITION.TOP_CENTER}/>
            </div>
        )
    }
}