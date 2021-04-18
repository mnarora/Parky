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
import MySpaces from './Components/MySpace';
import EditParkingSpace from './Components/EditParkingSpace'


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

class LoggedInRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route 
        {...props} 
        render={props => (
          sessionStorage.getItem('useremail') ? (
            sessionStorage.getItem('isuser') ?
            (<Redirect to='/searchspace' />):
            (<Redirect to='/parkingspace/add' />)
          ):
          (<Component {...props} />)
          
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
          <LoggedInRoute path="/" exact component={Homepage} />
          <LoggedInRoute path="/userlogin" exact component={Login} />
          <LoggedInRoute path="/ownerlogin" exact component={Ownerlogin}/>
          <LoggedInRoute path="/ownerregister" exact component={OwnerRegister} />
          <LoggedInRoute path="/userregister" exact component={UserRegister} />
          <ProtectedRoute path="/bookaslot" exact component={GoogleMap} />
          <ProtectedRoute path="/searchspace" exact component={BookaSlot} />
          <Route path="/payment" exact component={Payment} />
          <LoggedInRoute path="/resetpassword" exact component={ResetPassword} />
          <ProtectedRoute path="/bookaslot" exact component={BookaSlot} />
          <Route path="/getdirections" exact component={GetDirections} />
          <ProtectedRoute path="/ParkingSpace/Add" exact component={AddParkingSpace} />
          <ProtectedRoute path="/profile" exact component={Profile} />
          <ProtectedRoute path="/bookinghistory" exact component={BookingHistory} />
          <Route path="/editprofile/:email" exact component={EditProfile}  />
          <Route path="/bookspace" exact component={BookSpace}/>
          <Route path="/myspaces" exact component={MySpaces}/>
          <Route path="/editparkingspace/:id" exact component={EditParkingSpace}/>
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
