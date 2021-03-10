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
                        <input type="email" className="form-control" onChange={(e) => this.setState({email : e.target.value})} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required/>
                    </div>
                    <div className="form-group">
                        <label>Contact No</label>
                        <input type="number" className="form-control" onChange={(e) => this.setState({contact : e.target.value})} placeholder="9999999999" required />
                    </div>
                    <div className="form-group ">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password" onChange={(e) => this.setState({password : e.target.value})} placeholder="Password" required />
                    </div>
                    <div className="form-group ">
                        <label className="form-label" >Confirm Password</label>
                        <input className="form-control" type="password" onChange={this.checkform} id="confirm_password" placeholder="Confirm Password" required/>
                        <span id="msg"></span>
                    </div>
                    
                    <button type="submit" id="submit" className="btn btn-primary">Register</button>
                </form>
                </div>
                <ToastContainer position={toast.POSITION.TOP_CENTER}/>
            </div>
        )
    }
}