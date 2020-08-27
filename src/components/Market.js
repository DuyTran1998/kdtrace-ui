import React, { Component } from 'react';
import { API_GET_ALL_PRODUCT_FOR_DISTRIBUTOR } from '../constants/API/api';
import Product from './ProductInMarket'
import { CircularProgress } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

class Market extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            loading: true,
            asc: true,
            showArrow: {
                id: false,
                name: false,
                type: false,
                quantity: false,
                unit: false,
                mfg: false
            }
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        this.getDataForMarket(API_GET_ALL_PRODUCT_FOR_DISTRIBUTOR, token);
    }

    hasLeading = s => /^\S+\s\S+\s\S+$/.test(s);
    sortData = (column, subColumn) => {
        let data = [];
        data = this.state.productList.sort((a, b) => {
            if (subColumn === null || subColumn === undefined) {
                if (!this.state.asc) {
                    return this.hasLeading(b[column]) - this.hasLeading(a[column]) || a[column] > b[column] || -(a[column] < b[column])
                }
                return this.hasLeading(a[column]) - this.hasLeading(b[column]) || b[column] > a[column] || -(b[column] < a[column])
            } else {
                if (!this.state.asc) {
                    return this.hasLeading(b[column][subColumn]) - this.hasLeading(a[column][subColumn]) || a[column][subColumn] > b[column][subColumn] || -(a[column][subColumn] < b[column][subColumn])
                }
                return this.hasLeading(a[column][subColumn]) - this.hasLeading(b[column][subColumn]) || b[column][subColumn] > a[column][subColumn] || -(b[column][subColumn] < a[column][subColumn])
            }
        });
        var showArrow = {
            id: false,
            name: false,
            type: false,
            quantity: false,
            unit: false,
            mfg: false
        };
        showArrow[column] = true;
        this.setState({
            listTransactions: data,
            asc: !this.state.asc,
            showArrow: showArrow
        })
    }

    handleArrow = (show) => {
        if (show) {
            if (this.state.asc) return <ArrowDropUpIcon color="secondary" />
            return <ArrowDropDownIcon color="secondary" />
        }
        else {
            return <MoreHorizIcon color="disabled" />
        }
    }

    getDataForMarket(url, token) {
        this.setState({ loading: true })
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(res => {
                this.setState({ loading: false })
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
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Product Management</h4>
                                            <a className="heading-elements-toggle" href="!#"><i className="fa fa-ellipsis-v font-medium-3"></i></a>
                                        </div>
                                        <div className="card-content collapse show">
                                            <div className="card-body card-dashboard">
                                                {
                                                    this.state.productList.length !== 0 ?
                                                        <table className="table table-striped table-bordered zero-configuration">
                                                            <thead>
                                                                <tr>
                                                                    <th onClick={() => this.sortData('id')}>        Id                  {this.handleArrow(this.state.showArrow.id)}</th>
                                                                    <th onClick={() => this.sortData('name')}>      Product Name        {this.handleArrow(this.state.showArrow.name)}</th>
                                                                    <th onClick={() => this.sortData('type')}>      Type                {this.handleArrow(this.state.showArrow.type)}</th>
                                                                    <th onClick={() => this.sortData('quantity')}>  Quantity            {this.handleArrow(this.state.showArrow.quantity)}</th>
                                                                    <th onClick={() => this.sortData('unit')}>      Unit                {this.handleArrow(this.state.showArrow.unit)}</th>
                                                                    <th onClick={() => this.sortData('mfg')}>       Manufacture Date    {this.handleArrow(this.state.showArrow.mfg)}</th>
                                                                    <th onClick={() => this.sortData('exp')}>       Expiration Date     {this.handleArrow(this.state.showArrow.exp)}</th>
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
                                                        </table>
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
            </div>
        );
    }
}

export default Market;
