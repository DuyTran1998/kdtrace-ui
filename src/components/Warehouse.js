import React, { Component } from 'react';
import TransactionRecord from './TransactionRecord';
import { API_WAREHOUSE } from '../constants/API/api';
import { CircularProgress } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

class Warehouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listKeyFilter: new Map(),
            listTransactionsOrigin: [],
            listTransactions: [],
            loading: true,
            asc: true,
            showArrow: {
                id: false,
                productModel: false,
                quanlity: false,
                statusProcess: false,
                updateAt: false,
                create_at: false
            }
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('token');
        this.getData(API_WAREHOUSE, token);
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
        var list = this.state.listTransactionsOrigin;
        console.log(this.state.listKeyFilter);
        for (var [key, value] of this.state.listKeyFilter) {
            filterList = []
            for (let i = 0; i < list.length; i++) {
                if (key === 'name' || key === 'type') {
                    if (list[i].productModel[key].toUpperCase().indexOf(value.toUpperCase()) > -1) {
                        filterList.push(list[i]);
                    }
                }else if (list[i][key].toUpperCase().indexOf(value.toUpperCase()) > -1) {
                    filterList.push(list[i]);
                }
            }
            list = filterList;
        }

        this.setState({
            listTransactions: filterList,
        })
    }

    hasLeading = s => /^\S+\s\S+\s\S+$/.test(s);
    sortData = (column, subColumn) => {
        let data = [];
        data = this.state.listTransactions.sort((a, b) => {
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
            productModel: false,
            quanlity: false,
            statusProcess: false,
            updateAt: false,
            create_at: false
        };
        showArrow[column] = true;
        this.setState({
            listTransactions: data,
            asc: !this.state.asc,
            showArrow: showArrow
        })
    }

    handleArrow = (asc, show) => {
        if (show) {
            if (asc) return <ArrowDropUpIcon color="secondary" />
            return <ArrowDropDownIcon color="secondary" />
        }
        else {
            return <MoreHorizIcon color="disabled" />
        }
    }

    getData(url, token) {
        this.setState({
            loading: true
        })
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    loading: false
                })
                if (res.error) {
                    throw (res.error);
                }
                this.setState({
                    listTransactions: res.result,
                    listTransactionsOrigin: res.result
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
                                            <h4 className="card-title">WareHouse</h4>
                                            <a className="heading-elements-toggle" href="!#"><i className="fa fa-ellipsis-v font-medium-3"></i></a>
                                        </div>
                                        <div className="card-content collapse show">
                                            <div className="card-body card-dashboard">
                                                <table style={{ marginLeft: 'auto', marginRight: '0' }}>
                                                    <tr>
                                                        <td>
                                                            <img src={"/seach.gif"} width="100%" style={{ maxWidth: "50px" }} alt="image" />
                                                        </td>
                                                        <td style={{ width: '121px' }}>
                                                            <input type="text" id="issueinput1" className="form-control" placeholder="Product Name" name="productModel" onChange={(e) => { this.handleKeyFilter(e) }} />
                                                        </td>
                                                        <td>
                                                            <select id="issueinput5" name="type" onChange={(e) => { this.handleKeyFilter(e) }} className="form-control" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Priority" >
                                                                <option value="">Product Type</option>
                                                                <option value="vegetable">Vegetable</option>
                                                                <option value="fruit">Fruits</option>
                                                                <option value="meal">Meals</option>
                                                                <option value="seafood">SeaFoods</option>
                                                                <option value="cereals">Cereals</option>
                                                                <option value="other">Other</option>
                                                            </select>
                                                        </td>
                                                        <td style={{ width: '110px' }}>
                                                            <input type="text" id="issueinput1" className="form-control" placeholder="Last Update" name="updateAt" onChange={(e) => { this.handleKeyFilter(e) }} />
                                                        </td>
                                                        <td style={{ width: '105px' }}>
                                                            <input type="text" id="issueinput1" className="form-control" placeholder="Create Time" name="create_at" onChange={(e) => { this.handleKeyFilter(e) }} />
                                                        </td>
                                                    </tr>
                                                    <tr><p></p></tr>
                                                </table>

                                                {
                                                    this.state.listTransactions.length !== 0 ?
                                                        <div>
                                                            <table className="custom-small-padding table table-striped table-bordered zero-configuration">
                                                                <thead>
                                                                    <tr style={{ marginLeft: 0, marginRight: 0 }}>
                                                                        <th onClick={() => this.sortData('id')}>                    Transaction Id      {this.handleArrow(this.state.asc, this.state.showArrow.id)}</th>
                                                                        <th onClick={() => this.sortData('productModel', 'name')}>  Product Name        {this.handleArrow(this.state.asc, this.state.showArrow.productModel)}</th>
                                                                        <th onClick={() => this.sortData('quanlity')}>              Quantity            {this.handleArrow(this.state.asc, this.state.showArrow.quanlity)}</th>
                                                                        <th onClick={() => this.sortData('statusProcess')}>         Status Process      {this.handleArrow(this.state.asc, this.state.showArrow.statusProcess)}</th>
                                                                        <th onClick={() => this.sortData('updateAt')}>              Last Update         {this.handleArrow(this.state.asc, this.state.showArrow.updateAt)}</th>
                                                                        <th onClick={() => this.sortData('create_at')}>             Create Time         {this.handleArrow(this.state.asc, this.state.showArrow.create_at)}</th>
                                                                        <th>Details</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        Array.isArray(this.state.listTransactions)
                                                                        && this.state.listTransactions.map(transaction => {
                                                                            return (
                                                                                <TransactionRecord key={transaction.id} transaction={transaction} />
                                                                            );
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        :
                                                        this.state.loading === true ?
                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <CircularProgress color="primary" />
                                                            </div>
                                                            :
                                                            <div style={{ textAlign: 'center' }}>
                                                                <div><img width='130' src={'/no_data.png'} alt="nodata" /></div>
                                                                <h3>Don't have transactions!</h3>
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

export default Warehouse;
