import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navigation from './components/Navigation';
import AdminMenu from './components/AdminMenu';
import Menu from './components/Menu';
//import routes from './routes';
import routesAdmin from './routesAdmin';
import history from './utils/@history';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      username: '',
      role: ''
    }
  }
  componentDidMount() {
    if (typeof window !== undefined) {
      if (localStorage && localStorage.getItem('token')) {
        this.setState({ token: localStorage.getItem('token') })
      } else {
        history.push('/login');
      }
      window.onstorage = (e) => {
        console.log('event storage')
        if (e.key === 'token') {
          this.setState({ token: e.newValue });
        }
      }

    }

    document.addEventListener("addToken", (e) => {
      this.setState({ token: e.value });
    }, false);

    document.addEventListener("removeToken", (e) => {
      this.setState({ token: null });
    }, false);
  }

  render() {
    const showRoutes = (routes) => {
      var result = '';
      result = routes.map((route, index) => {
        return (
          <Route key={index} exact={route.exact} path={route.path} component={route.component} />
        )
      })
      return result;
    }
    const { token } = this.state;
    console.log("token",token);
    return (
      <Router history={history}>
        {
          token ?
            <React.Fragment>
              <Navigation token={this.state.token}/>
              <Menu />
            </React.Fragment> : null
        }
        <Switch>
          {
            showRoutes(routesAdmin)
          }
        </Switch>
      </Router>
    );
  }
}
export default App;
