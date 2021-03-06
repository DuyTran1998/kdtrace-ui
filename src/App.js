import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navigation from './components/Navigation';
import Menu from './components/Menu';
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
  componentWillMount() {
    if (typeof window !== undefined) {
      if (localStorage && localStorage.getItem('token')) {
        this.setState({ token: localStorage.getItem('token') })
      } else if (window.location.pathname !== "/register") {
        history.push('/login');
      }
      window.onstorage = (e) => {
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
    return (
      <Router history={history}>
        {
          token ?
            <React.Fragment>
              <Navigation token={this.state.token} />
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
