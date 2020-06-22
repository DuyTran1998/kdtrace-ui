import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import LoginAndRegister from './pages/LoginAndRegister';
import PrivateRoute from './components/PrivateRoute';
import KDTracePage from './pages/KDTracePage';
import Navigation from './components/Navigation';
// import Menu from './components/Menu';
import Menu from './components/AdminMenu';
import routes from './routes';
import routeLogin from './routeLogin';
import history from './utils/@history';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
    }
  }
  componentDidMount() {
    if ( typeof window !== undefined ) {
      console.log('window is defined')
      console.log(localStorage.getItem('token'));
      if(localStorage && localStorage.getItem('token')) {
        this.setState({ token: localStorage.getItem('token')})
      } else {
        history.push('/login');
      }
      window.onstorage = (e) => {
        console.log('event storage')
        if (e.key === 'token') {
          console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          this.setState({ token: e.newValue });
        }
      }
      
    }
    window.addEventListener("storage", e =>
      console.log('Listen event')
      );
  }
  render() {
    console.log('rerender...........')
    const showRoutes = (routes) => {
      var result = '';
      result =  routes.map((route, index) => {
        return (
          <Route key={index} exact={route.exact} path={route.path} component={route.main?route.main:route.component} />
        )
      })
      return result;
    }
    const { token } = this.state;
    return (
      <React.Fragment>
        {
          token 
          ? <Router>
          <Navigation />
          <Menu />
          <Switch>
            {/* <PrivateRoute path="/auth" component={KDTracePage} />
            <Route path="/" component={LoginAndRegister} /> */}
            {
              showRoutes(routes)
            }
          </Switch>
        </Router> 
        : <Router>
          {
            showRoutes(routeLogin)
          }
        </Router>
        }
        
      </React.Fragment>
      
    );
  }

}
export default App;
