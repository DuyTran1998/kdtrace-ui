import React, { Component } from 'react';
import QRCodeRecord from './QRCode';
import TransactionForm from './TransactionForm'
import { API_GET_PRODUCT_AVAILABLE_DETAIL } from '../constants/API/api';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContentText, DialogContent, Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            productName: '',
            type: '',
            quantity: '',
            unit: '',
            mfg: '',
            exp: '',
            codes: [],
            image: '',
            alertMessage: '',
            alertSuccess: false,
            alertFail: false,
        }
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        const url = API_GET_PRODUCT_AVAILABLE_DETAIL + id;
        const token = localStorage.getItem('token');
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(jsonResponse => {
                this.setState({
                    id: jsonResponse.result.id,
                    productName: jsonResponse.result.name,
                    type: jsonResponse.result.type,
                    quantity: jsonResponse.result.quantity,
                    unit: jsonResponse.result.unit,
                    mfg: jsonResponse.result.mfg,
                    exp: jsonResponse.result.exp,
                    codes: jsonResponse.result.codes,
                    image: jsonResponse.result.image,
                })
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
    render() {
        const { image } = this.state;
        var imageString = "[raucu.jpg]"
        if (image !== "" && image !== undefined && image !== null && image !== "[]") { imageString = image; }
        imageString = imageString.slice(1, imageString.length - 1).split(",");
        var imageList = [];
        for (var i = 0; i < imageString.length; i++) {
            imageList.push(
                <div>
                    <hr />
                    <img src={imageString[i].trim()} width="100%" style={{maxWidth:"500px"}} alt="image" />
                </div>
            );
        }

        const qrCodeList = this.state.codes.map(code => {
            return (
                <QRCodeRecord key={code.id} code={code}></QRCodeRecord>
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
                                            <h4 className="card-title"><i className="fa fa-eye"></i>Product Management</h4>
                                            {
                                                this.props.userContext.role === 'ROLE_DISTRIBUTOR'
                                                    ?
                                                    <div className="content-header-right col-12">
                                                        <div className="btn-group float-md-right">
                                                            <button className="btn btn-info btn-min-width mr-1 mb-1 ladda-button" data-style="zoom-in" onClick={this.handleOpenDialog}>
                                                                <span className="ladda-label">Create Transaction</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    : null
                                            }
                                        </div>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Product Name</th>
                                                    <th>Type</th>
                                                    <th>Quantity</th>
                                                    <th>Unit</th>
                                                    <th>Mfg</th>
                                                    <th>Exp</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{this.state.id}</td>
                                                    <td>{this.state.productName}</td>
                                                    <td>{this.state.type}</td>
                                                    <td>{this.state.quantity}</td>
                                                    <td>{this.state.unit}</td>
                                                    <td>{this.state.mfg}</td>
                                                    <td>{this.state.exp}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="card-header">
                                            <h4 className="card-title">QR Code List </h4>
                                        </div>
                                        <div className="card-content collapse show">
                                            <div className="card-body card-dashboard">
                                                <table className="table table-striped table-bordered zero-configuration">
                                                    <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Code</th>
                                                            <th>Ower</th>
                                                            <th>Status</th>
                                                            <th>QRCode</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {qrCodeList}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="card-header">
                                            <h4 className="card-title">Images </h4>
                                        </div>
                                        <div className="card-content collapse show">
                                            <div className="card-body card-dashboard">
                                                {imageList}
                                            </div>
                                        </div>
                                        <Dialog
                                            open={this.state.open}
                                            keepMounted
                                            onClose={this.handleClose}
                                            fullWidth
                                            aria-labelledby="alert-dialog-slide-title"
                                            aria-describedby="alert-dialog-slide-description">
                                            <DialogTitle id="alert-dialog-slide-title">{"Create Transaction"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-slide-description">
                                                    <Typography>
                                                        <TransactionForm product={this.state}
                                                            handleClose={this.handleClose} handleOpenAlert={this.handleOpenAlert} />
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
const mapStateToProps = (state) => {
    return {
        userContext: state.profile,
    }
}
export default connect(mapStateToProps)(ProductDetail);