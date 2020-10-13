import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ProducerMenu extends Component{
    render(){
        return(
        <div className="header-navbar navbar-expand-sm navbar navbar-horizontal navbar-fixed navbar-light navbar-without-dd-arrow navbar-shadow" role="navigation" data-menu="menu-wrapper">
        <div className="navbar-container main-menu-content container center-layout" data-menu="menu-container">
          <ul className="nav navbar-nav" id="main-menu-navigation" data-menu="menu-navigation">
            <li className="dropdown nav-item" data-menu="dropdown"><Link className="dropdown-toggle nav-link" to="/dashboard" ><i className="icon-home"></i><span data-i18n="nav.dash.main">Dashboard</span></Link>
            </li>
            <li className="dropdown nav-item" data-menu="dropdown"><Link className="dropdown-toggle nav-link" to="/profile" ><i className="icon-note"></i><span data-i18n="nav.templates.main">Profiles</span></Link>
            </li>
            <li className="dropdown nav-item" data-menu="dropdown"><Link className="dropdown-toggle nav-link" to="/transactions" ><i className="icon-drawer"></i><span data-i18n="nav.layouts.temp">Transaction</span></Link>
            </li>
            <li className="dropdown nav-item" ><a className="dropdown-toggle nav-link" target='_blank' href="http://explorer.kdtrace.xyz/?fbclid=IwAR2UKn2zrVwN32m02dcIGCLYqv6c4BROrVl0R4dOuidcqljxEkWsG-g0pfQ#/" ><i className="icon-drawer"></i><span data-i18n="nav.layouts.temp">Blockchain System</span></a></li>
          </ul>
        </div>
      </div>
        );
    }
}
export default ProducerMenu;