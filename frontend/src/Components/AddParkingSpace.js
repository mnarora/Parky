import React, { Component } from 'react';
import NavigationBar from './Navigationbar';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../CSS/AddParkingSpace.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class AddParkingSpace extends Component {
    /* eslint-disable */ 
    state = {
        email: '',
        password: '',
        address: '',
        info: '',
        surfacetype: '',
        spacenumber: 0,
        accepted_vehicles: ['bicycle'],
        imagePreviewUrl: ''
    }

    /* eslint-enable */
    onSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)
        axios.post('http://localhost:3001/parkingspace/add', this.state)
        .then(res => {
            if (res.data.error)
                toast.error(res.data.error)
            else {
                this.props.history.push('/')
                toast.success(res.data.msg)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }


   

    handleImageChange  = (e) => {
        e.preventDefault()
        let reader = new FileReader();
        let image = e.target.files[0];
    
        reader.onloadend = () => {
            this.setState({
            imagePreviewUrl: reader.result
            });
        }
    
        reader.readAsDataURL(image)
    }

    render() {

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <div  >
                <NavigationBar />

                <div >
                    <div style={{backgroundColor : "blueviolet", height: "50vh"}}>
                        <br /><br />
                        <h1 align="center" style={{color : "white", fontWeight: "900"}}>Earn by renting your Parking Spaces only on Parky</h1>
                        <center className="mt-5">
                        <img style={{height : "auto", width: "100%", maxWidth: "700px"}}  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxW3DxJt3zOn-vdMUVVbeIKj39lyinCUS0pRiTwyOWxqvRM_73qfoNMoRjyJIFcCrykCk&usqp=CAU" />
                        </center>

                    </div>
                    <h1 style={{ textAlign: 'center' }}>Add Parking Space</h1>
                    <Form style={{ width: '50%', marginLeft: '450px' }} onSubmit= {this.onSubmit}> 
                        <FormGroup>
                            <Label for="exampleEmail" hidden>Email</Label>
                            <Input 
                                type="email" 
                                name="email" 
                                id="exampleEmail" 
                                placeholder="Email" 
                                required
                                onChange={(e) => this.setState({email : e.target.value})}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="examplePassword" hidden>Password</Label>
                            <Input 
                                type="password" 
                                name="password" 
                                id="examplePassword" 
                                placeholder="Password" 
                                required
                                onChange={(e) => this.setState({password : e.target.value})}
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
                                onChange={(e) => this.setState({address : e.target.value})}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleAddress" hidden>Info</Label>
                            <Input
                                type="textarea"
                                name="address"
                                id="exampleAddress"
                                placeholder="Info"
                                onChange={(e) => this.setState({info : e.target.value})}
                            />
                        </FormGroup>


                        <FormGroup>
                            <Label for="exampleSelect" hidden>Surface Type</Label>
                            <Input 
                            type="select" 
                            name="select" 
                            id="exampleSelect"
                            onChange={(e) => this.setState({surfacetype : e.target.value})}
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
                            onChange={(e) => this.setState({spacenumber : e.target.value})}
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
                                            this.setState((prevState) => {
                                                aacepted_vehicles : prevState.accepted_vehicles.concat(rate_value)
                                            })
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
                                            this.setState((prevState) => {
                                                accepted_vehicles : prevState.accepted_vehicles.concat(rate_value)
                                            })
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
                                            this.setState((prevState) => {
                                                accepted_vehicles : prevState.accepted_vehicles.concat(value2)
                                            })
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
                                            this.setState((prevState) => {
                                                //vehicles : prevState.vehicles.concat(value3)
                                                accepted_vehicles : prevState.accepted_vehicles.concat(value3)
                                            })
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
                                            this.setState((prevState) => {accepted_vehicles :prevState.accepted_vehicles.concat(value4)})
                                        }
                                          console.log(this.state)  
                                    }}
                                />
                                <Label check for="radio1-option5" style ={{color: '#495057'}}>
                                    MiniBus/ Van
                                </Label>
                            </FormGroup>

                        
                        </FormGroup>

                        <input 
                            className="fileInput" 
                            type="file" 
                            placeholder = 'Choose image of the parking space'
                            onChange={(e)=>this.handleImageChange(e)} 
                        />
                        <div className="imgPreview">
                            {$imagePreview}
                        </div>
                        <div style={{display: 'inline-flex', marginLeft: '20px'}}>
                            <Button>Cancel</Button>
                            <Button style={{marginLeft: '40px'}} onSubmit= {this.onSubmit}>Submit</Button>
                        </div>
                    
                    </Form>

                </div>
                <ToastContainer position={toast.POSITION.TOP_CENTER}/>
            </div>
        )
    }
}

