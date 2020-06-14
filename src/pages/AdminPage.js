import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Navigation from '../components/Navigation';
import Menu from '../components/Menu';
import UserList from '../components/UserList';
import {isLoggedIn} from '../services/Authentication.js';

class PageAdmin extends Component {
  _isMounted = false;
  constructor(props){
    super(props)

    this.state = {
        isLogged : false,
        username : '',
        roleName : '',
        userList : []
    }
}
  getAllUser(token){
    const url = "http://localhost:8080/api/admin/getAllUsers";
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(this._isMounted);
        if(this._isMounted){
          this.setState({'userList': jsonResponse.result});
          console.log(this.state.userList);
        }
      })
  }

   activeAccountUser(id){
    const token = localStorage.getItem('token');
    let url = "http://localhost:8080/api/admin/active?user_id="+id;
    fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse);
        })
  }

  getUserLogged(token){
    const url = "http://localhost:8080/api/getUserLogged";
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if(this._isMounted){
          this.setState({'username': jsonResponse.username,
                          'roleName': jsonResponse.role.roleName })
        }
      })
  } 
  componentDidMount() {
    this._isMounted = true;
    const token = localStorage.getItem('token');
    this.getUserLogged(token);
    this.getAllUser(token);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if(!isLoggedIn()){
      return (<Redirect to="/" />);
    }
    return (
      <div className="horizontal-layout horizontal-menu horizontal-menu-padding 2-columns   menu-expanded" data-open="hover" data-menu="horizontal-menu" data-col="2-columns">
        <Navigation username={this.state.username}/>
        <Menu />
        <UserList users={this.state.userList} onChange={this.activeAccountUser}/>
      </div>
    );
  }
}
export default PageAdmin;