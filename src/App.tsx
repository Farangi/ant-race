import React from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './routes/PrivateRoute';
import { ROUTE_NAMES } from './routes/route_names';


const App = ()=> {
  return (
    <Router>
        <Switch>
          <Route path={ROUTE_NAMES.login} exact={true} >
            <Login />
          </Route>
          <PrivateRoute path={ROUTE_NAMES.home} exact={true} >
            <Home />
          </PrivateRoute>
        </Switch>
    </Router>
  );
}

export default App;
