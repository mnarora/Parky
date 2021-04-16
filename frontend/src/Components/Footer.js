import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div style={{backgroundColor : "black", position: "static", bottom : "0", width: "100%", color: "white", fontSize: "18px"}}>
                <div>
                    <br /><br />
                    <p align="center">Copyright &copy; Parky Developed by Manish, Riddhi and Sakshi</p>
                    <br />
                </div>
            </div>
        )
    }
}