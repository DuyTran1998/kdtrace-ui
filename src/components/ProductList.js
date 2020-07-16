import React, { Component } from 'react';
import ProductRecord from './ProductRecord';
import { Dialog, DialogTitle, DialogContentText, DialogContent, Typography } from '@material-ui/core';
import ProductForm from './ProductForm';
import { API_GET_ALL_PRODUCT } from '../constants/API/api'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Link } from "react-router-dom";
import { CircularProgress } from '@material-ui/core';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            open: false,
            reload: false,
            page: 1,
            alertSuccess: false,
            alertFail: false,
            loading: true,
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        const url = API_GET_ALL_PRODUCT;
        const token = localStorage.getItem('token');
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(jsonResponse => {
                this.setState({ loading: false, productList: jsonResponse.result });
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
        this.setState({ alertSuccess: false, alertFail: false });
    }

    increatePage = () => {
        let newPageNum = this.state.page + 1;
        this.setState({
            page: newPageNum
        })
    }

    decreatePage = () => {
        let newPageNum = this.state.page;
        if (newPageNum > 1) {
            this.setState({
                page: newPageNum - 1
            })
        }
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
                                                {this.state.productList.length !== 0 ?
                                                    <div>
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
                                                        </table>
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
                                                            <h3>Don't have products!</h3>
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
        )
    }
} export default ProductList;