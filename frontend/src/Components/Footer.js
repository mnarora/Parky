import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

export default class Footer extends Component {
    render() {
        return (
            <footer className="bg-dark mt-5">
                <div>
                    <div className="container" style={{ color: 'white', paddingTop: '2vh', paddingBottom: '1vh' }}>
                        <p align="center">Copyright &copy; Parky 2021<br /> Developed by Manish, Riddhi and Sakshi</p>
                    </div>
                </div>
            </footer>
        )
    }
}