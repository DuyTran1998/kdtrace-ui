import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { isLoggedIn } from '../services/Authentication.js';
import history from '../utils/@history';
import {API_REGISTER} from '../constants/API/api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            roleName: '',
            success: null,
            message: '',
            status: '',
            alertMessage: '',
            alertSuccess: false,
            alertFail: false,
        }
    }
    componentDidMount() {
        if (typeof localStorage !== undefined) {
            if(localStorage.getItem('token')) {
                history.push('/');
            }
        }
    }

    handleSubmit = e => {
        const registerModel = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            roleName: this.state.roleName,
        };
        fetch(API_REGISTER, {
            method: "POST",
            body: JSON.stringify(registerModel),
            cache: 'no-cache',
            //mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(response => response.json())
            .then(jsonResponse => {
                if(jsonResponse.status === 200){
                    this.handleOpenAlert('success', jsonResponse.message);
                    history.push('/login')
                    window.location.reload()
                }
                else{
                    this.handleOpenAlert('fail', jsonResponse.message);
                }
            })
        e.preventDefault();
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        return true;
    }

    handleChangeSelected = e => {
        this.setState({ 'roleName': e.target.value });
    }

    handleOpenAlert = (flag, message) => {
        if (flag === 'success') {
            this.setState({ alertSuccess: true });
        }
        if (flag === 'fail') {
            this.setState({ alertFail: true })
        }
        this.setState({ alertMessage: message });
    }
    handleCloseAlert = e => {
        this.setState({ alertSuccess: false, alertFail: false });
    }
    render() {
        if (isLoggedIn()) {
            return (<Redirect to="/admin" />);
        }
        if (this.state.status === 200) {
            return (<Redirect to="/login" />);
        }
        return (
            <div>
                <div className="app-content content">
                    <div className="content-wrapper">
                        <div className="content-header row">
                        </div>
                        <div className="content-body">
                            <section className="flexbox-container">
                                <div className="col-12 d-flex align-items-center justify-content-center">
                                    <div className="col-md-4 col-10 box-shadow-2 p-0">
                                        <div className="card border-grey border-lighten-3 px-2 py-2 m-0">
                                            <div className="card-header border-0">
                                                <div className="card-title text-center">
                                                    <img src="../../../app-assets/images/logo/logo-dark.png" alt="branding logo" />
                                                </div>
                                                <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2"><span>Create Account</span></h6>
                                            </div>
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <form className="form-horizontal form-simple" onSubmit={this.handleSubmit}>
                                                        <fieldset className="form-group position-relative has-icon-left mb-1">
                                                            <input type="text" className="form-control form-control-lg input-lg" id="user-name" placeholder="User Name" name="username" required onChange={this.handleChange} />
                                                            <div className="form-control-position">
                                                                <i className="ft-user"></i>
                                                            </div>
                                                        </fieldset>
                                                        <fieldset className="form-group position-relative has-icon-left mb-1">
                                                            <input type="email" className="form-control form-control-lg input-lg" id="user-email" placeholder="Your Email Address" name="email" required onChange={this.handleChange} />
                                                            <div className="form-control-position">
                                                                <i className="ft-mail"></i>
                                                            </div>
                                                        </fieldset>
                                                        <fieldset className="form-group position-relative has-icon-left" style={{ marginBottom: '0px' }}>
                                                            <input type="password" className="form-control form-control-lg input-lg" id="user-password" placeholder="Enter Password" name="password" required onChange={this.handleChange} />
                                                            <div className="form-control-position">
                                                                <i className="fa fa-key"></i>
                                                            </div>
                                                        </fieldset>
                                                        <select className="custom-select d-block w-100" id="country" required="" style={{ marginBottom: '15px' }} onChange={this.handleChangeSelected}>
                                                            <option value="">Choose Type Account...</option>
                                                            <option value="ROLE_PRODUCER">Producer</option>
                                                            <option value="ROLE_TRANSPORT">Transport</option>
                                                            <option value="ROLE_DISTRIBUTOR">Distrubutor</option>
                                                        </select>
                                                        <button type="submit" className="btn btn-info btn-lg btn-block"><i className="ft-unlock"></i> Register</button>
                                                    </form>
                                                </div>
                                                <p className="text-center">Already have an account ? <a href="/login" className="card-link">Login</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <Snackbar open={this.state.alertSuccess} onClose={this.handleCloseAlert}
                    autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                    <Alert severity="success" style={{ fontSize: '15px' }}>{this.state.alertMessage}</Alert>
                </Snackbar>
                <Snackbar open={this.state.alertFail} onClose={this.handleCloseAlert}
                    autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                    <Alert severity="error" style={{ fontSize: '15px' }}>{this.state.alertMessage}</Alert>
                </Snackbar>
            </div>
        );
    }
}
export default Register;