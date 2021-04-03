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
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route 
        {...props} 
        render={props => (
          localStorage.getItem('isuser') ?
            <Component {...props} /> :
            <Redirect to='/userlogin' />
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
          /<ProtectedRoute path="/bookaslot" exact component={BookaSlot} />
          <Route path="/payment" exact component={Payment} />
          <Route path="/resetpassword" exact component={ResetPassword} />
          <ProtectedRoute path="/bookaslot" exact component={BookaSlot} />
          <Route path="/ParkingSpace/Add"  exact component={AddParkingSpace} />
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
