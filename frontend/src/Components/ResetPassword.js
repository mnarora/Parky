import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import login from '../CSS/login.module.css';
import axios from 'axios';
import NavigationBar from './Navigationbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleEmail } from '../FormValidation';


export default class ResetPassword extends Component {
    state = {
        otp: '',
        password: '',
        email: '',
        originalotp: ''
    }

    onSubmit = async (e) => {
        await axios.post(process.env.REACT_APP_BACKEND + '/resetpassword', { email: this.state.email, password: this.state.password })
            .then(async res => {
                alert("Password changed");
                this.props.history.push('/login');
                toast.success("Password Changed")
            })
            .catch(err => {
                alert(err);
            })
    }

    generateOTP = async (e) => {
        e.preventDefault()

        await axios.post(process.env.REACT_APP_BACKEND + '/sendmail', { email: this.state.email })
            .then(async res => {
                if (res.data.msg) {
                    document.getElementById('otp').style.color = 'red';
                    document.getElementById('otp').innerHTML = res.data.msg;
                }
                else {
                    this.setState({ originalotp: res.data.OTP });
                    document.getElementById('otp').style.color = 'red';
                    document.getElementById('otp').innerHTML = 'OTP sent Successfully';
                }

            })
            .catch(err => {
                toast.error(err);
            })
    }

    changefield = async (e) => {
        await this.setState({ otp: e.target.value });
        if (this.state.otp === this.state.originalotp) {
            document.getElementById('submit').disabled = false;
            document.getElementById('msg').style.color = '';
            document.getElementById('msg').innerHTML = '';
        } else {
            document.getElementById('msg').style.color = 'red';
            document.getElementById('msg').innerHTML = 'Incorrect OTP';
            document.getElementById('submit').disabled = true;
        }

    }

    render() {
        return (

            <div>
                <NavigationBar />

                <div className={login.background} align="center">
                    <form className={"mt-5 " + login.logform} onSubmit={this.onSubmit}>
                        <h2>Reset Password</h2>
                        <p>Enter your user account's verified email address and we will send you a One Time Password to reset your Password.</p>
                        <input type="email" onChange={(e) => { this.setState({ email: e.target.value }); handleEmail() }} id="email" className="form-control" placeholder="Email" required />
                        <span id="emailmsg"></span>
                        <br />
                        <button style={{ backgroundColor: 'black' }} onClick={this.generateOTP} id="submit" class="btn btn-primary mt-4">Submit</button>
                        <br />
                        <span id="otp"></span>
                        <p class="mt-3">Enter OTP sent on your email to reset your password</p>
                        <label>OTP</label>
                        <input type="text" onChange={(e) => this.changefield(e)} className="form-control" placeholder="Enter OTP" required />
                        <label class="mt-3">New Password</label>
                        <input type="password" onChange={(e) => this.setState({ password: e.target.value })} className="form-control" placeholder="New Password" required />
                        <span id="msg" class="mt-2"></span>
                        <br />
                        <button style={{ backgroundColor: 'black' }} type="submit" id="submit" class="btn btn-primary mt-4">Submit</button>
                    </form>
                </div>
                <ToastContainer position={toast.POSITION.TOP_CENTER} />
            </div>
        )
    }
}