import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Menu from '../components/Menu';
import UserList from '../components/UserList';
import { Redirect } from 'react-router';


class PageAdmin extends Component {

  componentWillMount() {
    const url = "http://localhost:8080/api/admin/getAllUsers";
    const token = localStorage.getItem('token');
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse);
      })
  }

  render() {
    // if(localStorage.getItem("key") === null){
    //   return (<Redirect to="/" />);
    // }
    return (
      <div className="horizontal-layout horizontal-menu horizontal-menu-padding 2-columns   menu-expanded" data-open="hover" data-menu="horizontal-menu" data-col="2-columns">
        <Navigation />
        <Menu />
        <UserList />
      </div>
    );
  }
}
export default PageAdmin;