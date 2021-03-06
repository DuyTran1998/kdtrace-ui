import React, { Component } from 'react';
import { API_GET_ALL_PRODUCT_FOR_DISTRIBUTOR, API_GET_ALL_PRODUCER_NAME_FOR_DISTRIBUTOR } from '../constants/API/api';
import Product from './ProductInMarket'
import { CircularProgress } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

class Market extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listKeyFilter: new Map(),
            productListOrigin: [],
            productList: [],
            loading: true,
            page: 1,
            asc: true,
            showArrow: {
                id: false,
                name: false,
                type: false,
                quantity: false,
                unit: false,
                mfg: false
            },
            producerNameList: []
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        this.getDataForMarket(API_GET_ALL_PRODUCT_FOR_DISTRIBUTOR, token);
        this.getAllProducerName(API_GET_ALL_PRODUCER_NAME_FOR_DISTRIBUTOR, token);
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

    handleKeyFilter(e) {
        var keyMap = this.state.listKeyFilter;
        keyMap.set(e.target.name, e.target.value);
        this.setState({
            listKeyFilter: keyMap,
        })
        this.handleFilter();
    }

    handleFilter(e) {
        var filterList = [];
        var list = this.state.productListOrigin;
        console.log(this.state.listKeyFilter);
        for (var [key, value] of this.state.listKeyFilter) {
            filterList = []
            for (let i = 0; i < list.length; i++) {
                if (list[i][key].toUpperCase().indexOf(value.toUpperCase()) > -1) {
                    filterList.push(list[i]);
                }
            }
            list = filterList;
        }

        this.setState({
            productList: filterList,
        })
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
                    productListOrigin: res.result
                })
            })
            .catch(error => {
                this.setState({
                    error: error,
                })
            })
    }

    getAllProducerName(url, token) {
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
                console.log({res});
                this.setState({
                    producerNameList: res
                })
            })
            .catch(error => {
                this.setState({
                    error: error,
                })
            })
    }


    increatePage = () => {
        if (this.state.productList.length / (this.state.page * 10) > 1) {
            let newPageNum = this.state.page + 1;
            this.setState({
                page: newPageNum
            })
        }
    }

    decreatePage = () => {
        let newPageNum = this.state.page;
        if (newPageNum > 1) {
            this.setState({
                page: newPageNum - 1
            })
        }
    }

    pagation = (list, page) => {
        if (list.length < 10) {
            return list;
        }
        const newlist = list.slice(page * 10 - 10, page * 10);
        return newlist;
    }
    render() {
        const list = this.pagation(this.state.productList, this.state.page);
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
                                        <table style={{ marginLeft: 'auto', marginRight: '0' }}>
                                            <tr>
                                                <td>
                                                    <img src={"/seach.gif"} width="100%" style={{ maxWidth: "50px" }} alt="image" />
                                                </td>
                                                <td>
                                                    <select id="issueinput5" name="companyName" onChange={(e) => { this.handleKeyFilter(e) }} className="form-control" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Priority" >
                                                        <option value="">Producer</option>
                                                        {
                                                            this.state.producerNameList.map(producerName => {
                                                                return <option value={producerName}>{producerName}</option>
                                                            })
                                                        }
                                                    </select>
                                                </td>
                                                <td style={{ width: '121px' }}>
                                                    <input type="text" id="issueinput1" className="form-control" placeholder="Product Name" name="name" onChange={(e) => { this.handleKeyFilter(e) }} />
                                                </td>
                                                <td>
                                                    <select id="issueinput5" name="type" onChange={(e) => { this.handleKeyFilter(e) }} className="form-control" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Priority" >
                                                        <option value="">Type</option>
                                                        <option value="vegetable">Vegetable</option>
                                                        <option value="fruit">Fruits</option>
                                                        <option value="meal">Meals</option>
                                                        <option value="seafood">SeaFoods</option>
                                                        <option value="cereals">Cereals</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </td>
                                                <td style={{ width: '110px' }}>
                                                    <input type="text" id="issueinput1" className="form-control" placeholder="Manufacture" name="mfg" onChange={(e) => { this.handleKeyFilter(e) }} />
                                                </td>
                                                <td style={{ width: '105px' }}>
                                                    <input type="text" id="issueinput1" className="form-control" placeholder="Expiration" name="exp" onChange={(e) => { this.handleKeyFilter(e) }} />
                                                </td>
                                            </tr>
                                            <tr><p></p></tr>
                                        </table>
                                        <div className="card-content collapse show">
                                            <div className="card-body card-dashboard">
                                                {
                                                    this.state.productList.length !== 0 ?
                                                        <div>
                                                            <table className="table table-striped table-bordered zero-configuration">
                                                                <thead>
                                                                    <tr>
                                                                        <th onClick={() => this.sortData('id')}>        Id                  {this.handleArrow(this.state.showArrow.id)}</th>
                                                                        <th onClick={() => this.sortData('name')}>      Product Name        {this.handleArrow(this.state.showArrow.name)}</th>
                                                                        <th onClick={() => this.sortData('type')}>      Type                {this.handleArrow(this.state.showArrow.type)}</th>
                                                                        <th onClick={() => this.sortData('quantity')}>  Quantity            {this.handleArrow(this.state.showArrow.quantity)}</th>
                                                                        <th onClick={() => this.sortData('unit')}>      Unit                {this.handleArrow(this.state.showArrow.unit)}</th>
                                                                        <th onClick={() => this.sortData('mfg')}>       Manufacture         {this.handleArrow(this.state.showArrow.mfg)}</th>
                                                                        <th onClick={() => this.sortData('exp')}>       Expiration          {this.handleArrow(this.state.showArrow.exp)}</th>
                                                                        <th>Details</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        Array.isArray(list)
                                                                        && list.map(product => {
                                                                            return (
                                                                                <Product key={product.id} product={product} />
                                                                            );
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                            <div className="content-header-right col-12">
                                                                <div className="btn-group float-md-right">
                                                                    <ul class="pagination pagination-separate pagination-curved page2-links">
                                                                        <li class="page-item prev">
                                                                            <button onClick={this.decreatePage} class="page-link">Prev</button>
                                                                        </li>
                                                                        <li class="page-item active">
                                                                            <button class="page-link">{this.state.page}</button>
                                                                        </li>
                                                                        <li class="page-item next" onClick={this.increatePage}>
                                                                            <button onClick={this.increatePage} class="page-link">Next</button>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
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
