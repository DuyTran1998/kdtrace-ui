import React, { Component } from 'react';
import QRCodeRecord from './QRCode';

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
        const url = "http://localhost:8080/api/product/get?id=" + id;
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
    render() {
        const qrCodeList = this.state.codes.map(code => {
            return (
                <QRCodeRecord key={code.id} code={code}></QRCodeRecord>
            );
        })
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title"><i class="fa fa-eye"></i>Product Management</h4>
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
            </div>
        );
    }
}
export default ProductDetail;