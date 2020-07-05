import React, { Component } from 'react';
import UserRecord from './UserRecord';
import { withRouter } from 'react-router-dom';
import {API_GET_ALL_USER, API_ACTIVE_USER_ACCOUNT} from '../constants/API/api';
import { Link } from "react-router-dom";
class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userList: [],
            page: 1,
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
    increatePage = () =>{
        let newPageNum = this.state.page + 1;
        this.setState({
            page: newPageNum
        })
    }

    decreatePage = () =>{
        let newPageNum = this.state.page;
        console.log(newPageNum);
        if(newPageNum > 1){
            console.log(this.state.page);
            this.setState({
                page: newPageNum - 1
            })
        }
    }

    pagation(list, page){
        if(list.length < 10){
            return list;
        }
        const newlist = list.slice(page*10 -10, page*10);
        return newlist;
    }

    render() {
        console.log(this.props.param)
        const list = this.pagation(this.state.userList, this.state.page);
        console.log(list);
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
                                                            Array.isArray(list)
                                                            && list.map(user => {
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
                                        <div className="content-header-right col-12">
                                            <div className="btn-group float-md-right">
                                                <div class="float-right my-1">
                                                    <ul class="pager pager-round">
                                                        <li>
                                                            <Link to={'?page=' + ( this.state.page - 1 )} onClick={this.decreatePage}><i class="ft-arrow-left"></i> Previous</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={'?page=' + ( this.state.page + 1 )} onClick={this.increatePage}>Next <i class="ft-arrow-right"></i></Link>
                                                        </li>
                                                    </ul>
                                                </div>
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