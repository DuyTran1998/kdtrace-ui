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
            listTransactions: [],
            token: '',
            role: '',
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
                                                <div className="card-content collapse show">
                                                    <div className="card-body card-dashboard">
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
const mapStateToProps = (state) => {
    return {
        userContext: state.profile,
    }
}


export default connect(mapStateToProps)(TransactionComponent);
