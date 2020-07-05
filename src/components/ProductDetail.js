import React, { Component } from 'react';
import QRCodeRecord from './QRCode';
import TransactionForm  from './TransactionForm'
import { API_GET_PRODUCT_DETAIL } from '../constants/API/api';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContentText, DialogContent, Typography} from '@material-ui/core';

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
        }
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        const url = API_GET_PRODUCT_DETAIL + id;
        const token = localStorage.getItem('token');
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
                this.setState({
                    id: jsonResponse.result.id,
                    productName: jsonResponse.result.name,
                    type: jsonResponse.result.type,
                    quantity: jsonResponse.result.quantity,
                    unit: jsonResponse.result.unit,
                    mfg: jsonResponse.result.mfg,
                    exp: jsonResponse.result.exp,
                    codes: jsonResponse.result.codes,
                })
                console.log(this.state);
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

    render() {
        console.log(this.props);
        const qrCodeList = this.state.codes.map(code => {
            return (
                <QRCodeRecord key={code.id} code={code}></QRCodeRecord>
            );
        })
        console.log(this.props.userContext.role);
        return (
            <div className="app-content container center-layout mt-2">
                <div className="content-wrapper">
                    <div className="content-body">
                        <section id="configuration">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title"><i class="fa fa-eye"></i>Product Management</h4>
                                            {
                                                this.props.userContext.role === 'ROLE_DISTRIBUTOR' 
                                                ?
                                                    <div className="content-header-right col-12">
                                                        <div className="btn-group float-md-right">
                                                            <button className="btn btn-info btn-min-width mr-1 mb-1 ladda-button" data-style="zoom-in" onClick={this.handleOpenDialog}>
                                                                <span class="ladda-label">Create Transaction</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                : null
                                            }
                                        </div>
                                        <table class="table">
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
                                                    <tfoot>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Code</th>
                                                            <th>Ower</th>
                                                            <th>Status</th>
                                                            <th>QRCode</th>
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
                                            <DialogTitle id="alert-dialog-slide-title">{"Create Transaction"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-slide-description">
                                                    <Typography>
                                                        <TransactionForm product={this.state} 
                                                        handleClose={this.handleClose}/>
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
const mapStateToProps = (state) => {
    return {
        userContext: state.profile,
    }
}
export default connect(mapStateToProps)(ProductDetail);