import React, { Component } from 'react';
import UserRecord from './UserRecord';
import { withRouter } from 'react-router-dom';
import { API_GET_ALL_USER, API_ACTIVE_USER_ACCOUNT, API_GET_PROFILE } from '../constants/API/api';
import { Link } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { CircularProgress } from '@material-ui/core';
import UserProfile from './UserProfile';
import { Dialog, DialogTitle, DialogContentText, DialogContent, Typography } from '@material-ui/core';
import { throwStatement } from '@babel/types';

class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userList: [],
            page: 1,
            alertMessage: '',
            alertSuccess: false,
            alertFail: false,
            loading: true,
            open: false,
            result: '',
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
        this.setState({ loading: true })
        const url = API_GET_ALL_USER;
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                this.setState({ loading: false })
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

    getProfileUser = (username, role) => {
        const token = localStorage.getItem('token');
        let url = API_GET_PROFILE + "username=" + username + "&role=" + role;
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.status === 200) {
                    this.setState({result: jsonResponse.result});
                } else {
                    console.log(jsonResponse);
                }
            })
    }

    increatePage = () => {
        if (this.state.userList.length / (this.state.page * 10) > 1) {
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

    handleOpenDialog = () => {
        this.setState({
            open: true,
        });
    }

    handleClose = () => {
        this.setState({
            open: false,
        });
        this.componentDidMount();
    }
    handleOpenAlert = (flag) => {
        if (flag === 'success') {
            this.setState({ alertSuccess: true });
        }
        if (flag === 'fail') {
            this.setState({ alertFail: true })
        }
    }
    handleCloseAlert = e => {
        this.setState({ alertSuccess: false, alertFail: false });
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
                                        {
                                            this.state.userList.length !== 0 ?
                                                <div>
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
                                                                                <UserRecord 
                                                                                    key={user.id} 
                                                                                    user={user} 
                                                                                    onChange={this.activeAccountUser} 
                                                                                    open={this.handleOpenDialog} 
                                                                                    getProfile={this.getProfileUser}
                                                                                />
                                                                            );
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <Dialog
                                                        open={this.state.open}
                                                        keepMounted
                                                        onClose={this.handleClose}
                                                        fullWidth
                                                        aria-labelledby="alert-dialog-slide-title"
                                                        aria-describedby="alert-dialog-slide-description">
                                                        <DialogTitle id="alert-dialog-slide-title">{"User Profile"}</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText id="alert-dialog-slide-description">
                                                                <Typography>
                                                                    <UserProfile result={this.state.result}></UserProfile>
                                                                </Typography>
                                                            </DialogContentText>
                                                        </DialogContent>
                                                    </Dialog>
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
                                                :
                                                this.state.loading === true ?
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <CircularProgress color="primary" />
                                                    </div>
                                                    :
                                                    <div style={{ textAlign: 'center' }}>
                                                        <div><img width='130' src={'/no_data.png'} alt="nodata" /></div>
                                                        <h3>Don't have users!</h3>
                                                    </div>
                                        }
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