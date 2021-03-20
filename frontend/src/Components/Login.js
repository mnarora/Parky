import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import login from '../CSS/login.module.css';
import axios from 'axios';
import NavigationBar from './Navigationbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class UserRegister extends Component {
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

                    window.localStorage.setItem('token', res.data.token);
                    window.localStorage.setItem('isuser', res.data.user.isuser);
                    if (res.data.user.isuser) {
                        this.props.history.push({
                            pathname: "/bookaslot",
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
            <div>
                <NavigationBar/>
                
                <div align="center" className="mt-5">
                <form className={login.logform} onSubmit={this.onSubmit}>
                <h1>User Login</h1>
                    <div className="form-group mt-5">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" onChange={(e) => this.setState({email : e.target.value})} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
                    </div>
                 
                    <div className="form-group ">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password" onChange={(e) => this.setState({password : e.target.value})} placeholder="Password" required/>
                    </div>
                    
                    <button type="submit" id="submit" className="btn btn-primary">Login</button>
                </form>
                </div>
                <ToastContainer position={toast.POSITION.TOP_CENTER}/>
            </div>
        )
    }
}