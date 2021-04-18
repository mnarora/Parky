import React, { useState, useEffect, useRef } from "react";
import NavigationBar from './Navigationbar';
import css from '../CSS/BookaSlot.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Footer from './Footer';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';


    

    const onChangeHandler = (val, event, setValues) => {
      setValues(prevstate => ({
        ...prevstate,
        val:event.target.value
      }))
    }

    const onSubmit = (values, props) =>{
      axios.post('http://localhost:3001/parkingspace/add', values)
      .then(res => {
          if (res.data.error)
              toast.error(res.data.error)
          else {
              //props.history.push('/parkingspace/add')
              toast.success(res.data.msg)
          }
      })
      .catch(err => {
          console.log(err)
      })
    }

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
      updateQuery(prevstate => ({
        ...prevstate,
        address: query
      }));
      console.log(addressObject);
    }
    
    function Temp(props) {
      const [values, setValues] = useState({
        email: '',
        price: '',
        address: '',
        info: '',
        surfacetype: '',
        spacenumber: 0,
        accepted_vehicles: ['bicycle'],
    });
      const autoCompleteRef = useRef(null);
    
      useEffect(() => {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API}&libraries=places`,
          () => handleScriptLoad(setValues, autoCompleteRef)
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
                    onChange={event => setValues(prevstate => ({
                      ...prevstate,
                      address:event.target.value
                    }))}
                    value={values.address} placeholder="Enter Address"/>

                    <button className="mt-5" type="submit">Search Your Parking Space</button>
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                </div>
                <NavigationBar />
                
                <div >
                    <div style={{backgroundColor : "rgba(49, 2, 59, 0.856)", height: "50vh"}}>
                        <br /><br />
                        <h1 align="center" style={{color : "white", fontWeight: "900"}}>Earn by renting your Parking Spaces only on Parky</h1>
                        <center className="mt-5">
                        <img style={{height : "auto", width: "100%", maxWidth: "700px"}}  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxW3DxJt3zOn-vdMUVVbeIKj39lyinCUS0pRiTwyOWxqvRM_73qfoNMoRjyJIFcCrykCk&usqp=CAU" />
                        </center>

                    </div>
                    <Container style={{backgroundColor:"rgba(226, 171, 243, 0.658)", marginTop: "100px ",paddingTop: "30px", boxShadow: "0 12px 16px 0 rgba(2, 1, 1, 0.623)"}}>
                    <h1 style={{ textAlign: 'center' }}>Add Parking Space</h1>
                    <Form style={{ width: '50%', alignItems:"center" ,marginLeft: "270px", marginTop: "40px"}} onSubmit= {onSubmit(values, props)}> 
                        <FormGroup>
                            <Label for="exampleEmail" hidden>Email</Label>
                            <Input 
                                type="email" 
                                name="email" 
                                id="exampleEmail" 
                                placeholder="Email" 
                                required
                                onChange={(e) => onChangeHandler('email', e, setValues)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="examplePrice" hidden>Password</Label>
                            <Input 
                                type="text" 
                                name="password" 
                                id="examplePrice" 
                                placeholder="Cost of Space" 
                                required
                                onChange={(e) => onChangeHandler('price', e, setValues)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleAddress" hidden>Address</Label>
                            <Input
                                type="textarea"
                                name="address"
                                id="exampleAddress"
                                placeholder="Address"
                                required
                                ref={autoCompleteRef}
                                onChange={(e) => onChangeHandler('address', e, setValues)}
                                value={values.address}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleAddress" hidden>Info</Label>
                            <Input
                                type="textarea"
                                name="address"
                                id="exampleAddress"
                                placeholder="Info"
                                onChange={(e) => onChangeHandler('info', e, setValues)}
                            />
                        </FormGroup>


                        <FormGroup>
                            <Label for="exampleSelect" hidden>Surface Type</Label>
                            <Input 
                            type="select" 
                            name="select" 
                            id="exampleSelect"
                            onChange={(e) => onChangeHandler('surfacetype', e, setValues)}
                            >
                            <option>Covered</option>
                            <option>Partially Covered</option>
                            <option>Underground</option>
                            <option>Not Covered</option>
                            <option>5</option>
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleNumber" hidden>Number</Label>
                            <Input
                            type="number"
                            name="number"
                            id="exampleNumber"
                            placeholder="Number of Spaces"
                            required
                            onChange={(e) => onChangeHandler('spacenumber', e, setValues)}
                            />
                            
                        </FormGroup>

                       

                        <FormGroup style={{ border: '1px solid #ced4da', backgroundColor: '#fff' , color: '#495057', borderRadius: '.25rem'}}>
                            <p style={{ marginLeft: '20px',marginTop: '20px'}}>Accepted Vehicles</p>
                            <FormGroup check style={{ marginLeft: '20px',marginTop: '20px'}}>
                                <Input 
                                    id="radio1" type="radio" 
                                    name="radio1" 
                                    style={{ width: '10px', height: '10px' }} 
                                    value = 'Car'
                                    onChange = {() => {
                                        if (document.getElementById('radio1').checked) {
                                            let rate_value = document.getElementById('radio1').value;
                                            console.log(rate_value)
                                            setValues((prevState) => ({
                                                ...prevState,
                                                accepted_vehicles : prevState.accepted_vehicles.concat(rate_value)
                                            }))
                                          }
                                          
                                    }}

                                />
                                <Label check for="radio1-option1" style ={{color: '#495057'}}>
                                    Car
                                </Label>
                            </FormGroup>

                            <FormGroup check style={{ marginLeft: '20px', marginTop: '20px'}}>
                                <Input 
                                    id="radio2" 
                                    type="radio" 
                                    name="radio2" 
                                    value='MotorCycle'
                                    style={{ width: '10px', height: '10px' }} 
                                    onChange = {() => {
                                        if (document.getElementById('radio2').checked) {
                                            let rate_value = document.getElementById('radio2').value;
                                            console.log(rate_value)
                                            setValues((prevState) => ({
                                              ...prevState,
                                              accepted_vehicles : prevState.accepted_vehicles.concat(rate_value)
                                          }))
                                          }
                                          
                                    }
                                          
                                    }
                                />
                                <Label check for="radio1-option2" style ={{color: '#495057'}}>
                                    MotorCycle
                                </Label>
                            </FormGroup>

                            <FormGroup check style={{ marginLeft: '20px', marginTop: '20px'}}>
                                <Input 
                                    id="radio3" type="radio" 
                                    name="radio3" 
                                    value='Bus'
                                    style={{ width: '10px', height: '10px' }} 
                                    onChange = {() => {
                                        if (document.getElementById('radio3').checked) {
                                            let value2 = document.getElementById('radio3').value;
                                            console.log(value2)
                                            setValues((prevState) => ({
                                                ...prevState,
                                                accepted_vehicles : prevState.accepted_vehicles.concat(value2)
                                            }))
                                          }
                                          
                                    }}
                                />
                                <Label check for="radio1" style ={{color: '#495057'}}>
                                    Bus
                                </Label>
                            </FormGroup>

                            <FormGroup check style={{ marginLeft: '20px' ,marginTop: '20px'}}>
                                <Input 
                                    id="radio4" type="radio" 
                                    name="radio4" 
                                    value='Truck'
                                    style={{ width: '10px', height: '10px' }} 
                                    onChange = {() => {
                                        if (document.getElementById('radio4').checked) {
                                            let value3 = document.getElementById('radio4').value;
                                            console.log(value3)
                                            setValues((prevState) => ({
                                              ...prevState,
                                              accepted_vehicles : prevState.accepted_vehicles.concat(value3)
                                          }))
                                          }
                                          
                                    }}
                                />
                                <Label check for="radio1" style ={{color: '#495057'}}>
                                    Truck
                                </Label>
                            </FormGroup>

                            <FormGroup check style={{ marginLeft: '20px' ,marginTop: '20px', marginBottom: '20px'}}>
                                <Input 
                                    id="radio5" type="radio" 
                                    name="radio5" 
                                    value='MiniBus/Van'
                                    style={{ width: '10px', height: '10px' }} 
                                    onChange = {() => {
                                        if (document.getElementById('radio5').checked) {
                                            let value4 = document.getElementById('radio5').value;
                                            console.log(value4)
                                            setValues((prevState) => ({
                                              ...prevState,
                                              accepted_vehicles : prevState.accepted_vehicles.concat(value4)
                                          }))
                                        }
                                    }}
                                />
                                <Label check for="radio1-option5" style ={{color: '#495057'}}>
                                    MiniBus/ Van
                                </Label>
                            </FormGroup>

                        
                        </FormGroup>

                      
                        <div style={{display: 'inline-flex', marginLeft: '20px' , marginBottom: "50px"}}>
                            <Button>Cancel</Button>
                            <Button style={{marginLeft: '40px'}} onSubmit= {onSubmit(values, props)}>Submit</Button>
                        </div>
                    
                    </Form>
                    </Container>
                </div>
                
                <ToastContainer position={toast.POSITION.TOP_CENTER}/>
            </div>
        )
        }

export default Temp;
