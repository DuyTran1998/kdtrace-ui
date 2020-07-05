import React, { Component } from 'react';
import UserRecord from './UserRecord';
import { withRouter } from 'react-router-dom';
import {API_GET_ALL_USER, API_ACTIVE_USER_ACCOUNT} from '../constants/API/api';
class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userList: [],
        }
    }
    componentDidMount() {
        if (typeof localStorage !== undefined) {
            if (localStorage.getItem('token')) {
                this.props.history.push('/');
            } else {
                this.props.history.push('/login');
            }
        }
        this.getAllUser(localStorage.getItem('token'));
    }
    getAllUser(token) {
        const url = API_GET_ALL_USER;
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                this.setState({ userList: jsonResponse.result });
            })
    }

    activeAccountUser(id) {
        const token = localStorage.getItem('token');
        let url = API_ACTIVE_USER_ACCOUNT + id;
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

    render() {
        console.log(this.props.param)
        return (
            <div className="app-content container center-layout mt-2">
                <div className="content-wrapper">
                    <div className="content-body">
                        <section id="configuration">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">User Management</h4>
                                            <a className="heading-elements-toggle" href="!#"><i className="fa fa-ellipsis-v font-medium-3"></i></a>
                                        </div>
                                        <div className="card-content collapse show">
                                            <div className="card-body card-dashboard">
                                                <table className="table table-striped table-bordered zero-configuration">
                                                    <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Username</th>
                                                            <th>Email</th>
                                                            <th>Role</th>
                                                            <th>Create date</th>
                                                            <th>Active</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            Array.isArray(this.state.userList)
                                                            && this.state.userList.map(user => {
                                                                return (
                                                                    <UserRecord key={user.id} user={user} onChange={this.activeAccountUser} />
                                                                );
                                                            })
                                                        }
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Username</th>
                                                            <th>Email</th>
                                                            <th>Role</th>
                                                            <th>Create date</th>
                                                            <th>Active</th>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(UserList);