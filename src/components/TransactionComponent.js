import React, { Component } from 'react';
import {
    API_GET_ALL_TRANSACTION_BY_PRODUCER,
    API_GET_ALL_TRANSACTION_BY_TRANSPORT,
    API_GET_ALL_TRANSACTION
} from '../constants/API/api';
import TransactionRecord from './TransactionRecord'
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

class TransactionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listKeyFilter: new Map(),
            listTransactionsOrigin: [],
            listTransactions: [],
            token: '',
            role: '',
            page: 1,
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
        const role = this.props.userContext.role;
        this.setDataByRole(role);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            role: nextProps.userContext.role,
        })
        if (nextProps.userContext.role) {
            this.setDataByRole(nextProps.userContext.role)
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
        var list = this.state.listTransactionsOrigin;
        console.log(this.state.listKeyFilter);
        for (var [key, value] of this.state.listKeyFilter) {
            filterList = []
            for (let i = 0; i < list.length; i++) {
                if (key === 'name' || key === 'type') {
                    if (list[i].productModel[key].toUpperCase().indexOf(value.toUpperCase()) > -1) {
                        filterList.push(list[i]);
                    }
                } else if (list[i][key].toUpperCase().indexOf(value.toUpperCase()) > -1) {
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

    handleArrow = (show) => {
        if (show) {
            if (this.state.asc) return <ArrowDropUpIcon color="secondary" />
            return <ArrowDropDownIcon color="secondary" />
        }
        else {
            return <MoreHorizIcon color="disabled" />
        }
    }

    setDataByRole(role) {
        const token = localStorage.getItem('token');
        this.setState({
            token: token
        })
        if (role === 'ROLE_PRODUCER') {
            this.getData(API_GET_ALL_TRANSACTION_BY_PRODUCER, token);
        }
        if (role === 'ROLE_TRANSPORT') {
            this.getData(API_GET_ALL_TRANSACTION_BY_TRANSPORT, token);
        }
        if (role === 'ROLE_DISTRIBUTOR') {
            this.getData(API_GET_ALL_TRANSACTION, token);
        }
    }
    increatePage = () => {
        if (this.state.listTransactions.length / (this.state.page * 10) > 1) {
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
        const list = this.pagation(this.state.listTransactions, this.state.page);
        return (
            <div className="app-content container center-layout mt-2">
                <div className="content-wrapper">
                    <div className="content-body">
                        <section id="configuration">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Transactions Management</h4>
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
                                                            <input type="text" id="issueinput1" className="form-control" placeholder="Product Name" name="name" onChange={(e) => { this.handleKeyFilter(e) }} />
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
                                                        <td>
                                                            <select id="issueinput5" name="statusProcess" onChange={(e) => { this.handleKeyFilter(e) }} className="form-control" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Priority" >
                                                                <option value="">Status Process</option>
                                                                <option value="PRODUCER_REJECT">PRODUCER_REJECT</option>
                                                                <option value="WAITING_RESPONSE_PRODUCER">WAITING_RESPONSE_PRODUCER</option>
                                                                <option value="CHOOSE_DELIVERYTRUCK_TRANSPORT">CHOOSE_DELIVERYTRUCK_TRANSPORT</option>
                                                                <option value="WAITING_RESPONSE_TRANSPORT">WAITING_RESPONSE_TRANSPORT</option>
                                                                <option value="ON_BOARDING_GET">ON_BOARDING_GET</option>
                                                                <option value="ON_BOARDING_RECEIVE">ON_BOARDING_RECEIVE</option>
                                                                <option value="RECEIVED">RECEIVED</option>
                                                                <option value="TRANSPORT_REJECT">TRANSPORT_REJECT</option>
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
                                                            <table className="custom-small-padding table table-striped table-bordered zero-configuration" >
                                                                <thead>
                                                                    <tr>
                                                                        <th onClick={() => this.sortData('id')}>                    Transaction Id      {this.handleArrow(this.state.showArrow.id)}</th>
                                                                        <th onClick={() => this.sortData('productModel', 'name')}>  Product Name        {this.handleArrow(this.state.showArrow.productModel)}</th>
                                                                        <th onClick={() => this.sortData('quanlity')}>              Quantity            {this.handleArrow(this.state.showArrow.quanlity)}</th>
                                                                        <th onClick={() => this.sortData('statusProcess')}>         Status Process      {this.handleArrow(this.state.showArrow.statusProcess)}</th>
                                                                        <th onClick={() => this.sortData('updateAt')}>              Last Update         {this.handleArrow(this.state.showArrow.updateAt)}</th>
                                                                        <th onClick={() => this.sortData('create_at')}>             Create Time         {this.handleArrow(this.state.showArrow.create_at)}</th>
                                                                        <th>Details</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        Array.isArray(list)
                                                                        && list.map(transaction => {
                                                                            return (
                                                                                <TransactionRecord key={transaction.id} transaction={transaction} />
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
const mapStateToProps = (state) => {
    return {
        userContext: state.profile,
    }
}


export default connect(mapStateToProps)(TransactionComponent);
