/*global google*/
import axios from 'axios';
import css from '../CSS/GoogleMap.module.css';
import React, { useEffect } from 'react';
import NavigationBar from './Navigationbar';


      let map;
      let service;
      let places;

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

      function initMap(props) {
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
            console.log(results[0]);
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
        console.log(details);
        const content = "Address: " + details.address + "Surface type: " + details.surfacetype + "Accepted Vehicles: " + details.accepted_vehicles + " Additional Info: " + details.info ;
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
    
 
   function GoogleMap(props){
    const query = props.location.state.areaname;
    console.log(query);
    useEffect(() => {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API}&libraries=places`,
        () => initMap(query)
      );
    }, []);
        return (
          <div style={{height : '100%', width : '100%'}}>
            <NavigationBar/>
            <div style={{height : '500px', width : '1000px'}} id="map">
            </div>

          </div>
     )
    }

    export default GoogleMap;

