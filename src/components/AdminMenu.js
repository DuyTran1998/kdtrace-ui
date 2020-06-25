import React, { Component } from 'react';
import { Link } from "react-router-dom";

class AdminMenu extends Component {
  render() {
    console.log("Menuuuuu");
    return (
      <div className="header-navbar navbar-expand-sm navbar navbar-horizontal navbar-fixed navbar-light navbar-without-dd-arrow navbar-shadow" role="navigation" data-menu="menu-wrapper">
        <div className="navbar-container main-menu-content container center-layout" data-menu="menu-container">
          <ul className="nav navbar-nav" id="main-menu-navigation" data-menu="menu-navigation">
            <li className="dropdown nav-item" data-menu="dropdown"><Link className="dropdown-toggle nav-link" to="/dashboard" data-toggle="dropdown"><i className="icon-home"></i><span data-i18n="nav.dash.main">Dashboard</span></Link>
            </li>
            <li className="dropdown nav-item" data-menu="dropdown"><Link className="dropdown-toggle nav-link" to="/blockchain" data-toggle="dropdown"><i className="icon-note"></i><span data-i18n="nav.templates.main">Blockchain System</span></Link>
            </li>
            {/* <li className="dropdown nav-item" data-menu="dropdown"><a className="dropdown-toggle nav-link" href="!#" data-toggle="dropdown"><i className="icon-drawer"></i><span data-i18n="nav.layouts.temp">Layouts</span></a>
            </li>
            <li className="dropdown nav-item" data-menu="dropdown"><a className="dropdown-toggle nav-link" href="!#" data-toggle="dropdown"><i className="icon-folder"></i><span data-i18n="nav.category.general">General</span></a>
            </li>
            <li className="dropdown mega-dropdown nav-item" data-menu="megamenu"><a className="dropdown-toggle nav-link" href="!#" data-toggle="dropdown"><i className="icon-screen-tablet"></i><span data-i18n="nav.category.pages">Pages</span></a>
            </li>
            <li className="dropdown nav-item" data-menu="dropdown"><a className="dropdown-toggle nav-link" href="!#" data-toggle="dropdown"><i className="icon-note"></i><span data-i18n="nav.category.forms">Forms</span></a>
            </li>
            <li className="dropdown nav-item" data-menu="dropdown"><a className="dropdown-toggle nav-link" href="!#" data-toggle="dropdown"><i className="icon-grid"></i><span data-i18n="nav.category.tables">Tables</span></a>
            </li>
            <li className="dropdown mega-dropdown nav-item" data-menu="megamenu"><a className="dropdown-toggle nav-link" href="!#" data-toggle="dropdown"><i className="icon-plus"></i><span data-i18n="nav.category.addons">Add Ons</span></a>
            </li>
            <li className="dropdown mega-dropdown nav-item" data-menu="megamenu"><a className="dropdown-toggle nav-link" href="!#" data-toggle="dropdown"><i className="icon-graph"></i><span data-i18n="nav.category.charts_maps">Charts &amp; Maps</span></a>
            </li> */}
          </ul>
        </div>
      </div>
    );
  }
}
export default AdminMenu;