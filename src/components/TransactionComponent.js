import React, { Component } from 'react';
import {
    API_GET_ALL_TRANSACTION_BY_PRODUCER,
    API_GET_ALL_TRANSACTION_BY_TRANSPORT,
    API_GET_ALL_TRANSACTION
} from '../constants/API/api';
import TransactionRecord from './TransactionRecord'
import { connect } from 'react-redux';

class TransactionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTransactions: [],
            token: '',
            role: '',
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
                                        {
                                            this.state.listTransactions.length !== 0 ?
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
                                                                            <TransactionRecord key={transaction.id} transaction={transaction} />
                                                                        );
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    <h1 style={{
                                                        textAlign: "center",
                                                        marginTop: 20
                                                    }}>
                                                        Don't have transactions!
                                                     </h1>
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