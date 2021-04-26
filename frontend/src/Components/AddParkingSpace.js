import React, { useState, useRef, useEffect } from 'react';
import NavigationBar from './Navigationbar';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import addparking from '../CSS/AddParkingSpace.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';


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
    updateQuery(prevState => ({ ...prevState, address: query }));
}

export default function AddParkingSpace(props) {
    const [state, setState] = useState({
        email: '',
        price: '',
        address: '',
        info: '',
        surfacetype: 'Covered',
        spacenumber: 0,
        accepted_vehicles: [],
        isVerified: false,
        filename: '',
        filepath: '',
    })
    const [file, setFile] = useState('')
    const [filename, setFileName] = useState('Upload Document')
    const userType  = window.sessionStorage.getItem('userType')
       
        if(userType === 'user' ) {
            props.history.push({
                pathname: "/searchspace",
                
            });
        }
    /* eslint-enable */
    const onSubmit = async (event) => {
        event.preventDefault();
        state.email = sessionStorage.useremail
        const formData = new FormData();
        formData.append('file', file);
        formData.append('address', state.address)
        try {
            await axios.post(process.env.REACT_APP_BACKEND + '/uploadfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });


        } catch (error) {
            toast.error(error)
        }

        axios.post(process.env.REACT_APP_BACKEND + '/parkingspace/add', state)
            .then(res => {
                if (res.data.error)
                    toast.error(res.data.error)
                else {
                    props.history.push('/parkingspace/add')
                    toast.success(res.data.msg)
                    window.location.reload();
                }
            })
            .catch(err => {
                toast.error(err)
            })
    }

    const autoCompleteRef = useRef(null);

    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API}&libraries=places`,
            () => handleScriptLoad(setState, autoCompleteRef)
        );
    }, []);

    const fileUpload = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        const name = e.target.files[0].name.split('.')[1]
        const filenamee = state.address + '.' + name
        setState(prevState => ({ ...prevState, filename: filenamee }))
        const filepath = 'uploads/' + filenamee
        setState(prevState => ({ ...prevState, filepath: filepath }))
    }

    const checkPrice = () => {
        if (document.getElementById("price").value < 30) {
            document.getElementById("pricemsg").style.color = "red";
            document.getElementById("pricemsg").innerHTML = "Price should be greater than Rs 30";
            document.getElementById("submit").disabled = true
        }
        else {
            document.getElementById("pricemsg").innerHTML = '';
            document.getElementById("submit").disabled = false
        }
    }



    return (
        <div  >
            <NavigationBar />

            <div >
                <div style={{ backgroundColor: "darkblue", height: "75%" }}>
                    <br /><br />
                    <h1 align="center" style={{ color: "white", fontWeight: "900" }}>Earn by renting your Parking Spaces only on Parky</h1>
                    <center className="mt-5 container">
                        <img style={{ height: "auto", width: "100%", maxWidth: "700px", paddingBottom: '13vh' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxW3DxJt3zOn-vdMUVVbeIKj39lyinCUS0pRiTwyOWxqvRM_73qfoNMoRjyJIFcCrykCk&usqp=CAU" alt="ParkingspaceImage" />
                    </center>

                </div>
                <Container style={{ backgroundColor: "#039be5", marginTop: "100px ", paddingTop: "30px", boxShadow: "0 12px 16px 0 rgba(2, 1, 1, 0.623)" }}>
                    <h1 style={{ textAlign: 'center' }}><b>Add Parking Space</b></h1>
                    <Form style={{ width: '70%', maxWidth: '600px', alignItems: "center", marginTop: "40px", margin: "auto" }} onSubmit={onSubmit}>

                        <FormGroup>
                            <Label for="examplePrice" hidden>Password</Label>
                            <Input
                                type="number"
                                name="password"
                                id="price"
                                min="30"
                                placeholder="Cost of Space"
                                required
                                onChange={(event) => { setState(prevState => ({ ...prevState, price: event.target.value })); checkPrice(); }}
                            />
                            <span id="pricemsg" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleAddress" hidden>Address</Label>
                            <input
                                type="textarea"
                                name="address"
                                id="exampleAddress"
                                placeholder="Address"
                                style={{ width: '100%', color: 'black', backgroundColor: 'white', fontSize: '16px', paddingLeft: '12px', padding: '6px', border: 'white' }}
                                required
                                value={state.address}
                                ref={autoCompleteRef}
                                onChange={(e) => setState(prevState => ({ ...prevState, address: e.target.value }))}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleAddress" hidden>Info</Label>
                            <Input
                                type="textarea"
                                name="address"
                                id="exampleAddress"
                                placeholder="Info"
                                onChange={(e) => setState(prevState => ({ ...prevState, info: e.target.value }))}
                            />
                        </FormGroup>


                        <FormGroup>
                            <Label for="exampleSelect" hidden>Surface Type</Label>
                            <Input
                                type="select"
                                name="select"
                                id="exampleSelect"
                                onChange={(e) => setState(prevState => ({ ...prevState, surfacetype: e.target.value }))}
                            >
                                <option>Covered</option>
                                <option>Partially Covered</option>
                                <option>Underground</option>
                                <option>Not Covered</option>
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
                                min="1"
                                onChange={(e) => setState(prevState => ({ ...prevState, spacenumber: e.target.value }))}
                            />

                        </FormGroup>



                        <FormGroup style={{ border: '1px solid #ced4da', backgroundColor: '#fff', color: '#495057', borderRadius: '.25rem' }}>
                            <p style={{ marginLeft: '20px', marginTop: '20px' }}>Accepted Vehicles</p>
                            <FormGroup check style={{ marginLeft: '20px', marginTop: '20px' }}>
                                <Input
                                    id="radio1" type="radio"
                                    name="radio1"
                                    style={{ width: '10px', height: '10px' }}
                                    value='Car'
                                    onChange={(e) => {
                                        if (document.getElementById('radio1').checked) {
                                            setState(prevState => ({
                                                ...prevState,
                                                accepted_vehicles: [...prevState.accepted_vehicles, e.target.value]

                                            }))
                                        }
                                    }
                                    }
                                />
                                <Label check for="radio1-option1" style={{ color: '#495057' }}>
                                    Car
                            </Label>
                            </FormGroup>

                            <FormGroup check style={{ marginLeft: '20px', marginTop: '20px' }}>
                                <Input
                                    id="radio2"
                                    type="radio"
                                    name="radio2"
                                    value='MotorCycle'
                                    style={{ width: '10px', height: '10px' }}
                                    onChange={(e) => {
                                        if (document.getElementById('radio2').checked) {
                                            setState(prevState => ({
                                                ...prevState,
                                                accepted_vehicles: [...prevState.accepted_vehicles, e.target.value]
                                            }))
                                        }
                                    }

                                    }
                                />
                                <Label check for="radio1-option2" style={{ color: '#495057' }}>
                                    MotorCycle
                            </Label>
                            </FormGroup>

                            <FormGroup check style={{ marginLeft: '20px', marginTop: '20px' }}>
                                <Input
                                    id="radio3" type="radio"
                                    name="radio3"
                                    value='Bus'
                                    style={{ width: '10px', height: '10px' }}
                                    onChange={(e) => {
                                        if (document.getElementById('radio3').checked) {
                                            setState(prevState => ({
                                                ...prevState,
                                                accepted_vehicles: [...prevState.accepted_vehicles, e.target.value]
                                            }))
                                        }

                                    }}
                                />
                                <Label check for="radio1" style={{ color: '#495057' }}>
                                    Bus
                            </Label>
                            </FormGroup>

                            <FormGroup check style={{ marginLeft: '20px', marginTop: '20px' }}>
                                <Input
                                    id="radio4" type="radio"
                                    name="radio4"
                                    value='Truck'
                                    style={{ width: '10px', height: '10px' }}
                                    onChange={(e) => {
                                        if (document.getElementById('radio4').checked) {
                                            setState(prevState => ({
                                                ...prevState,
                                                accepted_vehicles: [...prevState.accepted_vehicles, e.target.value]
                                            }))
                                        }

                                    }}
                                />
                                <Label check for="radio1" style={{ color: '#495057' }}>
                                    Truck
                            </Label>
                            </FormGroup>

                            <FormGroup check style={{ marginLeft: '20px', marginTop: '20px', marginBottom: '20px' }}>
                                <Input
                                    id="radio5" type="radio"
                                    name="radio5"
                                    value='MiniBus/Van'
                                    style={{ width: '10px', height: '10px' }}
                                    onChange={(e) => {
                                        if (document.getElementById('radio5').checked) {
                                            setState(prevState => ({
                                                ...prevState,
                                                accepted_vehicles: [...prevState.accepted_vehicles, e.target.value]
                                            }))
                                        }
                                    }}
                                />
                                <Label check for="radio1-option5" style={{ color: '#495057' }}>
                                    MiniBus/ Van
                            </Label>
                            </FormGroup>


                        </FormGroup>
                        <FormGroup>

                            <div class="custom-file">
                                <input type="file" class="custom-file-input" required id="customFile" accept=".pdf,.doc, .docx" onChange={fileUpload} />
                                <label class="custom-file-label" for="customFile">{filename}</label>
                            </div>
                        </FormGroup>

                        <div >
                            <center>
                                <div className="row" style={{ justifyContent: 'center' }}>
                                    <div className="col-sm-3">
                                        <Button className={addparking.buttonn} id="submit" style={{ backgroundColor: "black", width: '120px' }} onSubmit={onSubmit}>Submit</Button>
                                    </div>
                                </div>
                            </center>
                        </div>
                        <br /><br />
                    </Form>
                </Container>
            </div>
            <Footer />
            <ToastContainer position={toast.POSITION.TOP_CENTER} />
        </div>
    );
}