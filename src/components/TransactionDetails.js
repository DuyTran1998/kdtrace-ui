import React, { Component } from 'react';
import { API_GET_TRANSACTION } from '../constants/API/api';

class TransactionDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            statusProcess: '',
            delivery_at: '',
            qrCodeModels: [],
            productID: '',
            distributorModel: {},
            transportModel: {},
            producerModel: {},
        }
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        const token = localStorage.getItem('token');
        const url = API_GET_TRANSACTION + id;
        this.getData(url, token);
    }

    getData(url, token) {
        console.log(url);
        fetch(url, {
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
                    id: res.result.id,
                    productID: res.result.productID,
                    statusProcess: res.result.statusProcess,
                    distributorModel: res.result.distributorModel,
                    deliveryTruckModel: res.result.deliveryTruckModel,
                })
                console.log(this.state);
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
                                            <h2 className="card-title"><i class="fa fa-eye"></i>Transaction</h2>
                                            <div className="content-header-right col-12">
                                                <div className="btn-group float-md-right">
                                                        <span class="ladda-label">{this.state.statusProcess}</span>
                                                </div>
                                            </div>
                                            <span>Id: </span><h4>{this.state.id}</h4>
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
                                                    {/* <td>{this.state.id}</td>
                                                <td>{this.state.productName}</td>
                                                <td>{this.state.type}</td>
                                                <td>{this.state.quantity}</td>
                                                <td>{this.state.unit}</td>
                                                <td>{this.state.mfg}</td>
                                                <td>{this.state.exp}</td> */}
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="content-body">
                                            <section id="bootstrap-pricing">
                                                <div class="row mt-2">
                                                    <div class="col-xl-4 col-md-6 col-12 border">
                                                        <div class="card profile-card-with-cover">
                                                            <div class="card-content card-deck text-center">
                                                                <div class="card box-shadow">
                                                                    <div class="card-header pb-0">
                                                                        <h2 class="my-0 font-weight-bold">Producer</h2>
                                                                    </div>
                                                                    <div class="card-body">
                                                                        <h2 class="pricing-card-title">{this.state.distributorModel.companyName}</h2>
                                                                        <ul class="list-unstyled mt-2 mb-2">
                                                                            <li>Phone: {this.state.distributorModel.phone}</li>
                                                                            <li>Email: {this.state.distributorModel.email}</li>
                                                                            <li>Website: {this.state.distributorModel.website}</li>
                                                                            <li>Address: {this.state.distributorModel.address}</li>
                                                                        </ul>
                                                                        <button type="button" class="btn btn-lg btn-block btn-info">Sign up for free</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-4 col-md-6 col-12 border">
                                                        <div class="card profile-card-with-cover">
                                                            <div class="card-content card-deck text-center">
                                                                <div class="card box-shadow">
                                                                    <div class="card-header pb-0">
                                                                        <h2 class="my-0 font-weight-bold">Transport</h2>
                                                                    </div>
                                                                    <div class="card-body">
                                                                        <h2 class="pricing-card-title">{this.state.distributorModel.companyName}</h2>
                                                                        <ul class="list-unstyled mt-2 mb-2">
                                                                            <li>Phone: {this.state.distributorModel.phone}</li>
                                                                            <li>Email: {this.state.distributorModel.email}</li>
                                                                            <li>Website: {this.state.distributorModel.website}</li>
                                                                            <li>Address: {this.state.distributorModel.address}</li>
                                                                        </ul>
                                                                        <button type="button" class="btn btn-lg btn-block btn-info">Get started</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-4 col-md-6 col-12 border">
                                                        <div class="card profile-card-with-cover">
                                                            <div class="card-content card-deck text-center">
                                                                <div class="card box-shadow">
                                                                    <div class="card-header pb-0">
                                                                        <h2 class="my-0 font-weight-bold">Distributor</h2>
                                                                    </div>
                                                                    <div class="card-body">
                                                                        <h2 class="pricing-card-title">{this.state.distributorModel.companyName}</h2>
                                                                        <ul class="list-unstyled mt-2 mb-2">
                                                                            <li>Phone: {this.state.distributorModel.phone}</li>
                                                                            <li>Email: {this.state.distributorModel.email}</li>
                                                                            <li>Website: {this.state.distributorModel.website}</li>
                                                                            <li>Address: {this.state.distributorModel.address}</li>
                                                                        </ul>
                                                                        <button type="button" class="btn btn-lg btn-block btn-info">Contact us</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>


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

export default TransactionDetails;