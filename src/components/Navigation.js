import React, { Component } from 'react';

class Navigation extends Component {
    render() {
        return (
            <nav className="header-navbar navbar-expand-md navbar navbar-with-menu navbar-static-top navbar-light navbar-border navbar-brand-center">
                <div className="navbar-wrapper">
                    <div className="navbar-header">
                        <ul className="nav navbar-nav flex-row">
                            <li className="nav-item"><a className="navbar-brand" href="../../../html/ltr/horizontal-menu-template/index.html"><img className="brand-logo" alt="robust admin logo" src="../../../app-assets/images/logo/logo-dark-sm.png" />
                                <h3 className="brand-text">KD Trace</h3></a></li>
                            <li className="nav-item d-md-none"><a className="nav-link open-navbar-container" data-toggle="collapse" href="!!#" data-target="!#navbar-mobile"><i className="fa fa-ellipsis-v"></i></a></li>
                        </ul>
                    </div>
                    <div className="navbar-container container center-layout">
                        <div className="collapse navbar-collapse" id="navbar-mobile">
                            <ul className="nav navbar-nav mr-auto float-left">
                            </ul>
                            <ul className="nav navbar-nav float-right">
                                <li className="dropdown dropdown-language nav-item"><a className="dropdown-toggle nav-link" id="dropdown-flag" href="!!#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="flag-icon flag-icon-gb"></i><span>English</span><span className="selected-language"></span></a>
                                    <div className="dropdown-menu" aria-labelledby="dropdown-flag"><a className="dropdown-item" href="!!#"><i className="flag-icon flag-icon-gb"></i> English</a><a className="dropdown-item" href="!!#"><i className="flag-icon flag-icon-fr"></i> French</a><a className="dropdown-item" href="!!#"><i className="flag-icon flag-icon-cn"></i> Chinese</a><a className="dropdown-item" href="!!#"><i className="flag-icon flag-icon-de"></i> German</a></div>
                                </li>
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
                                            </div></a><a href="!!#">
                                                <div className="media">
                                                    <div className="media-left align-self-center"><i className="ft-download-cloud icon-bg-circle bg-red bg-darken-1"></i></div>
                                                    <div className="media-body">
                                                        <h6 className="media-heading red darken-1">99% Server load</h6>
                                                        <p className="notification-text font-small-3 text-muted">Aliquam tincidunt mauris eu risus.</p><small>
                                                            <time className="media-meta text-muted" dateTime="2015-06-11T18:29:20+08:00">Five hour ago</time></small>
                                                    </div>
                                                </div></a><a href="!#!">
                                                <div className="media">
                                                    <div className="media-left align-self-center"><i className="ft-alert-triangle icon-bg-circle bg-yellow bg-darken-3"></i></div>
                                                    <div className="media-body">
                                                        <h6 className="media-heading yellow darken-3">Warning notifixation</h6>
                                                        <p className="notification-text font-small-3 text-muted">Vestibulum auctor dapibus neque.</p><small>
                                                            <time className="media-meta text-muted" dateTime="2015-06-11T18:29:20+08:00">Today</time></small>
                                                    </div>
                                                </div></a><a href="!!#">
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
                                        <li className="dropdown-menu-footer"><a className="dropdown-item text-muted text-center" href="!!#">Read all notifications</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown dropdown-notification nav-item"><a className="nav-link nav-link-label" href="!!#" data-toggle="dropdown"><i className="ficon ft-mail"></i><span className="badge badge-pill badge-default badge-info badge-default badge-up">5              </span></a>
                                    <ul className="dropdown-menu dropdown-menu-media dropdown-menu-right">
                                        <li className="dropdown-menu-header">
                                            <h6 className="dropdown-header m-0"><span className="grey darken-2">Messages</span></h6><span className="notification-tag badge badge-default badge-warning float-right m-0">4 New</span>
                                        </li>
                                        <li className="scrollable-container media-list w-100"><a href="!!#">
                                            <div className="media">
                                                <div className="media-left"><span className="avatar avatar-sm avatar-online rounded-circle"><img src="../../../app-assets/images/portrait/small/avatar-s-19.png" alt="avatar" /><i></i></span></div>
                                                <div className="media-body">
                                                    <h6 className="media-heading">Margaret Govan</h6>
                                                    <p className="notification-text font-small-3 text-muted">I like your portfolio, let's start.</p><small>
                                                        <time className="media-meta text-muted" dateTime="2015-06-11T18:29:20+08:00">Today</time></small>
                                                </div>
                                            </div></a><a href="!!#">
                                                <div className="media">
                                                    <div className="media-left"><span className="avatar avatar-sm avatar-busy rounded-circle"><img src="../../../app-assets/images/portrait/small/avatar-s-2.png" alt="avatar" /><i></i></span></div>
                                                    <div className="media-body">
                                                        <h6 className="media-heading">Bret Lezama</h6>
                                                        <p className="notification-text font-small-3 text-muted">I have seen your work, there is</p><small>
                                                            <time className="media-meta text-muted" dateTime="2015-06-11T18:29:20+08:00">Tuesday</time></small>
                                                    </div>
                                                </div></a><a href="!!#">
                                                <div className="media">
                                                    <div className="media-left"><span className="avatar avatar-sm avatar-online rounded-circle"><img src="../../../app-assets/images/portrait/small/avatar-s-3.png" alt="avatar" /><i></i></span></div>
                                                    <div className="media-body">
                                                        <h6 className="media-heading">Carie Berra</h6>
                                                        <p className="notification-text font-small-3 text-muted">Can we have call in this week ?</p><small>
                                                            <time className="media-meta text-muted" dateTime="2015-06-11T18:29:20+08:00">Friday</time></small>
                                                    </div>
                                                </div></a><a href="!!#">
                                                <div className="media">
                                                    <div className="media-left"><span className="avatar avatar-sm avatar-away rounded-circle"><img src="../../../app-assets/images/portrait/small/avatar-s-6.png" alt="avatar" /><i></i></span></div>
                                                    <div className="media-body">
                                                        <h6 className="media-heading">Eric Alsobrook</h6>
                                                        <p className="notification-text font-small-3 text-muted">We have project party this saturday.</p><small>
                                                            <time className="media-meta text-muted" dateTime="2015-06-11T18:29:20+08:00">last month</time></small>
                                                    </div>
                                                </div></a></li>
                                        <li className="dropdown-menu-footer"><a className="dropdown-item text-muted text-center" href="!!#">Read all messages</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown dropdown-user nav-item"><a className="dropdown-toggle nav-link dropdown-user-link" href="!!#" data-toggle="dropdown"><span className="avatar avatar-online"><img src="../../../app-assets/images/portrait/small/avatar-s-1.png" alt="avatar" /><i></i></span><span className="user-name">John Doe</span></a>
                                    <div className="dropdown-menu dropdown-menu-right"><a className="dropdown-item" href="user-profile.html"><i className="ft-user"></i> Edit Profile</a><a className="dropdown-item" href="email-application.html"><i className="ft-mail"></i> My Inbox</a><a className="dropdown-item" href="user-cards.html"><i className="ft-check-square"></i> Task</a><a className="dropdown-item" href="chat-application.html"><i className="ft-message-square"></i> Chats</a>
                                        <div className="dropdown-divider"></div><a className="dropdown-item" href="login-with-bg-image.html"><i className="ft-power"></i> Logout</a>
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
export default Navigation;