import React, { Component } from 'react';

class ProducerMenu extends Component{
    render(){
        return(
        <div className="header-navbar navbar-expand-sm navbar navbar-horizontal navbar-fixed navbar-light navbar-without-dd-arrow navbar-shadow" role="navigation" data-menu="menu-wrapper">
        <div className="navbar-container main-menu-content container center-layout" data-menu="menu-container">
          <ul className="nav navbar-nav" id="main-menu-navigation" data-menu="menu-navigation">
            <li className="dropdown nav-item" data-menu="dropdown"><a className="dropdown-toggle nav-link" href="/dashboard" ><i className="icon-home"></i><span data-i18n="nav.dash.main">Dashboard</span></a>
            </li>
            <li className="dropdown nav-item" data-menu="dropdown"><a className="dropdown-toggle nav-link" href="!#" ><i className="icon-note"></i><span data-i18n="nav.templates.main">Profiles</span></a>
            </li>
            <li className="dropdown nav-item" data-menu="dropdown"><a className="dropdown-toggle nav-link" href="!#" ><i className="icon-drawer"></i><span data-i18n="nav.layouts.temp">Messages</span></a>
            </li>
          </ul>
        </div>
      </div>
        );
    }
}
export default ProducerMenu;