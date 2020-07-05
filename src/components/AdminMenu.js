import React, { Component } from 'react';
import { Link } from "react-router-dom";

class AdminMenu extends Component {
  render() {
    return (
      <div className="header-navbar navbar-expand-sm navbar navbar-horizontal navbar-fixed navbar-light navbar-without-dd-arrow navbar-shadow" role="navigation" data-menu="menu-wrapper">
        <div className="navbar-container main-menu-content container center-layout" data-menu="menu-container">
          <ul className="nav navbar-nav" id="main-menu-navigation" data-menu="menu-navigation">
             <li className="dropdown nav-item" data-menu="dropdown"><Link className="dropdown-toggle nav-link" to="/dashboard" ><i className="icon-home"></i><span data-i18n="nav.dash.main">Dashboard</span></Link>
            </li>
            <li className="dropdown nav-item" data-menu="dropdown"><Link className="dropdown-toggle nav-link" to="/blockchain" data-toggle="dropdown"><i className="icon-note"></i><span data-i18n="nav.templates.main">Blockchain System</span></Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default AdminMenu;