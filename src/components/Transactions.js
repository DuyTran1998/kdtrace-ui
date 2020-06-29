import React, { Component } from 'react';
import TransactionRecord from './TransactionRecord';
import {API_GET_ALL_TRANSACTION} from '../constants/API/api';

class Transactions extends Component {
    constructor(props){
        super(props);
        this.state = {
            listTransactions : [],
        }
    }
    componentDidMount(){
        const token = localStorage.getItem('token');
        this.getData(API_GET_ALL_TRANSACTION, token);
    }

    getData(url, token) {
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
                   listTransactions: res.result,
                })
                console.log(this.state.listTransactions);
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
                                        <div className="card-content collapse show">
                                            <div className="card-body card-dashboard">
                                                <table className="table table-striped table-bordered zero-configuration">
                                                    <thead>
                                                        <tr>
                                                            <th>Transaction_Id</th>
                                                            <th>Product_Name</th>
                                                            <th>Quantity</th>
                                                            <th>Status_Process</th>
                                                            <th>Create_At</th>
                                                            <th>Details</th>
                                                    
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                            Array.isArray(this.state.listTransactions)
                                                            && this.state.listTransactions.map(transaction => {
                                                                return (
                                                                    <TransactionRecord key={transaction.id} transaction={transaction}/>
                                                                );
                                                            })
                                                        }
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <th>Transaction_Id</th>
                                                            <th>Product_Name</th>
                                                            <th>Quantity</th>
                                                            <th>Status_Process</th>
                                                            <th>Create_At</th>
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

export default Transactions;