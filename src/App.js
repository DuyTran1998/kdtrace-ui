import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import LoginAndRegister from './pages/LoginAndRegister';
import AdminPage from './pages/AdminPage';
import KDTracePage from './pages/KDTracePage';

function App() {
  return (
    <Switch>
      <Route exact path='/admin' component={AdminPage} />
      <Route path='/dashboard' component={ KDTracePage } />
      <Route path='/' component={LoginAndRegister} />

    </Switch>
  );
}

export default App;
