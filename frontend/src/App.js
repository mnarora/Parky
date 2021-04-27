import React, { Component } from 'react';
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import OwnerRegister from './Components/OwnerRegister';
import UserRegister from './Components/UserRegister';
import SearchSpace from './Components/SearchSpace';
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
import UserBookingDetails from './Components/UserBookingDetails';
import AdminPage from './Components/AdminPage';
import ShowUsers from './Components/ShowUsers';
import ShowSpaces from './Components/ShowSpaces';
import VerifySpace from './Components/VerifySpace';
import AdminEditProfile from './Components/AdminEditProfile';
import './CSS/global.css';

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
            sessionStorage.getItem('userType') === 'user' ?
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
          <LoggedInRoute path="/ownerregister" exact component={OwnerRegister} />
          <LoggedInRoute path="/userregister" exact component={UserRegister} />
          <LoggedInRoute path="/login" exact component={Login} />
          <LoggedInRoute path="/resetpassword" exact component={ResetPassword} />
          
          <ProtectedRoute path="/profile" exact component={Profile} />
          <ProtectedRoute path="/editprofile/:email" exact component={EditProfile}  />
          
          <ProtectedRoute path="/bookspace" exact component={BookSpace}/>
          <ProtectedRoute path="/parkingSpace/add" exact component={AddParkingSpace} />
            <ProtectedRoute path="/bookaslot" exact component={GoogleMap} />
            <ProtectedRoute path="/searchspace" exact component={SearchSpace} />
            <ProtectedRoute path="/adminpage" exact component={AdminPage} />
            <ProtectedRoute path="/bookinghistory" exact component={BookingHistory} />
            <ProtectedRoute path="/myspaces" exact component={MySpaces}/>
            <ProtectedRoute path="/editparkingspace/:id" exact component={EditParkingSpace}/>
            <ProtectedRoute path="/verifyspace/:id" exact component={VerifySpace}/>
            <ProtectedRoute path="/user-booking-details" exact component={UserBookingDetails}/>
            <ProtectedRoute path="/showusers" exact component={ShowUsers}/>
            <ProtectedRoute path="/showspaces" exact component={ShowSpaces}/>
            <ProtectedRoute path="/admineditprofile/:email" exact component={AdminEditProfile}/>
            <Route path="*" component={NotFoundPage} />
          

        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
