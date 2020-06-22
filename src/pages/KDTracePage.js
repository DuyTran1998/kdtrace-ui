import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import ProducerBody from '../components/ProducerBody';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Menu from '../components/Menu';
import Home from '../components/Home';
import UserList from '../components/UserList';

class KDTracePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            role: ''
        }
    }
    componentDidMount() {
        const url = "http://localhost:8080/api/getUserLogged";
        fetch(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                this.setState({
                    username: jsonResponse.username,
                    role: jsonResponse.role.roleName
                })
            })
    }

    render() {
        return (
            <div className="horizontal-layout horizontal-menu horizontal-menu-padding 2-columns   menu-expanded" data-open="hover" data-menu="horizontal-menu" data-col="2-columns">
                <Navigation username={this.state.username} />
                <Menu roleName={this.state.role} />
                <Router>
                    <Switch>
                        <Route exact path="/" render={(props) => <Home {...props} role={this.state.role} />} />
                        <Route path="/admin" Component={UserList} />
                    </Switch>
                </Router>
            </div>
        )
    }
} export default KDTracePage;