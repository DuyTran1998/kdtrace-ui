import React, { Component } from 'react';
import TransactionRecord from './TransactionRecord';
import { API_GET_ALL_TRANSACTION } from '../constants/API/api';
import { CircularProgress } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTransactions: [],
            page: 1,
            loading: true,
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
        this.getData(API_GET_ALL_TRANSACTION, token);
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
                                        {
                                            this.state.listTransactions.length !== 0 ?
                                                <div>
                                                    <div className="card-content collapse show">
                                                        <div className="card-body card-dashboard">
                                                            <table className="custom-small-padding table table-striped table-bordered zero-configuration">
                                                                <thead>
                                                                    <tr style={{ marginLeft: 0, marginRight: 0 }}>
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
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default Transactions;
