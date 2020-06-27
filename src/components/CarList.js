import React, { Component } from 'react';
import CarRecord from './CarRecord';
import {API_GET_ALL_CAR} from '../constants/API/api';
import CarForm from './CarForm';
import { Dialog, DialogActions, DialogTitle, DialogContentText, DialogContent, Typography} from '@material-ui/core';

class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            error: '',
            open: false,
        }
    }

    componentDidMount() {
        this.getAllCars(localStorage.getItem('token'));
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
                console.log(res);
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
                                                    <tfoot>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Number Plate</th>
                                                            <th>Type</th>
                                                            <th>Status</th>
                                                            <th></th>
                                                        </tr>
                                                    </tfoot>
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
                                                        <CarForm handleClose={this.handleClose}/>
                                                    </Typography>
                                                </DialogContentText>
                                            </DialogContent>
                                        </Dialog>
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
export default CarList;