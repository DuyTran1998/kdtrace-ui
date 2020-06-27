import React, { Component } from 'react';
import TransactionRecord from './TransactionRecord';

class Transactions extends Component {
    constructor(props){
        super(props);
        this.state={
            
        }
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
                                                            <th>Product_Id</th>
                                                            <th>Product_Name</th>
                                                            <th>Quantity</th>
                                                            <th>Status_Process</th>
                                                            <th>Create_At</th>
                                                            <th>Details</th>
                                                    
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <TransactionRecord/>
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <th>Transaction_Id</th>
                                                            <th>Product_Id</th>
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