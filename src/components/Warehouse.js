import React, { Component } from 'react';
import TransactionRecord from './TransactionRecord';
import { API_WAREHOUSE } from '../constants/API/api';
import { CircularProgress } from '@material-ui/core';

class Warehouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTransactions: [],
            loading: true,
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('token');
        this.getData(API_WAREHOUSE, token);
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
                                            <div>
                                                <div className="card-content collapse show">
                                                    <div className="card-body card-dashboard">
                                                        <table className="custom-small-padding table table-striped table-bordered zero-configuration">
                                                            <thead>
                                                                <tr style={{ marginLeft: 0, marginRight: 0 }}>
                                                                    <th>Transaction Id</th>
                                                                    <th>Product Name</th>
                                                                    <th>Quantity</th>
                                                                    <th>Status Process</th>
                                                                    <th>Last Update</th>
                                                                    <th>Create Time</th>
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

export default Warehouse;