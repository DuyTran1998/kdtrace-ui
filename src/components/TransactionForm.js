import React, { Component } from 'react';
import { API_CREATE_TRANSACTION } from '../constants/API/api';
import history from '../utils/@history';
import { Snackbar, CircularProgress } from '@material-ui/core';

class TransactionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            quantity: '',
            error: '',
            progress: false
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        this.setState({ progress: true });
        const transactionModel = {
            id_product: this.props.product.id,
            quantity: this.state.quantity,
        }
        console.log(transactionModel);

        const token = localStorage.getItem('token');
        fetch(API_CREATE_TRANSACTION, {
            method: "POST",
            body: JSON.stringify(transactionModel),
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
                    this.props.handleClose();
                    this.props.handleOpenAlert('success', res.message);
                    this.handleCloseProgress();
                    // history.push('/dashboard');
                } else {
                    this.props.handleOpenAlert('fail', res.message);
                    this.handleCloseProgress();
                }
            })
            .catch(error => {
                this.setState({
                    error: error,
                })
            })
        e.preventDefault();
    }
    handleCloseProgress = e => {
        this.setState({ progress: false });
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <div className="form-body">
                    <div className="form-group">
                        <label htmlFor="issueinput1">Product Name:</label>
                        <input type="text" id="issueinput1" className="form-control" placeholder={this.props.product.productName} name="name" disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="issueinput5">Type:</label>
                        <input type="text" id="issueinput1" className="form-control" placeholder={this.props.product.type} name="type" disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="issueinput6">Unit:</label>
                        <input type="text" id="issueinput1" className="form-control" placeholder={this.props.product.unit} name="unit" disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="issueinput2">Quantity:</label>
                        <input type="text" id="issueinput2" className="form-control" placeholder="1,2,3..." name="quantity" onChange={this.handleChange} data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Opened By" required />
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="issueinput3">Manufacture Date: </label>
                                <input type="text" id="issueinput1" className="form-control" placeholder={this.props.product.mfg} name="mfg" disabled />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="issueinput4">Expiration Date: </label>
                                <input type="text" id="issueinput1" className="form-control" placeholder={this.props.product.exp} name="exp" disabled />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-actions right">
                    <button
                        type="button"
                        onClick={this.props.handleClose}
                        className="btn btn-warning mr-1">
                        <i className="ft-x"></i> Cancel
								        </button>
                    <button type="submit" className="btn btn-primary">
                        <i className="fa fa-check-square-o"></i> Save
					</button>
                </div>
                <Snackbar open={this.state.progress} onClose={this.handleCloseProgress}  >
                    <CircularProgress color="primary" />
                </Snackbar>
            </form>
        );
    }
}

export default TransactionForm;