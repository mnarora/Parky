import Homepage from './Homepage';
import Login from './Login';
import OwnerRegister from './OwnerRegister';
import UserRegister from './UserRegister';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <BrowserRouter >
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/login" exact component={Login} />
        <Route path="/ownerregister" exact component={OwnerRegister} />
        <Route path="/userregister" exact component={UserRegister} />
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
