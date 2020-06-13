import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import LoginAndRegister from './pages/LoginAndRegister';
import PageAdmin from './pages/PageAdmin';

function App() {
  return (
    <Switch>
      <Route exact path='/home' component={PageAdmin} />
      <Route path='/' component={LoginAndRegister} />
    </Switch>
  );
}

export default App;
