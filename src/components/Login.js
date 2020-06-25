import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import img from './../assets/images/logo/logo-dark.png';
import history from '../utils/@history';
import {API_LOGIN} from '../constants/API/api'
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            roleName: '',
            isLogged: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.getUserLogged = this.getUserLogged.bind(this);
    }
    componentDidMount() {
        if (typeof localStorage !== undefined) {
            if(localStorage.getItem('token')) {
                history.push('/');
            }
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        return true;
    }

    // getUserLogged(token) {
    //     const url = "http://localhost:8080/api/getUserLogged";
    //     fetch(url, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(jsonResponse => {
    //             this.setState({
    //                 username: jsonResponse.username,
    //                 roleName: jsonResponse.role.roleName
    //             })
    //         })
    // }

    handleSubmit = e => {
        const url = API_LOGIN;
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
            .then(responseJson => {
                if (responseJson.status === 200) {
                    const token = responseJson.accessToken
                    let originalSetItem = localStorage.setItem;
                    localStorage.setItem = function(key, value) {
                    var event = new Event('addToken');

                    event.value = value; // Optional..
                    event.key = key; // Optional..

                    document.dispatchEvent(event);

                    originalSetItem.apply(this, arguments);
                    };
                    localStorage.setItem("token", token);
                    this.setState({ 'isLogged': true });
                    this.props.history.push('/');
                }
            })
            .catch(error => {
                console.log(error);
            })
        e.preventDefault();
    }
    render() {
        // if (this.state.isLogged) {
        //     return (<Redirect to="/" />);
        // }
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
                                        <div className="card border-grey border-lighten-3 m-0">
                                            <div className="card-header border-0">
                                                <div className="card-title text-center">
                                                    <div className="p-1"><img src={img} alt="branding logo" /></div>
                                                </div>
                                                <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2"><span>Login with KDTrace</span></h6>
                                            </div>
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <form className="form-horizontal form-simple" onSubmit={this.handleSubmit}>
                                                        <fieldset className="form-group position-relative has-icon-left mb-0">
                                                            <input type="text" className="form-control form-control-lg input-lg" id="user-name" placeholder="Your Username" name="username" required onChange={this.handleChange} />
                                                            <div className="form-control-position">
                                                                <i className="ft-user"></i>
                                                            </div>
                                                        </fieldset>
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="password" className="form-control form-control-lg input-lg" id="user-password" placeholder="Enter Password" name="password" required onChange={this.handleChange} />
                                                            <div className="form-control-position">
                                                                <i className="fa fa-key"></i>
                                                            </div>
                                                        </fieldset>
                                                        <div className="form-group row">
                                                            <div className="col-md-6 col-12 text-center text-md-left">
                                                                <fieldset>
                                                                    <input type="checkbox" id="remember-me" className="chk-remember" />
                                                                    <label htmlFor="remember-me"> Remember Me</label>
                                                                </fieldset>
                                                            </div>
                                                            <div className="col-md-6 col-12 text-center text-md-right"><a href="recover-password.html" className="card-link">Forgot Password?</a></div>
                                                        </div>
                                                        <button type="submit" className="btn btn-info btn-lg btn-block"><i className="ft-unlock"></i> Login</button>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div className="">
                                                    <p className="float-sm-right text-center m-0">New to Moden Admin? <a href="/register" className="card-link">Sign Up</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default withRouter(Login);