/*global google*/
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavigationBar from './Navigationbar';
import Payment from './Payment';
import css from '../CSS/GoogleMap.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


      let map;
      let service;
      let places;
      let cardInfo = [];
      let dcord;
      let scord;

      
      const loadScript = (url, callback) => {
        let script = document.createElement("script");
        script.type = "text/javascript";
      
        if (script.readyState) {
          script.onreadystatechange = function() {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              script.onreadystatechange = null;
              callback();
            }
          };
        } else {
          script.onload = () => callback();
        }
      
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    
      };

      async function initMap(props) {
        map = new google.maps.Map(document.getElementById("map"), {
          zoom: 15,
        });
        const request = {
          query: props,
          fields: ["name", "geometry"],
        };
       
        service = new google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
            map.setCenter(results[0].geometry.location);
            dcord = results[0].geometry.location;
          }
         
        });
        axios.get('http://localhost:3001/bookaslot')
        .then(res => {
          for (let j = 0; j < res.data.length; j++){
            
            places = new google.maps.places.PlacesService(map);
            const param = {
              query : res.data[j].address,
              fields: ["name", "geometry"],
            };
            places.findPlaceFromQuery(param, (results, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                for (let k = 0; k < results.length; k++) {
                  
                  customMarker(results[k], res.data[j]);
                  scord = results[k].geometry.location;
                  if((google.maps.geometry.spherical.computeDistanceBetween(dcord, scord)) < 5000){
                    cardInfo.push(res.data[j]);
                  }
                  
                }
              }
            });
          }
        });
       }



      function createMarker(place) {
        if (!place.geometry || !place.geometry.location) return;
        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
        });
        addInfoWindow(marker, place.name);
      }

      function addInfoWindow(marker, content) {
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker);
        });
      }


      function customMarker(place, details) {
        const icons = {
           parking: {
           icon: 'parking_lot.png',
            },
        };
        const content = '<p>Address: '+details.address+'</p>' +
        '<p>Accepted Vehicles: '+details.accepted_vehicles+'</p>' +
        '<p>Space Number: '+details.spacenumber+'</p>' +
        '<p>Surface Type: '+details.surfacetype+'</p>' +
            '<button onclick="myFunction() style="font-weight:50;">Book Space</button>';
        const marker = new google.maps.Marker({
            position: place.geometry.location,
            icon: { 
              size: new google.maps.Size(80, 80),
              scaledSize: new google.maps.Size(80, 80),
              url: icons["parking"].icon
            },
            map: map,
          });
         
          addInfoWindow(marker, content);
      }

      
      const renderCard = (card, index) => {
        console.log(card);
        return (
          <Card style={{ width: '18rem' }} key={index} className={css.box}>
          <Card.Body>
            <Card.Title>{card.address}</Card.Title>
            <Card.Text>
              Surface Type: {card.surfacetype}
            </Card.Text>
            <Card.Text>
              Space Number: {card.spacenumber}
            </Card.Text>
            <Card.Text>
              Accepted Vehicles: {card.accepted_vehicles}
            </Card.Text>
            <Link to='/payment'><Button variant="primary">Book Space</Button></Link>
          </Card.Body>
      </Card>
        );
        
      };

    
      function useForceUpdate(){
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => value + 1); // update the state to force render
    }
  
      
      
  function GoogleMap(props){
    
    const query = props.location.state.areaname;
    const forceUpdateHandler = useForceUpdate();
     useEffect(() => {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API}&libraries=places,geometry`,
        () => initMap(query)
      );
    }, []);
    
        return (
          
          <div style={{height : '100%', width : '100%'}}>
            
            <NavigationBar/>
            <div className={css.map} id="map">
            </div>

              
            
           <div className={css.grid}>{cardInfo.map(renderCard)}</div>  
           <br></br>
           <button onClick= {forceUpdateHandler} className={css.buttonStyle}>Show nearby places</button>          
          </div>
     )
    }

    export default GoogleMap;

