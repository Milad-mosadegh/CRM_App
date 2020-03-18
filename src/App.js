import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Signin from './components/css/signup';
import Login from './components/css/login';
import Dashboard from './components/Dashboard/dashboard'


function App() {
  return (
    <div >
      {/* When We Write Switch the position of component is not important */}
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/' component={Signin} />

      </Switch>
    </div>
  );
}

export default App;
