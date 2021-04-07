import React, { useState, useEffect, useRef } from "react";
import NavigationBar from './Navigationbar';
import css from '../CSS/BookaSlot.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';


    

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
    
      useEffect(() => {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=AIzaSyBPThzljDTi_ZRsR-Xg3R05x2xP9OAieaE&libraries=places`,
          () => handleScriptLoad(setQuery, autoCompleteRef)
        );
      }, []);
    
    //   return (
    //     <div className="search-location-input">
    //       <input
    //         ref={autoCompleteRef}
    //         onChange={event => setQuery(event.target.value)}
    //         placeholder="Enter a City"
    //         value={query}
    //       />
    //     </div>
    //  .loggedin    
    
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

                    <button className="mt-5" type="submit">Search Your Parking Space</button>
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br>


                </div>
                <ToastContainer position={toast.POSITION.TOP_CENTER}/>
            </div>
        )
        }

export default BookaSlot;



// import React, { useState, useEffect, useRef } from "react";

// let autoComplete;

// const loadScript = (url, callback) => {
//   let script = document.createElement("script");
//   script.type = "text/javascript";

//   if (script.readyState) {
//     script.onreadystatechange = function() {
//       if (script.readyState === "loaded" || script.readyState === "complete") {
//         script.onreadystatechange = null;
//         callback();
//       }
//     };
//   } else {
//     script.onload = () => callback();
//   }

//   script.src = url;
//   document.getElementsByTagName("head")[0].appendChild(script);
// };

// function handleScriptLoad(updateQuery, autoCompleteRef) {
//   autoComplete = new window.google.maps.places.Autocomplete(
//     autoCompleteRef.current,
//     { types: ["(cities)"], componentRestrictions: { country: "us" } }
//   );
//   autoComplete.setFields(["address_components", "formatted_address"]);
//   autoComplete.addListener("place_changed", () =>
//     handlePlaceSelect(updateQuery)
//   );
// }

// async function handlePlaceSelect(updateQuery) {
//   const addressObject = autoComplete.getPlace();
//   const query = addressObject.formatted_address;
//   updateQuery(query);
//   console.log(addressObject);
// }

// function BookaSlot() {
//   const [query, setQuery] = useState("");
//   const autoCompleteRef = useRef(null);

//   useEffect(() => {
//     loadScript(
//       `https://maps.googleapis.com/maps/api/js?key=AIzaSyBOyXCvDXaKICLWfcaGJXypYMSylUvy_jA&libraries=places`,
//       () => handleScriptLoad(setQuery, autoCompleteRef)
//     );
//   }, []);

//   return (
//     <div className="search-location-input">
//       <input
//         ref={autoCompleteRef}
//         onChange={event => setQuery(event.target.value)}
//         placeholder="Enter a City"
//         value={query}
//       />
//     </div>
//   );
// }

// export default BookaSlot;