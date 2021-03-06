import React, { Component } from 'react';
import Homepage from './Homepage';
import Login from './Login';
import OwnerRegister from './OwnerRegister';
import UserRegister from './UserRegister';
import BookaSlot from './BookaSlot';
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
            <Redirect to='/login' />
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
          <Route path="/login" exact component={Login} />
          <Route path="/ownerregister" exact component={OwnerRegister} />
          <Route path="/userregister" exact component={UserRegister} />
          <ProtectedRoute path="/bookaslot" exact component={BookaSlot} />
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
