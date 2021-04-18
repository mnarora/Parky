import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import mySpace from '../CSS/MySpace.module.css';
import NavigationBar from './Navigationbar';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class MySpace extends Component{
    state = {
        myspaces : [],
        imagePreviewUrl: ''
    }

    componentDidMount() {
        if (sessionStorage.useremail) {
           // this.setState({email:sessionStorage.useremail});
            
            
            axios.get('http://localhost:3001/myspaces/' + sessionStorage.useremail)
            .then(res => {
               
                this.setState({
                  myspaces : res.data.myspaces
                })
            })

           
        }
        else{
            console.log("No user")
        }
    }

    deleteParkingSpaceHandler = (id) => {
        console.log('deleteing')
        console.log(id)
        axios.delete('http://localhost:3001/deleteparkingspace/'+ id)
        .then(res => {
            this.props.history.push('/myspaces')
            toast.success("Parking Space deleted")
        })
        .catch(err => {
            console.log(err)
        })
    }
    editParkingSpaceHandler = (id) => {
        console.log(id)
       
        this.props.history.push(`/editparkingspace/${id}`)
       
    }
    render(){
        return(
            
            <div className={mySpace.mainPage}>
                <NavigationBar/>
                <Container>
                    <h1 style= {{textAlign : 'center', marginTop: '50px'}}><u>Parking Spaces</u></h1>
                {this.state.myspaces.map(space => (
                        
                    <main>
                        <section className={mySpace.about}>
                            <h1>{space.address}</h1>
                            <h3>{space.info}</h3>
                            <h5>{space.surfacetype}</h5>
                            <p>{"Number of Parking Spaces: " +  space.spacenumber}</p>
                            <p>{"Cost of Space: " + space.price}</p>
                            
                            <Button className = {mySpace.buttonn} onClick= {() => this.editParkingSpaceHandler(space._id)}>Edit</Button>
                            <Button className = {mySpace.buttonn} onClick= {() => this.deleteParkingSpaceHandler(space._id)}>Delete</Button>
                        </section>
                    </main>
                   
                ))}
                   
                </Container>
                
               
            </div>
        )
    }
}