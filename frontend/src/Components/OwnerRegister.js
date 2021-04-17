import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import userregister from '../CSS/OwnerRegister.module.css';
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
        isuser : false
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
                    localStorage.setItem('isUser', false);
                    this.props.history.push('/ownerlogin')
                    toast.success("Successfully Registered, Login to Continue")
                }
            })
            .catch(err => {
                console.log(err)
            })
      }

    render() {



        return (
            <div className={userregister.background}>
                <NavigationBar/>
                
                <div align="center">
                <form className={userregister.regform} onSubmit={this.onSubmit}>
                <h1 style={{fontFamily: "Muli-SemiBold"}}>Owner Registration</h1>
                    <div className="form-group mt-5">
                        <input className={userregister.formcontrol} type="text" onChange={(e) => this.setState({name : e.target.value})} placeholder="Name" required />
                    </div>
                    <div className="form-group ">
                        <input type="email" className={userregister.formcontrol} onChange={(e) => this.setState({email : e.target.value})} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" required/>
                    </div>
                    <div className="form-group">
                        <input type="number" className={userregister.formcontrol} onChange={(e) => this.setState({contact : e.target.value})} placeholder="Contact No" required />
                    </div>
                    <div className="form-group "> 
                        <input type="password" className={userregister.formcontrol} id="password" onChange={(e) => this.setState({password : e.target.value})} placeholder="Password" required />
                    </div>
                    <div className="form-group ">
                        <input className={userregister.formcontrol} type="password" onChange={this.checkform} id="confirm_password" placeholder="Confirm Password" required/>
                        <span id="msg"></span>
                    </div>
                    
                    
                    <button className={userregister.buttonnx} type="submit" id="submit">Register</button>
                    <p className="text-muted mt-4" style={{textAlign: "right"}}>Already have an Account? <Link to="/ownerlogin" style={{color: 'gray'}}>Sign In</Link></p>
                </form>
                </div>
                <ToastContainer position={toast.POSITION.TOP_CENTER}/>
            </div>
        )
    }
}