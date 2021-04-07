import React, { Component } from 'react';

export default class GetDirections extends Component {
    render() {
        return (
            <div>
                <form action="http://maps.google.com/maps" method="get" target="_blank">
                <label for="saddr">Enter your location</label>
                <div >
                <input type="hidden" name="saddr" value="COEP Pune" />
                <input style={{color: 'black'}} type="text" name="daddr" />
                <input style={{color: 'black'}} type="submit" value="Get directions" />
                </div>
                </form>
            </div>
        )
    }

}