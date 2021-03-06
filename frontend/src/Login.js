import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import login from './login.module.css';
import axios from 'axios';
import NavigationBar from './Navigationbar';

export default class UserRegister extends Component {
    state = {
        email : '',
        password : ''
    };

      onSubmit = (e) => {
          e.preventDefault()    
          axios.post('http://localhost:3001/userlogin', this.state)
            .then(res => {
                console.log(res)
                window.localStorage.setItem('token', res.data.token);
                window.localStorage.setItem('isuser', res.data.user.isuser);
                if (res.data.user.isuser)
                    this.props.history.push("/bookaslot");
                else 
                    this.props.history.push("/");
            })
            .catch(err => {
                console.log(err)
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
            </div>
        )
    }
}