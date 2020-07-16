import React, { Component } from 'react';
import CarRecord from './CarRecord';
import {API_GET_ALL_CAR} from '../constants/API/api';
import CarForm from './CarForm';
import { Dialog, DialogTitle, DialogContentText, DialogContent, Typography} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            error: '',
            open: false,
            alertMessage: '',
            alertSuccess: false,
            alertFail: false,
        }
    }

    componentDidMount() {
        this.getAllCars(localStorage.getItem('token'));
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

    getAllCars(token) {
        fetch(API_GET_ALL_CAR, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                this.setState({
                    cars: res.result,
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
                                            <h4 className="card-title">Car Management</h4>
                                            <a className="heading-elements-toggle" href="!#"><i className="fa fa-ellipsis-v font-medium-3"></i></a>
                                        </div>
                                        <div className="content-header-right col-12">
                                            <div className="btn-group float-md-right">
                                                <button
                                                    className="btn btn-info round dropdown-toggle dropdown-menu-right px-2"
                                                    type="button"
                                                    aria-haspopup="true"
                                                    onClick={this.handleOpenDialog}>
                                                    <i className="ft-settings icon-left"></i> New Car
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-content collapse show">
                                            <div className="card-body card-dashboard">
                                                <table className="table table-striped table-bordered zero-configuration">
                                                    <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Number Plate</th>
                                                            <th>Type</th>
                                                            <th>Status</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            Array.isArray(this.state.cars)
                                                            && this.state.cars.map(car => {
                                                                return (
                                                                    <CarRecord key={car.id} car={car}/>
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
                                            <DialogTitle id="alert-dialog-slide-title">{"Insert Profile New Car"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-slide-description">
                                                    <Typography>
                                                        <CarForm handleClose={this.handleClose} handleOpenAlert={this.handleOpenAlert}/>
                                                    </Typography>
                                                </DialogContentText>
                                            </DialogContent>
                                        </Dialog>
                                        <nav aria-label="Page navigation">
                                            <ul class="pagination justify-content-center pagination-round">
                                                <li className="page-item">
                                                    <a className="page-link" href="#" aria-label="Previous">
                                                        <span aria-hidden="true">«</span>
                                                        <span className="sr-only">Previous</span>
                                                    </a>
                                                </li>
                                                <li className="page-item active"><a className="page-link" href="?">1</a></li>
                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                <li className="page-item"><a className="page-link" href="#">4</a></li>
                                                <li className="page-item"><a className="page-link" href="#">5</a></li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#" aria-label="Next">
                                                        <span aria-hidden="true">»</span>
                                                        <span className="sr-only">Next</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
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
export default CarList;