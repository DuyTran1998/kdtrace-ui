import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from '../components/Login';
import Register from '../components/Register';

class LoginAndRegister extends Component {
    render() {
        return (
            <div>
                <div className="app-content content">
                    <div className="content-wrapper">
                        <div className="content-header row">
                        </div>
                        <div className="content-body">
                            <section className="flexbox-container">
                                <div className="col-12 d-flex align-items-center justify-content-center">
                                    <Switch>
                                        <Route exact path='/' component={Login}/>
                                        <Route path='/login' component={Login}/>
                                        <Route path='/register' component={Register}/>
                                    </Switch>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default LoginAndRegister;