import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import homecss from './Homepage.module.css';
import NavigationBar from './Navigationbar';

export default class Homepage extends Component {
    render () {

        return (
            <div className={homecss.homepage} >
              <NavigationBar />

          <div class={homecss.font}>
              <h1>We Provide Easy</h1>
              <h1 style={{marginLeft : '7%'}}>Solutions For Parking</h1>
          </div>

            
</div>
        )
    }
}