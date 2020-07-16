import React, { Component } from 'react';
import UserRecord from './UserRecord';
import { withRouter } from 'react-router-dom';
import { API_GET_ALL_USER, API_ACTIVE_USER_ACCOUNT } from '../constants/API/api';
import { Link } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userList: [],
            page: 1,
            alertMessage: '',
            alertSuccess: false,
            alertFail: false,
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
    getAllUser = (token) => {
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

    activeAccountUser = (id) => {
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
                if (jsonResponse.status === 200) {
                    this.handleOpenAlert('success', jsonResponse.message)
                } else {
                    this.handleOpenAlert('fail', jsonResponse.message)
                }
            })
    }
    increatePage = () => {
        if(this.state.userList.length /(this.state.page*10) > 1){
            let newPageNum = this.state.page + 1;
            this.setState({
                page: newPageNum
            })
        }
    }

    decreatePage = () => {
        let newPageNum = this.state.page;
        if (newPageNum > 1) {
            this.setState({
                page: newPageNum - 1
            })
        }
    }

    pagation = (list, page) => {
        if (list.length < 10) {
            return list;
        }
        const newlist = list.slice(page * 10 - 10, page * 10);
        return newlist;
    }

    handleOpenAlert = (flag, message) => {
        if (flag === 'success') {
            this.setState({ alertSuccess: true });
        }
        if (flag === 'fail') {
            this.setState({ alertFail: true });
        }
        this.setState({ alertMessage: message });
    }
    handleCloseAlert = e => {
        this.setState({ alertSuccess: false, alertFail: false });
    }

    render() {
        const list = this.pagation(this.state.userList, this.state.page);
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
                                                </table>
                                            </div>
                                        </div>
                                        <div className="content-header-right col-12">
                                            <div className="btn-group float-md-right">
                                                <div className="float-right my-1">
                                                    <ul className="pager pager-round">
                                                        <li>
                                                            <Link to={'?page=' + (this.state.page - 1)} onClick={this.decreatePage}><i className="ft-arrow-left"></i> Previous</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={'?page=' + (this.state.page + 1)} onClick={this.increatePage}>Next <i className="ft-arrow-right"></i></Link>
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
                <Snackbar open={this.state.alertSuccess} onClose={this.handleCloseAlert}
                    autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                    <Alert severity="success" style={{ fontSize: '15px' }}>{this.state.alertMessage}</Alert>
                </Snackbar>
                <Snackbar open={this.state.alertFail} onClose={this.handleCloseAlert}
                    autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                    <Alert severity="error" style={{ fontSize: '15px' }}>{this.state.alertMessage}</Alert>
                </Snackbar>
            </div>
        );
    }
}
export default withRouter(UserList);