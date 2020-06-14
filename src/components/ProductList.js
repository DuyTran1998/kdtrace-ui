import React, { Component } from 'react';

class ProductList extends Component {
    render() {
        return (
            <div className="card-content collapse show">
                <div className="card-body card-dashboard">
                    <table className="table table-striped table-bordered zero-configuration">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Create date</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Id</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Create date</th>
                                <th>Active</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        )
    }
} export default ProductList;