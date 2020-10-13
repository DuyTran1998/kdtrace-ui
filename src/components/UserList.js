import React, { Component } from 'react';
import UserRecord from './UserRecord';
import { withRouter } from 'react-router-dom';
import { API_GET_ALL_USER, API_ACTIVE_USER_ACCOUNT, API_GET_PROFILE } from '../constants/API/api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { CircularProgress } from '@material-ui/core';
import UserProfile from './UserProfile';
import { Dialog, DialogTitle, DialogContentText, DialogContent, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listKeyFilter: new Map(),
            userListOrigin: [],
            userList: [],
            page: 1,
            alertMessage: '',
            alertSuccess: false,
            alertFail: false,
            loading: true,
            open: false,
            result: '',
            asc: true,
            showArrow: {
                id: false,
                name: false,
                type: false,
                quantity: false,
                unit: false,
                mfg: false
            }
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

    handleKeyFilter(e) {
        var keyMap = this.state.listKeyFilter;
        keyMap.set(e.target.name, e.target.value);
        this.setState({
            listKeyFilter: keyMap,
        })
        this.handleFilter();
    }

    handleFilter(e) {
        var filterList = [];
        var list = this.state.userListOrigin;
        console.log(this.state.listKeyFilter);
        for (var [key, value] of this.state.listKeyFilter) {
            filterList = []
            for (let i = 0; i < list.length; i++) {
                if (key === 'roleName') {
                    if (list[i].role[key].toUpperCase().indexOf(value.toUpperCase()) > -1) {
                        filterList.push(list[i]);
                    }
                } else if (list[i][key].toUpperCase().indexOf(value.toUpperCase()) > -1) {
                    filterList.push(list[i]);
                }
            }
            list = filterList;
        }

        this.setState({
            userList: filterList,
        })
    }

    hasLeading = s => /^\S+\s\S+\s\S+$/.test(s);
    sortData = (column, subColumn) => {
        let data = [];
        data = this.state.userList.sort((a, b) => {
            if (subColumn === null || subColumn === undefined) {
                if (!this.state.asc) {
                    return this.hasLeading(b[column]) - this.hasLeading(a[column]) || a[column] > b[column] || -(a[column] < b[column])
                }
                return this.hasLeading(a[column]) - this.hasLeading(b[column]) || b[column] > a[column] || -(b[column] < a[column])
            } else {
                if (!this.state.asc) {
                    return this.hasLeading(b[column][subColumn]) - this.hasLeading(a[column][subColumn]) || a[column][subColumn] > b[column][subColumn] || -(a[column][subColumn] < b[column][subColumn])
                }
                return this.hasLeading(a[column][subColumn]) - this.hasLeading(b[column][subColumn]) || b[column][subColumn] > a[column][subColumn] || -(b[column][subColumn] < a[column][subColumn])
            }
        });
        var showArrow = {
            id: false,
            name: false,
            type: false,
            quantity: false,
            unit: false,
            mfg: false
        };
        showArrow[column] = true;
        this.setState({
            listTransactions: data,
            asc: !this.state.asc,
            showArrow: showArrow
        })
    }

    handleArrow = (show) => {
        if (show) {
            if (this.state.asc) return <ArrowDropUpIcon color="secondary" />
            return <ArrowDropDownIcon color="secondary" />
        }
        else {
            return <MoreHorizIcon color="disabled" />
        }
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
                this.setState({
                    userList: jsonResponse.result,
                    userListOrigin: jsonResponse.result
                });
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
                    this.setState({ result: jsonResponse.result });
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

    pagation = (list, page) => {
        if (list.length < 10) {
            return list;
        }
        const newlist = list.slice(page * 10 - 10, page * 10);
        return newlist;
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
                                                <table style={{ marginLeft: 'auto', marginRight: '0' }}>
                                                    <tr>
                                                        <td>
                                                            <img src={"/seach.gif"} width="100%" style={{ maxWidth: "50px" }} alt="image" />
                                                        </td>
                                                        <td style={{ width: '121px' }}>
                                                            <input type="text" id="issueinput1" className="form-control" placeholder="Username" name="username" onChange={(e) => { this.handleKeyFilter(e) }} />
                                                        </td>
                                                        <td style={{ width: '110px' }}>
                                                            <input type="text" id="issueinput1" className="form-control" placeholder="Email" name="email" onChange={(e) => { this.handleKeyFilter(e) }} />
                                                        </td>
                                                        <td>
                                                            <select id="issueinput5" name="roleName" onChange={(e) => { this.handleKeyFilter(e) }} className="form-control" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Priority" >
                                                                <option value="">Role</option>
                                                                <option value="ROLE_PRODUCER">ROLE_PRODUCER</option>
                                                                <option value="ROLE_TRANSPORT">ROLE_TRANSPORT</option>
                                                                <option value="ROLE_DISTRIBUTOR">ROLE_DISTRIBUTOR</option>
                                                            </select>
                                                        </td>
                                                        <td style={{ width: '105px' }}>
                                                            <input type="text" id="issueinput1" className="form-control" placeholder="Create Date" name="createAt" onChange={(e) => { this.handleKeyFilter(e) }} />
                                                        </td>
                                                    </tr>
                                                    <tr><p></p></tr>
                                                </table>
                                                {
                                                    this.state.userList.length !== 0 ?
                                                        <div>
                                                            <table className="table table-striped table-bordered zero-configuration">
                                                                <thead>
                                                                    <tr>
                                                                        <th onClick={() => this.sortData('username')}>  Username    {this.handleArrow(this.state.showArrow.username)}</th>
                                                                        <th onClick={() => this.sortData('rate')}>      Rate        {this.handleArrow(this.state.showArrow.rate)}</th>
                                                                        <th onClick={() => this.sortData('email')}>     Email       {this.handleArrow(this.state.showArrow.email)}</th>
                                                                        <th onClick={() => this.sortData('role', 'roleName')}>  Role        {this.handleArrow(this.state.showArrow.role)}</th>
                                                                        <th onClick={() => this.sortData('createAt')}>  Create Date {this.handleArrow(this.state.showArrow.createAt)}</th>
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
                                                                    <ul class="pagination pagination-separate pagination-curved page2-links">
                                                                        <li class="page-item prev">
                                                                            <button onClick={this.decreatePage} class="page-link">Prev</button>
                                                                        </li>
                                                                        <li class="page-item active">
                                                                            <button class="page-link">{this.state.page}</button>
                                                                        </li>
                                                                        <li class="page-item next" onClick={this.increatePage}>
                                                                            <button onClick={this.increatePage} class="page-link">Next</button>
                                                                        </li>
                                                                    </ul>
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
