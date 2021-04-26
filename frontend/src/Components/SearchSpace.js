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
    script.onreadystatechange = function () {
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
    { fields: ["formatted_address", "geometry", "name"], componentRestrictions: { country: "in" } }
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
}

function BookaSlot(props) {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  const handleSubmit = () => {
    props.history.push({
      pathname: "/bookaslot",
      state: { areaname: query }
    })
    window.location.reload();
  }

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className={css.search}>
        <i class="fa fa-map-marker" aria-hidden="true"></i>
        <h1 style={{ fontWeight: "900", paddingTop: '8vh' }}>PARKING JUST GOT A LOT SIMPLER</h1>
        <h3 style={{ fontStyle: "italic" }}>Book the Best Spaces and Save up to 20% off</h3>
        <h2 style={{ paddingBottom: '3vh' }} className="mt-5">Where do You want to Park?</h2>
        <input className={css.inputaddr} type="text" ref={autoCompleteRef}
          onChange={event => setQuery(event.target.value)}
          value={query} placeholder="Enter Address" />
        <button onClick={handleSubmit} className={css.buttonS} type="submit">Search Your Parking Space</button>


      </div>

      <div className="mt-5">
        <center>
          <h1>How Parky Works?</h1>
          <img className="container" style={{ width: "45%", minWidth: "350px" }} src="pictures/searchspace1.jpg" />
          <div className="container row">
            <div className="col-sm-4 mt-5">
              <div className="card" style={{ border: "2px solid black", borderRadius: "2px" }}>
                <div className="card-body">
                  <img class="card-img-top" style={{ width: "50%" }} src="pictures/searchspace2.png" alt="searchspace" />
                  <h5 className="card-title mt-3">Search</h5>
                  <p className="text-muted">Search the parking space anytime at your location by using our Website.<br /> Simple And Quick.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4  mt-5">
              <div className="card" style={{ border: "2px solid black" }}>
                <div className="card-body">
                  <img class="card-img-top" style={{ width: "50%" }} src="pictures/searchspace3.png" alt="searchspace" />
                  <h5 className="card-title mt-3">Book</h5>
                  <p className="text-muted">Book space which you searched by your convenience by paying standard amount.<br /> Trusted And Affordable</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4  mt-5">
              <div className="card" style={{ border: "2px solid black" }}>
                <div className="card-body">
                  <img class="card-img-top"  style={{ width: "50%" }} src="pictures/searchspace4.jpeg" alt="searchspace" />
                  <h5 className="card-title mt-3">Park</h5>
                  <p className="text-muted">Park vehicle on your dedicated space for the period of time you have booked for. Safe And Secure.</p>
                </div>
              </div>
            </div>
          </div>
        </center>

      </div>
      <Footer />
      <ToastContainer position={toast.POSITION.TOP_CENTER} />
    </div>
  )
}

export default BookaSlot;
