import React, { Component } from 'react';
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import Ownerlogin from './Components/ownerlogin';
import OwnerRegister from './Components/OwnerRegister';
import UserRegister from './Components/UserRegister';
import BookaSlot from './Components/BookaSlot';
import ResetPassword from './Components/ResetPassword';
import GoogleMap from './Components/GoogleMap'
import AddParkingSpace from './Components/AddParkingSpace';
import Profile from './Components/Profile';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import BookingHistory from './Components/BookingHistory';
import EditProfile from './Components/EditProfile';
import BookSpace from './Components/BookSpace';
import MySpaces from './Components/MySpace';
import EditParkingSpace from './Components/EditParkingSpace'
import NotFoundPage from './Components/NotFoundPage';


class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route 
        {...props} 
        render={props => (
          sessionStorage.getItem('useremail') ?
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
            sessionStorage.getItem('isuser') === 'true' ?
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
          <ProtectedRoute path="/profile" exact component={Profile} />
          <ProtectedRoute path="/editprofile/:email" exact component={EditProfile}  />
          <Route path="/resetpassword" exact component={ResetPassword} />
          <ProtectedRoute path="/bookspace" exact component={BookSpace}/>
          <ProtectedRoute path="/parkingSpace/add" exact component={AddParkingSpace} />
            <ProtectedRoute path="/bookaslot" exact component={GoogleMap} />
            <ProtectedRoute path="/searchspace" exact component={BookaSlot} />
            
            <ProtectedRoute path="/bookinghistory" exact component={BookingHistory} />
            <ProtectedRoute path="/myspaces" exact component={MySpaces}/>
            <ProtectedRoute path="/editparkingspace/:id" exact component={EditParkingSpace}/>
          <Route path="*" component={NotFoundPage} />
          

        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
