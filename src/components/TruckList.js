import React, { Component } from 'react';
import TruckRecord from './TruckRecord';
import { API_GET_ALL_TRUCK } from '../constants/API/api';
import TruckForm from './TruckForm';
import { Dialog, DialogTitle, DialogContentText, DialogContent, Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { CircularProgress } from '@material-ui/core';

class TruckList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trucks: [],
            error: '',
            open: false,
            alertMessage: '',
            alertSuccess: false,
            alertFail: false,
            loading: true,
        }
    }

    componentDidMount() {
        this.getAllTrucks(localStorage.getItem('token'));
    }

    handleOpenAlert = (flag, message) => {
        if (flag === 'success') {
            this.setState({ alertSuccess: true });
        }
        if (flag === 'fail') {
            this.setState({ alertFail: true })
        }
        this.setState({ alertMessage: message });
    }
    handleCloseAlert = e => {
        this.setState({ alertSuccess: false, alertFail: false });
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

    getAllTrucks(token) {
        this.setState({ loading: true })
        fetch(API_GET_ALL_TRUCK, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(res => {
                this.setState({ loading: false })
                if (res.error) {
                    throw (res.error);
                }
                this.setState({
                    trucks: res.result,
                })
            })
            .catch(error => {
                this.setState({
                    error: error,
                })
            })
    }
    render() {
        return (
            <div className="app-content container center-layout mt-2">
                <div className="content-wrapper">
                    <div className="content-body">
                        <section id="configuration">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Truck Management</h4>
                                            <a className="heading-elements-toggle" href="!#"><i className="fa fa-ellipsis-v font-medium-3"></i></a>
                                        </div>
                                        <div className="content-header-right col-12">
                                            <div className="btn-group float-md-right">
                                                <button
                                                    className="btn btn-info round dropdown-toggle dropdown-menu-right px-2"
                                                    type="button"
                                                    aria-haspopup="true"
                                                    onClick={this.handleOpenDialog}>
                                                    <i className="ft-settings icon-left"></i> New Truck
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-content collapse show">
                                            <div className="card-body card-dashboard">
                                                {
                                                    this.state.trucks.length !== 0 ?
                                                        <table className="table table-striped table-bordered zero-configuration">
                                                            <thead>
                                                                <tr>
                                                                    <th>Id</th>
                                                                    <th>Number Plate</th>
                                                                    <th>Type</th>
                                                                    <th>Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    Array.isArray(this.state.trucks)
                                                                    && this.state.trucks.map(truck => {
                                                                        return (
                                                                            <TruckRecord key={truck.id} truck={truck} />
                                                                        );
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                        :
                                                        this.state.loading === true ?
                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <CircularProgress color="primary" />
                                                            </div>
                                                            :
                                                            <div style={{ textAlign: 'center' }}>
                                                                <div><img width='130' src={'/no_data.png'} alt="nodata" /></div>
                                                                <h3>Don't have trucks!</h3>
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
                <Dialog
                    open={this.state.open}
                    keepMounted
                    onClose={this.handleClose}
                    fullWidth
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <DialogTitle id="alert-dialog-slide-title">{"Insert Profile New Truck"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <Typography>
                                <TruckForm handleClose={this.handleClose} handleOpenAlert={this.handleOpenAlert} />
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
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
export default TruckList;
