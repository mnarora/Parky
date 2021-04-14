import React, { useState, useEffect, useRef } from "react";
import NavigationBar from './Navigationbar';
import css from '../CSS/BookaSlot.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Footer from './Footer';


    

    let autoComplete;

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
    
    function handleScriptLoad(updateQuery, autoCompleteRef) {
      autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { types: ["(regions)"], componentRestrictions: { country: "in" } }
      );
      autoComplete.setFields(["address_components", "formatted_address"]);
      autoComplete.addListener("place_changed", () =>
        handlePlaceSelect(updateQuery)
      );
    }
    
    async function handlePlaceSelect(updateQuery) {
      const addressObject = autoComplete.getPlace();
      const query = addressObject.formatted_address;
      updateQuery(query);
      console.log(addressObject);
    }
    
    function BookaSlot(props) {
      const [query, setQuery] = useState("");
      const autoCompleteRef = useRef(null);

      const handleSubmit = () => {
        props.history.push({
          pathname: "/bookaslot",
          state: {areaname: query}
        })
      }
    
      useEffect(() => {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=AIzaSyBPThzljDTi_ZRsR-Xg3R05x2xP9OAieaE&libraries=places`,
          () => handleScriptLoad(setQuery, autoCompleteRef)
        );
      }, []);
    
        return (
            <div>
                <NavigationBar />
                <div className={css.search}>
                    <br></br><br></br>
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    <h1 style={{fontWeight : "900"}}>PARKING JUST GOT A LOT SIMPLER</h1>
                    <h3 style={{fontStyle: "italic"}}>Book the Best Spaces and Save up to 20% off</h3>
                    <br /><br /><br />
                    <h2 className="mt-5">Where do You want to Park?</h2>
                    <input type="text" ref={autoCompleteRef}
                    onChange={event => setQuery(event.target.value)}
                    value={query} placeholder="Enter Address"/>

                    <button onClick={handleSubmit} className="mt-5" type="submit">Search Your Parking Space</button>
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br>


                </div>

                <div className="mt-5">
                  <center>
                    <h1>How Parky Works?</h1>
                    <img className="container" style={{width: "45%"}} src ="https://whatech.b-cdn.net/images/13082/parking-app.jpg" />
                    <div className="container row mt-5">
                      <div className="col-sm-4">
                        <div className="card" style={{border: "2px solid black", borderRadius: "2px"}}>
                          <div className="card-body">
                            <img class="card-img-top" style={{width: "50%"}} src="https://1.bp.blogspot.com/-kDGZfSwIDa4/WZztdtLZI_I/AAAAAAAAA_g/OIv9xHrf258vS5CxoieYGa8pAeVZ1WQvQCLcBGAs/s1600/1415483967locationsearch.png" alt="Card image cap" />
                            <h5 className="card-title mt-3">Search</h5>
                            <p className="text-muted">Search the parking space anytime at your location by using our Website.<br/> Simple And Quick.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="card" style={{border: "2px solid black"}}>
                            <div className="card-body">
                              <img class="card-img-top" style={{width: "50%"}} src="https://www.paymypark.com/Images/blue-logo.png" alt="Card image cap" />
                              <h5 className="card-title mt-3">Book</h5>
                              <p className="text-muted">Book space which you searched by your convenience by paying standard amount.<br /> Trusted And Affordable</p>
                            </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="card" style={{border: "2px solid black"}}>
                            <div className="card-body">
                              <img class="card-img-top" style={{width: "50%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcg398cdTk74rWWFL9JkZRq0DW5qOJqIA6Ew&usqp=CAU" alt="Card image cap" />
                              <h5 className="card-title mt-3">Park</h5>
                              <p className="text-muted">Park vehicle on your dedicated space for the period of time you have booked for. Safe And Secure.</p>
                            </div>
                          </div>
                        </div>
                    </div>
                  </center>

                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/>
                <Footer />
                <ToastContainer position={toast.POSITION.TOP_CENTER}/>
            </div>
        )
        }

export default BookaSlot;


