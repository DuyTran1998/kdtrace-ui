import React, { Component } from 'react';
class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            quantity: '',
            type: 'Vegetable',
            unit: 'PCS',
            exp: '',
            mfg: ''
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) =>{
        const productModel = {
            exp: this.state.exp,
            mfg: this.state.mfg,
            name: this.state.name,
            quantity: parseInt(this.state.quantity),
            type: this.state.type,
            unit: this.state.unit
        }
        console.log(productModel);

        const token = localStorage.getItem('token');
        const url = "http://localhost:8080/api/product/create"
        fetch(url, {
            method: "POST",
            body: JSON.stringify(productModel),
            cache: 'no-cache',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(response => response.json())
        .then(jsonResponse =>{
            console.log(jsonResponse);
        })
        e.preventDefault();
    }
    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title" id="basic-layout-tooltip">Product Form</h4>
                            <a className="heading-elements-toggle" href="!#"><i className="fa fa-ellipsis-v font-medium-3"></i></a>
                        </div>
                        <div className="card-content collapse show">
                            <div className="card-body">
                                <form className="form">
                                    <div className="form-body">
                                        <div className="form-group">
                                            <label htmlFor="issueinput1">Product Name</label>
                                            <input type="text" id="issueinput1" className="form-control" placeholder="Ex: Apple" name="name" onChange={this.handleChange} data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Issue Title" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="issueinput5">Type</label>
                                            <select id="issueinput5" name="type" onChange={this.handleChange} className="form-control" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Priority">
                                                <option value="vegetable">Vegetable</option>
                                                <option value="fruit">Fruits</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="issueinput6">Unit</label>
                                            <select id="issueinput6" name="unit" onChange={this.handleChange} className="form-control" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Status">
                                                <option value="PCS">PCS</option>
                                                <option value="DOZENS">DOZENS</option>
                                                <option value="BOXS">BOXS</option>
                                                <option value="KGS">KGS</option>
                                                <option value="TONS">TONS</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="issueinput2">Quantity</label>
                                            <input type="text" id="issueinput2" className="form-control" placeholder="1,2,3..." name="quantity" onChange={this.handleChange} data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Opened By" />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="issueinput3">Manufacture Date</label>
                                                    <input type="date" id="issueinput3" className="form-control" name="mfg" onChange={this.handleChange} data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Date Opened" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="issueinput4">Expiration Date</label>
                                                    <input type="date" id="issueinput4" className="form-control" name="exp" onChange={this.handleChange} data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Date Fixed" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-actions">
                                        <button type="button" className="btn btn-warning mr-1">
                                            <i className="ft-x"></i> Cancel
								        </button>
                                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
                                            <i className="fa fa-check-square-o"></i> Save
								        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ProductForm;