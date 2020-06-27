import React, { Component } from 'react';
import {API_GET_ALL_PRODUCT_FOR_DISTRIBUTOR} from '../constants/API/api';
import Product from './ProductInMarket'

class Market extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        this.getDataForMarket(API_GET_ALL_PRODUCT_FOR_DISTRIBUTOR, token);
    }

    getDataForMarket(url, token) {
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
                    productList: res.result,
                })
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
                                <div className="col-15 ">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Product Management</h4>
                                            <a className="heading-elements-toggle" href="!#"><i className="fa fa-ellipsis-v font-medium-3"></i></a>
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
                                                        {
                                                            Array.isArray(this.state.productList)
                                                            && this.state.productList.map(product => {
                                                                return (
                                                                    <Product key={product.id} product={product} />
                                                                );
                                                            })
                                                        }
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

export default Market;