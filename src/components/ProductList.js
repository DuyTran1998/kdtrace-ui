import React, { Component } from 'react';
import ProductRecord from './ProductRecord';
import { Dialog, DialogTitle, DialogContentText, DialogContent, Typography } from '@material-ui/core';
import ProductForm from './ProductForm';
import { API_GET_ALL_PRODUCT } from '../constants/API/api'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            open: false,
            reload: false,
        }
    }
    componentDidMount() {
        const url = API_GET_ALL_PRODUCT;
        const token = localStorage.getItem('token');
        console.log(token);
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(jsonResponse => {
                this.setState({ productList: jsonResponse.result });
                console.log(this.state.productList);
            })
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
        this.setState({ alertSuccess: false, alertFail: false});
    }
    render() {
        const productList = this.state.productList.map(product => {
            return (
                <ProductRecord key={product.id} product={product}></ProductRecord>
            );
        })
        return (
            <div className="app-content container center-layout mt-2">
                <div className="content-wrapper">
                    <div className="content-body">
                        <section id="configuration">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Product Management</h4>
                                        </div>
                                        <div className="content-header-right col-12">
                                            <div className="btn-group float-md-right">
                                                <button
                                                    className="btn btn-info round dropdown-toggle dropdown-menu-right px-2"
                                                    type="button"
                                                    aria-haspopup="true"
                                                    onClick={this.handleOpenDialog}>
                                                    <i className="ft-settings icon-left"></i> Create Product
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-content collapse show">
                                            <div className="card-body card-dashboard">
                                                <table className="table table-striped table-bordered zero-configuration">
                                                    <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Product Name</th>
                                                            <th>Type</th>
                                                            <th>Quantity</th>
                                                            <th>Unit</th>
                                                            <th>Manufacture Date</th>
                                                            <th>Expiration Date</th>
                                                            <th>Details</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {productList}
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Product Name</th>
                                                            <th>Type</th>
                                                            <th>Quantity</th>
                                                            <th>Unit</th>
                                                            <th>Manufacture Date</th>
                                                            <th>Expiration Date</th>
                                                            <th>Details</th>
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
                                            <DialogTitle id="alert-dialog-slide-title">{"Create product form"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-slide-description">
                                                    <Typography>
                                                        <ProductForm handleClose={this.handleClose} handleOpenAlert={this.handleOpenAlert} />
                                                    </Typography>
                                                </DialogContentText>
                                            </DialogContent>
                                        </Dialog>
                                        <Snackbar open={this.state.alertSuccess} onClose={this.handleCloseAlert}
                                            autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                                            <Alert severity="success" style={{ fontSize: '15px' }}>Create product successfully!</Alert>
                                        </Snackbar>
                                        <Snackbar open={this.state.alertFail} onClose={this.handleCloseAlert}
                                            autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                                            <Alert severity="error" style={{ fontSize: '15px' }}>Fail to create product!</Alert>
                                        </Snackbar>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
} export default ProductList;