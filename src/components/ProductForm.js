import React, { Component } from 'react';
import { API_CREATE_PRODUCT} from '../constants/API/api';
import {Snackbar, CircularProgress} from '@material-ui/core';
class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            quantity: '',
            type: 'Vegetable',
            unit: 'PCS',
            exp: '',
            mfg: '',
            progress: false
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        this.setState({ progress: true });
        const productModel = {
            exp: this.state.exp,
            mfg: this.state.mfg,
            name: this.state.name,
            quantity: parseInt(this.state.quantity),
            type: this.state.type,
            unit: this.state.unit
        }

        const token = localStorage.getItem('token');
        fetch(API_CREATE_PRODUCT, {
            method: "POST",
            body: JSON.stringify(productModel),
            cache: 'no-cache',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(response => response.json())
            .then(res => {
                this.handleCloseProgress();
                if(res.status === 200){
                    this.props.handleOpenAlert('success');
                    this.props.handleClose();
                }
                else{
                    this.props.handleOpenAlert('fail');
                }
            })
        e.preventDefault();
    }
    handleCloseProgress = e => {
        this.setState({ progress: false});
    }
    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <div className="form-body">
                    <div className="form-group">
                        <label htmlFor="issueinput1">Product Name</label>
                        <input type="text" id="issueinput1" className="form-control" placeholder="Ex: Apple" name="name" onChange={this.handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="issueinput5">Type</label>
                        <select id="issueinput5" name="type" onChange={this.handleChange} className="form-control" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Priority" required>
                            <option value="vegetable">Vegetable</option>
                            <option value="fruit">Fruits</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="issueinput6">Unit</label>
                        <select id="issueinput6" name="unit" onChange={this.handleChange} className="form-control" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Status" required>
                            <option value="PCS">PCS</option>
                            <option value="DOZENS">DOZENS</option>
                            <option value="BOXS">BOXS</option>
                            <option value="KGS">KGS</option>
                            <option value="TONS">TONS</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="issueinput2">Quantity</label>
                        <input type="text" id="issueinput2" className="form-control" placeholder="1,2,3..." name="quantity" onChange={this.handleChange} data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Opened By" required/>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="issueinput3">Manufacture Date</label>
                                <input type="date" id="issueinput3" className="form-control" name="mfg" onChange={this.handleChange} data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Date Opened" required/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="issueinput4">Expiration Date</label>
                                <input type="date" id="issueinput4" className="form-control" name="exp" onChange={this.handleChange} data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Date Fixed" required/>
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
export default ProductForm;