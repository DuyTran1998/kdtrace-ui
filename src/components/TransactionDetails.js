import React, { Component } from 'react';
import history from '../utils/@history';
import {
    API_GET_TRANSACTION, API_GET_ALL_TRANSPORT,
    API_ACCEPT_TO_SELL_TRANSACTION,
    API_CHOOSE_TRANSPORT,
    API_GET_ALL_CAR_AVAILABLE,
    API_ACCEPT_TO_DELIVERY,
    API_CONFIRM_TO_GET,
    API_CONFIRM_TO_RECEIPT,
    API_REJECT_TO_SHELL_TRANSACTION,
    API_REJECT_TO_DELIVERY,
    API_DELETE_TRANSACTION
} from '../constants/API/api';
import { connect } from 'react-redux';
import QRCode from './QRCode';
import { Snackbar, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

class TransactionDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            statusProcess: '',
            create_at: '',
            delivery_at: '',
            qrCodeList: [],
            productID: '',
            distributorModel: {},
            transportModel: {},
            producerModel: {},
            productModel: {},
            open: false,
            error: '',
            role: '',
            listTransportCompany: [],
            id_transport: '',
            listTruckCar: [],
            id_truck: '',
            progress: false,
            alertMessage: '',
            alertSuccess: false,
            alertFail: false,
        }
    }
    componentDidMount() {
        if (this.props.userContext.role) {
            this.setState({
                role: this.props.userContext.role
            })
        }
        let id = this.props.match.params.id;
        const token = localStorage.getItem('token');
        const url = API_GET_TRANSACTION + id;
        this.getData(url, token);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            role: nextProps.userContext.role,
            statusProcess: nextProps.statusProcess
        })
    }

    getDataForSelect(url, token, listName) {
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
                if (listName === 'listTransportCompany') {
                    this.setState({
                        listTransportCompany: res.result,
                    })
                }
                if (listName === 'listTruckCar') {
                    this.setState({
                        listTruckCar: res.result,
                    })
                }
            })
            .catch(error => {
                this.setState({
                    error: error,
                })
            })
    }

    getData(url, token) {
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
                this.setState({
                    id: res.result.id,
                    productID: res.result.productID,
                    statusProcess: res.result.statusProcess,
                    distributorModel: res.result.distributorModel,
                    deliveryTruckModel: res.result.deliveryTruckModel,
                    transportModel: res.result.transportModel,
                    producerModel: res.result.producerModel,
                    productModel: res.result.productModel,
                    qrCodeList: res.result.qrCodeModels,
                    create_at: res.result.create_at,
                }, () => {
                    if ((this.state.statusProcess === 'CHOOSE_DELIVERYTRUCK_TRANSPORT' ||
                        this.state.statusProcess === 'TRANSPORT_REJECT') && this.state.role === 'ROLE_DISTRIBUTOR') {
                        this.getDataForSelect(API_GET_ALL_TRANSPORT, token, 'listTransportCompany');
                    }
                    if ((this.state.statusProcess === 'WAITING_RESPONSE_TRANSPORT') && this.state.role === 'ROLE_TRANSPORT') {
                        this.getDataForSelect(API_GET_ALL_CAR_AVAILABLE, token, 'listTruckCar');
                    }
                })
            })
            .catch(error => {
                this.setState({
                    error: error,
                })
            })
    }

    postData(url, token, reload) {
        this.setState({ progress: true });
        fetch(url, {
            method: "POST",
            cache: 'no-cache',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                if (res.status === 200) {
                    this.handleClosePopup();
                    this.handleOpenAlert('success', res.message);
                    this.getData(API_GET_TRANSACTION + this.props.match.params.id, token);
                    if (reload) {
                        window.location.reload();
                    }
                } else {
                    this.handleOpenAlert('fail', res.message);
                }
            })
            .catch(error => {
                this.handleClosePopup();
                this.setState({
                    error: error,
                })
            })
    }
    handleClickDeleteProcess = () => {
        const url = API_DELETE_TRANSACTION + this.state.id;
        const token = localStorage.getItem('token');
        this.postData(url, token, true);
        history.push('/dashboard');
    }

    handleClosePopup = e => {
        this.setState({ progress: false, alertSuccess: false, alertFail: false });
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
    handleOpenDialog = () => {
        this.setState({
            open: true,
        });
    }

    handleClickAcceptToShell = (e) => {
        const api = API_ACCEPT_TO_SELL_TRANSACTION + this.state.id;
        const token = localStorage.getItem('token');
        this.postData(api, token)
    }

    handleClickRejectToShell = (e) => {
        const api = API_REJECT_TO_SHELL_TRANSACTION + this.state.id;
        const token = localStorage.getItem('token');
        this.postData(api, token, true)
        history.push('../transactions');
    }

    handleClose = () => {
        this.setState({
            open: false,
        });
        this.componentDidMount();
    }

    handleOnChangeSelect = (e) => {
        const { name, value } = e.target;
        if (name === 'id_transport') {
            this.state.listTransportCompany.forEach(transport => {
                if (transport.id == value) {
                    this.setState({
                        transportModel: transport
                    })
                }
            });
            if (value === 'none') {
                this.setState({
                    transportModel: null
                })
            }
        }
        if (value === 'none') {
            this.setState({
                [name]: 0,
            })
        } else {
            this.setState({
                [name]: value,
            })
        }

    }

    handleOnSubmit = () => {
        const url = API_CHOOSE_TRANSPORT + this.state.id + "&transport_id=" + this.state.id_transport;
        const token = localStorage.getItem('token');
        this.postData(url, token);
    }

    handleOnSubmitChooseTruck = () => {
        if (this.state.id_truck === '') { this.handleOpenAlert('fail', 'Please choose a delivery truck !') }
        else {
            const url = API_ACCEPT_TO_DELIVERY + this.state.id + "&id_deliveryTruck=" + this.state.id_truck;
            const token = localStorage.getItem('token');
            this.postData(url, token);
        }
    }

    handleOnRejectToDelivery = () => {
        const url = API_REJECT_TO_DELIVERY + this.state.id;
        const token = localStorage.getItem('token');
        this.postData(url, token, true);
        history.push('../transactions');
    }

    handleOnSubmitToConfirmTheGoodIsGotten = () => {
        const url = API_CONFIRM_TO_GET + this.state.id;
        const token = localStorage.getItem('token');
        this.postData(url, token);
    }

    handleOnSubmitToConfirmTheGoodIsReceipted = () => {
        const url = API_CONFIRM_TO_RECEIPT + this.state.id;
        const token = localStorage.getItem('token');
        this.postData(url, token);
    }

    render() {
        return (
            <div className="app-content container center-layout mt-2">
                <div className="content-wrapper">
                    <div className="content-body">
                        <section id="configuration">
                            <div className="row">
                                <div className="card col-12">
                                    <div className="card-header">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="card text-white box-shadow-0 bg-info">
                                                <div className="card-header">
                                                    <h2 className="card-title text-white">PROCESS NUMBER: # {this.state.id}</h2>
                                                </div>
                                                <div className="card-content collapse show">
                                                    <div className="card-body">
                                                        <h4 className="card-text">STATUS:
                                                            {
                                                                this.state.statusProcess === 'WAITING_RESPONSE_PRODUCER' ?
                                                                    <span className="badge badge-info">{this.state.statusProcess}</span>
                                                                    : null
                                                            }
                                                            {
                                                                this.state.statusProcess === 'PRODUCER_REJECT' ?
                                                                    <span className="badge badge-danger">{this.state.statusProcess}</span>
                                                                    : null
                                                            }
                                                            {
                                                                this.state.statusProcess === 'CHOOSE_DELIVERYTRUCK_TRANSPORT' ?
                                                                    <span className="badge badge-info">{this.state.statusProcess}</span>
                                                                    : null
                                                            }
                                                            {
                                                                this.state.statusProcess === 'WAITING_RESPONSE_TRANSPORT' ?
                                                                    <span className="badge badge-info">{this.state.statusProcess}</span>
                                                                    : null
                                                            }
                                                            {
                                                                this.state.statusProcess === 'ON_BOARDING_GET' ?
                                                                    <span className="badge badge-info">{this.state.statusProcess}</span>
                                                                    : null
                                                            }
                                                            {
                                                                this.state.statusProcess === 'ON_BOARDING_RECEIVE' ?
                                                                    <span className="badge badge-info">{this.state.statusProcess}</span>
                                                                    : null
                                                            }
                                                            {
                                                                this.state.statusProcess === 'RECEIVED' ?
                                                                    <span className="badge badge-success">{this.state.statusProcess}</span>
                                                                    : null
                                                            }
                                                            {
                                                                this.state.statusProcess === 'TRANSPORT_REJECT' ?
                                                                    <span className="badge badge-warning">{this.state.statusProcess}</span>
                                                                    : null
                                                            }
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table border-bottom-lighten-4">
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
                                                <td>{this.state.productModel.id}</td>
                                                <td>{this.state.productModel.name}</td>
                                                <td>{this.state.productModel.type}</td>
                                                <td>{this.state.productModel.quantity}</td>
                                                <td>{this.state.productModel.unit}</td>
                                                <td>{this.state.productModel.mfg}</td>
                                                <td>{this.state.productModel.exp}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="content-body">
                                        <section id="bootstrap-pricing">
                                            <div className="row mt-2">
                                                <div className="col-xl-4 col-md-6 col-12 border">
                                                    <div className="card profile-card-with-cover">
                                                        <div className="card-content card-deck text-center">
                                                            <div className="card box-shadow">
                                                                <div className="card-header pb-0">
                                                                    <h2 className="my-0 font-weight-bold">Producer</h2>
                                                                </div>
                                                                <div className="card-body">
                                                                    <h2 className="pricing-card-title">{this.state.producerModel.companyName}</h2>
                                                                    <ul className="list-unstyled mt-2 mb-2">
                                                                        <li>Phone: {this.state.producerModel.phone}</li>
                                                                        <li>Email: {this.state.producerModel.email}</li>
                                                                        <li>Website: {this.state.producerModel.website}</li>
                                                                        <li>Address: {this.state.producerModel.address}</li>
                                                                    </ul>
                                                                    {
                                                                        this.state.statusProcess === 'WAITING_RESPONSE_PRODUCER' && this.state.role === 'ROLE_PRODUCER'
                                                                            ?
                                                                            <div>
                                                                                <button type="button"
                                                                                    className="btn btn-lg btn-block btn-info"
                                                                                    onClick={this.handleClickAcceptToShell}>
                                                                                    Accept
                                                                                </button>
                                                                                <button type="button"
                                                                                    className="btn btn-lg btn-block btn-info"
                                                                                    onClick={this.handleClickRejectToShell}>
                                                                                    Reject
                                                                                </button>
                                                                            </div>

                                                                            :
                                                                            null
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-md-6 col-12 border">
                                                    <div className="card profile-card-with-cover">
                                                        <div className="card-content card-deck text-center">
                                                            <div className="card box-shadow">
                                                                <div className="card-header pb-0">
                                                                    <h2 className="my-0 font-weight-bold">Transport</h2>
                                                                </div>
                                                                <div className="card-body">
                                                                    {
                                                                        this.state.transportModel !== null ?
                                                                            <div>
                                                                                <h2 className="pricing-card-title">{this.state.transportModel.companyName}</h2>
                                                                                <ul className="list-unstyled mt-2 mb-2">
                                                                                    <li>Phone: {this.state.transportModel.phone}</li>
                                                                                    <li>Email: {this.state.transportModel.email}</li>
                                                                                    <li>Website: {this.state.transportModel.website}</li>
                                                                                    <li>Address: {this.state.transportModel.address}</li>
                                                                                </ul>
                                                                            </div>
                                                                            :
                                                                            <div>
                                                                                <h2 className="pricing-card-title">...</h2>
                                                                                <ul className="list-unstyled mt-2 mb-2">
                                                                                    <li>Phone: ...</li>
                                                                                    <li>Email: ...</li>
                                                                                    <li>Website: ...</li>
                                                                                    <li>Address: ...</li>
                                                                                </ul>
                                                                            </div>
                                                                    }

                                                                    {
                                                                        (this.state.statusProcess === 'CHOOSE_DELIVERYTRUCK_TRANSPORT' || this.state.statusProcess === 'TRANSPORT_REJECT') && this.state.role === 'ROLE_DISTRIBUTOR'
                                                                            ?
                                                                            <div>
                                                                                <select id="projectinput6" name="id_transport" className="form-control" onChange={this.handleOnChangeSelect} value={this.state.id_transport} >
                                                                                    <option value="none" disabled="">Choose Transport Company</option>
                                                                                    {
                                                                                        Array.isArray(this.state.listTransportCompany)
                                                                                        && this.state.listTransportCompany.map(transport => {
                                                                                            return (
                                                                                                <option key={transport.id} value={transport.id}>{transport.companyName}</option>
                                                                                            );
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                                <br></br>
                                                                                <button type="button" className="btn btn-lg btn-block btn-info" onClick={this.handleOnSubmit}>Submit</button>
                                                                            </div>
                                                                            :
                                                                            null
                                                                    }
                                                                    {
                                                                        this.state.statusProcess === 'WAITING_RESPONSE_TRANSPORT' && this.state.role === 'ROLE_TRANSPORT'
                                                                            ?
                                                                            <div>
                                                                                <select id="projectinput6" name="id_truck" className="form-control" onChange={this.handleOnChangeSelect} value={this.state.id_truck}>
                                                                                    <option value="none" disabled="">Choose Car To Delivery</option>
                                                                                    {
                                                                                        Array.isArray(this.state.listTruckCar)
                                                                                        && this.state.listTruckCar.map(truck => {
                                                                                            return (
                                                                                                <option key={truck.id} value={truck.id} >{truck.numberPlate}</option>
                                                                                            );
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                                <br></br>
                                                                                <button type="button" className="btn btn-lg btn-block btn-info" onClick={this.handleOnSubmitChooseTruck}>Accept</button>
                                                                                <button type="button" className="btn btn-lg btn-block btn-warning" onClick={this.handleOnRejectToDelivery}>Reject</button>
                                                                            </div>
                                                                            :
                                                                            null
                                                                    }
                                                                    {
                                                                        this.state.statusProcess === 'ON_BOARDING_GET' && this.state.role === 'ROLE_TRANSPORT'
                                                                            ?
                                                                            <button type="button"
                                                                                className="btn btn-lg btn-block btn-info"
                                                                                onClick={this.handleOnSubmitToConfirmTheGoodIsGotten}>
                                                                                Confirm
                                                                            </button>
                                                                            :
                                                                            null
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-md-6 col-12 border">
                                                    <div className="card profile-card-with-cover">
                                                        <div className="card-content card-deck text-center">
                                                            <div className="card box-shadow">
                                                                <div className="card-header pb-0">
                                                                    <h2 className="my-0 font-weight-bold">Distributor</h2>
                                                                </div>
                                                                <div className="card-body">
                                                                    <h2 className="pricing-card-title">{this.state.distributorModel.companyName}</h2>
                                                                    <ul className="list-unstyled mt-2 mb-2">
                                                                        <li>Phone: {this.state.distributorModel.phone}</li>
                                                                        <li>Email: {this.state.distributorModel.email}</li>
                                                                        <li>Website:
                                                                            <a href={this.state.distributorModel.website} target='_blank'>
                                                                                {this.state.distributorModel.website}
                                                                            </a>
                                                                        </li>
                                                                        <li>Address: {this.state.distributorModel.address}</li>
                                                                    </ul>
                                                                    {
                                                                        this.state.statusProcess === 'ON_BOARDING_RECEIVE' && this.state.role === 'ROLE_DISTRIBUTOR'
                                                                            ?
                                                                            <button type="button"
                                                                                className="btn btn-lg btn-block btn-info"
                                                                                onClick={this.handleOnSubmitToConfirmTheGoodIsReceipted}>
                                                                                Confirm
                                                                        </button>
                                                                            :
                                                                            null
                                                                    }
                                                                    {
                                                                        this.state.statusProcess === 'PRODUCER_REJECT' && this.state.role === "ROLE_DISTRIBUTOR"
                                                                            ?
                                                                            <button type="button"
                                                                                className="btn btn-lg btn-block btn-danger"
                                                                                onClick={this.handleClickDeleteProcess}>
                                                                                Delete Transaction
                                                                        </button>
                                                                            : null
                                                                    }
                                                                    {
                                                                        this.state.statusProcess === 'WAITING_RESPONSE_PRODUCER' && this.state.role === "ROLE_DISTRIBUTOR"
                                                                            ?
                                                                            <button type="button"
                                                                                className="btn btn-lg btn-block btn-danger"
                                                                                onClick={this.handleClickDeleteProcess}>
                                                                                Delete Transaction
                                                                        </button>
                                                                            : null
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                    {
                                        this.state.qrCodeList.length !== 0
                                            ?
                                            <div>
                                                <div className="card-header">
                                                    <h4 className="card-title">QR Code List </h4>
                                                </div>
                                                <div className="card-content collapse show">
                                                    <div className="card-body card-dashboard">
                                                        <table className="table table-striped table-bordered zero-configuration" style={{borderRightWidth:'0px', borderLeftWidth:'0px'}}>
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
                                                                {
                                                                    Array.isArray(this.state.qrCodeList)
                                                                    && this.state.qrCodeList.map(code => {
                                                                        return (
                                                                            <QRCode key={code.id} code={code}></QRCode>
                                                                        );
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <Snackbar open={this.state.progress} onClose={this.handleClosePopup}  >
                    <CircularProgress color="primary" />
                </Snackbar>
                <Snackbar open={this.state.alertSuccess} onClose={this.handleClosePopup}
                    autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                    <Alert severity="success" style={{ fontSize: '15px' }}>{this.state.alertMessage}</Alert>
                </Snackbar>
                <Snackbar open={this.state.alertFail} onClose={this.handleClosePopup}
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


export default connect(mapStateToProps)(TransactionDetails);