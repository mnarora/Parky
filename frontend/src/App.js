import React, { Component } from 'react';
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import Ownerlogin from './Components/ownerlogin';
import OwnerRegister from './Components/OwnerRegister';
import UserRegister from './Components/UserRegister';
import BookaSlot from './Components/BookaSlot';
import Payment from './Components/Payment';
import ResetPassword from './Components/ResetPassword';
import GoogleMap from './Components/GoogleMap'
import AddParkingSpace from './Components/AddParkingSpace';
import GetDirections from './Components/GetDirections';
import Profile from './Components/Profile';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import BookingHistory from './Components/BookingHistory';
import EditProfile from './Components/EditProfile';
import BookSpace from './Components/BookSpace';

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route 
        {...props} 
        render={props => (
          sessionStorage.getItem('isuser') ?
            <Component {...props} /> :
            <Redirect to='/' />
        )} 
      />
    )
  }
}


class App extends Component { 

  render() {
    return (
      <div className="App">
      <BrowserRouter >
        <Switch>
          
          <Route path="/" exact component={Homepage} />
          <Route path="/userlogin" exact component={Login} />
          <Route path="/ownerlogin" exact component={Ownerlogin}/>
          <Route path="/ownerregister" exact component={OwnerRegister} />
          <Route path="/userregister" exact component={UserRegister} />
          <ProtectedRoute path="/bookaslot" exact component={GoogleMap} />
          <ProtectedRoute path="/searchspace" exact component={BookaSlot} />
          <Route path="/payment" exact component={Payment} />
          <Route path="/resetpassword" exact component={ResetPassword} />
          <ProtectedRoute path="/bookaslot" exact component={BookaSlot} />
          <Route path="/getdirections" exact component={GetDirections} />
          <ProtectedRoute path="/ParkingSpace/Add" exact component={AddParkingSpace} />
          <ProtectedRoute path="/profile" exact component={Profile} />
          <ProtectedRoute path="/bookinghistory" exact component={BookingHistory} />
          <Route path="/editprofile/:email" exact component={EditProfile}  />
          <Route path="/bookspace" exact component={BookSpace}/>
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
