import React, { Component } from 'react';

class PrivateRoute extends Component {
  componentDidMount(){
    localStorage.getItem('tokem', "user");
  }
  render() {
    return (
      <div>
        <p>Hello</p>
      </div>
    );
  }
}

export default PrivateRoute;