import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';
import '../assets/css/DropBox.css';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { API_GET_USER_CONTEXT } from '../constants/API/api';
import history from '../utils/@history';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            redirect: false,
            username: '',
        }
    }

    componentDidMount() {
        this.getUserContext(this.props.token);
    }

    getUserContext = (token) => {
        const url = API_GET_USER_CONTEXT;
        try {
            fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log({ response });
                    if (response.ok) {
                        console.log("voooo");
                        return response.json();
                    } else {
                        console.log("ra");
                        this.handleLogout();
                    }
                })
                .then(jsonResponse => {
                    if (jsonResponse) {
                        this.props.setUserContext(jsonResponse.username, jsonResponse.role.roleName);
                    }
                })
        } catch (e) {
            alert(e);
        }
    }


    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleRedirect = () => {
        history.push('/profile');
    }

    handleLogout = () => {
        // deleteAccessToken();
        let originalSetItem = localStorage.removeItem;
        localStorage.removeItem = function (key, value) {
            var event = new Event('removeToken');

            event.value = value; // Optional..
            event.key = key; // Optional..

            document.dispatchEvent(event);

            originalSetItem.apply(this, arguments);
        };
        localStorage.removeItem("token");
        this.props.deleteUserContext();
        this.setState({ redirect: true });
        this.props.history.push('/login');
    }

    render() {
        const open = Boolean(this.state.anchorEl);
        return (
            <nav className="header-navbar navbar-expand-md navbar navbar-with-menu navbar-static-top navbar-light navbar-border navbar-brand-center">
                <div className="navbar-wrapper">
                    <div className="navbar-header">
                        <ul className="nav navbar-nav flex-row">
                            <li className="nav-item"><a className="navbar-brand" href="."><img className="brand-logo" alt="robust admin logo" src="../../../app-assets/images/logo/logo-dark-sm.png" />
                                <h3 className="brand-text">KDTrace</h3></a></li>
                            <li className="nav-item d-md-none"><a className="nav-link open-navbar-container" data-toggle="collapse" href="!!#" data-target="!#navbar-mobile"><i className="fa fa-ellipsis-v"></i></a></li>
                        </ul>
                    </div>
                    <div className="navbar-container container center-layout">
                        <div className="collapse navbar-collapse" id="navbar-mobile">
                            <ul className="nav navbar-nav mr-auto float-left">
                            </ul>
                            <ul className="nav navbar-nav float-right">
                                <li className="dropdown dropdown-notification nav-item"><a className="nav-link nav-link-label" href="!!#" data-toggle="dropdown"><i className="ficon ft-bell"></i><span className="badge badge-pill badge-default badge-danger badge-default badge-up">5</span></a>
                                    <ul className="dropdown-menu dropdown-menu-media dropdown-menu-right">
                                        <li className="dropdown-menu-header">
                                            <h6 className="dropdown-header m-0"><span className="grey darken-2">Notifications</span></h6><span className="notification-tag badge badge-default badge-danger float-right m-0">5 New</span>
                                        </li>
                                        <li className="scrollable-container media-list w-100"><a href="!!#">
                                            <div className="media">
                                                <div className="media-left align-self-center"><i className="ft-plus-square icon-bg-circle bg-cyan"></i></div>
                                                <div className="media-body">
                                                    <h6 className="media-heading">You have new order!</h6>
                                                    <p className="notification-text font-small-3 text-muted">Lorem ipsum dolor sit amet, consectetuer elit.</p><small>
                                                        <time className="media-meta text-muted" dateTime="2015-06-11T18:29:20+08:00">30 minutes ago</time></small>
                                                </div>
                                            </div></a><a href="!#">
                                                <div className="media">
                                                    <div className="media-left align-self-center"><i className="ft-download-cloud icon-bg-circle bg-red bg-darken-1"></i></div>
                                                    <div className="media-body">
                                                        <h6 className="media-heading red darken-1">99% Server load</h6>
                                                        <p className="notification-text font-small-3 text-muted">Aliquam tincidunt mauris eu risus.</p><small>
                                                            <time className="media-meta text-muted" dateTime="2015-06-11T18:29:20+08:00">Five hour ago</time></small>
                                                    </div>
                                                </div></a><a href="!#">
                                                <div className="media">
                                                    <div className="media-left align-self-center"><i className="ft-alert-triangle icon-bg-circle bg-yellow bg-darken-3"></i></div>
                                                    <div className="media-body">
                                                        <h6 className="media-heading yellow darken-3">Warning notifixation</h6>
                                                        <p className="notification-text font-small-3 text-muted">Vestibulum auctor dapibus neque.</p><small>
                                                            <time className="media-meta text-muted" dateTime="2015-06-11T18:29:20+08:00">Today</time></small>
                                                    </div>
                                                </div></a><a href="!#">
                                                <div className="media">
                                                    <div className="media-left align-self-center"><i className="ft-check-circle icon-bg-circle bg-cyan"></i></div>
                                                    <div className="media-body">
                                                        <h6 className="media-heading">Complete the task</h6><small>
                                                            <time className="media-meta text-muted" dateTime="2015-06-11T18:29:20+08:00">Last week</time></small>
                                                    </div>
                                                </div></a><a href="!!#">
                                                <div className="media">
                                                    <div className="media-left align-self-center"><i className="ft-file icon-bg-circle bg-teal"></i></div>
                                                    <div className="media-body">
                                                        <h6 className="media-heading">Generate monthly report</h6><small>
                                                            <time className="media-meta text-muted" dateTime="2015-06-11T18:29:20+08:00">Last month</time></small>
                                                    </div>
                                                </div></a></li>
                                        <li className="dropdown-menu-footer"><a className="dropdown-item text-muted text-center" href="!#">Read all notifications</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown dropdown-notification nav-item"><a className="nav-link nav-link-label" href="!#" data-toggle="dropdown"><i className="ficon ft-mail"></i><span className="badge badge-pill badge-default badge-info badge-default badge-up">5              </span></a>
                                    <ul className="dropdown-menu dropdown-menu-media dropdown-menu-right">
                                        <li className="dropdown-menu-header">
                                            <h6 className="dropdown-header m-0"><span className="grey darken-2">Messages</span></h6><span className="notification-tag badge badge-default badge-warning float-right m-0">4 New</span>
                                        </li>
                                        <li className="scrollable-container media-list w-100"><a href="!!#">
                                            <div className="media">
                                                <div className="media-left"><span className="avatar avatar-sm avatar-busy rounded-circle"><img src="../../../app-assets/images/portrait/small/avatar-s-2.png" alt="avatar" /><i></i></span></div>
                                                <div className="media-body">
                                                    <h6 className="media-heading">Bret Lezama</h6>
                                                    <p className="notification-text font-small-3 text-muted">I have seen your work, there is</p><small>
                                                        <time className="media-meta text-muted" dateTime="2015-06-11T18:29:20+08:00">Tuesday</time></small>
                                                </div>
                                            </div></a><a href="!#">
                                                <div className="media">
                                                    <div className="media-left"><span className="avatar avatar-sm avatar-online rounded-circle"><img src="../../../app-assets/images/portrait/small/avatar-s-3.png" alt="avatar" /><i></i></span></div>
                                                    <div className="media-body">
                                                        <h6 className="media-heading">Carie Berra</h6>
                                                        <p className="notification-text font-small-3 text-muted">Can we have call in this week ?</p><small>
                                                            <time className="media-meta text-muted" dateTime="2015-06-11T18:29:20+08:00">Friday</time></small>
                                                    </div>
                                                </div></a><a href="!#">
                                                <div className="media">
                                                    <div className="media-left"><span className="avatar avatar-sm avatar-away rounded-circle"><img src="../../../app-assets/images/portrait/small/avatar-s-6.png" alt="avatar" /><i></i></span></div>
                                                    <div className="media-body">
                                                        <h6 className="media-heading">Eric Alsobrook</h6>
                                                        <p className="notification-text font-small-3 text-muted">We have project party this saturday.</p><small>
                                                            <time className="media-meta text-muted" dateTime="2015-06-11T18:29:20+08:00">last month</time></small>
                                                    </div>
                                                </div></a></li>
                                        <li className="dropdown-menu-footer"><a className="dropdown-item text-muted text-center" href="!#">Read all messages</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown dropdown-user nav-item">
                                    <div className="dropdown-toggle nav-link dropdown-user-link" data-toggle="dropdown">
                                        <span className="avatar avatar-online"><img src="../../../app-assets/images/portrait/small/avatar-s-1.png" alt="avatar" /><i></i></span>
                                        <div className="dropdown">
                                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleMenu}>
                                                {this.props.userContext.username}
                                            </Button>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={this.state.anchorEl}
                                                open={open}
                                                onClose={this.handleClose}
                                            >
                                                <MenuItem onClick={this.handleRedirect}>Profile</MenuItem>
                                                <MenuItem >My account</MenuItem>
                                                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                            </Menu>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userContext: state.profile
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        setUserContext: (username, roleName) => {
            dispatch(actions.setUserContext(username, roleName));
        },
        deleteUserContext: () => {
            dispatch(actions.deleleUserContext());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));