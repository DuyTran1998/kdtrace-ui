import React, { Component } from 'react';
import UserRecord from './UserRecord';

class UserList extends Component {
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
                                            <h4 className="card-title">User Management</h4>
                                            <a className="heading-elements-toggle" href="!#"><i className="fa fa-ellipsis-v font-medium-3"></i></a>
                                        </div>
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
                                                        <UserRecord />
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Position</th>
                                                            <th>Office</th>
                                                            <th>Age</th>
                                                            <th>Start date</th>
                                                            <th>Salary</th>
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
export default UserList;