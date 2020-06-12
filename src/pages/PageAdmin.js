import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Menu from '../components/Menu';
import UserList from '../components/UserList';

class PageAdmin extends Component {
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
        this.setState({'userList': jsonResponse.result});
            console.log(this.state.userList);
      })
  }

  activeAccountUser(id){
    const token = localStorage.getItem('token');
    const data = {id: id}
    console.log(data);
    let url = `http://localhost:8080/api/admin/active?user_id=${data.id}`;
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
    const url = "http://localhost:8080/api/admin/getUserLogged";
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
          console.log(jsonResponse);
          this.setState({'username': jsonResponse.username,
                          'roleName': jsonResponse.role.roleName })
      })
  } 
  componentWillMount() {
    const token = localStorage.getItem('token');
    this.getUserLogged(token);
    this.getAllUser(token);
  }

  render() {
    // if(localStorage.getItem("key") === null){
    //   return (<Redirect to="/" />);
    // }
    const roleName = this.state.roleName;
    let dashboard;
    if(roleName === "ROLE_ADMIN"){
      dashboard = <UserList users={this.state.userList} onChange={this.activeAccountUser}/>;
    }
    return (
      <div className="horizontal-layout horizontal-menu horizontal-menu-padding 2-columns   menu-expanded" data-open="hover" data-menu="horizontal-menu" data-col="2-columns">
        <Navigation username={this.state.username}/>
        <Menu />
        {dashboard}
      </div>
    );
  }
}
export default PageAdmin;