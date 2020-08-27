import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import Report from '../components/Report';

class ReportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            reportList: [{
                id: 1,
                productLink: "https://checking.kdtrace.xyz/?code=P1-N1",
                phone: "092214212",
                time: "2020/08/27 14:36:50",
                reportContent: "Hang gia, kem chat luong",
            }],
        }
    }
    increatePage = () => {
        if (this.state.reportList.length / (this.state.page * 10) > 1) {
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
    render() {
        const list = this.pagation(this.state.reportList, this.state.page);
        return (
            <div className="app-content container center-layout mt-2">
                <div className="content-wrapper">
                    <div className="content-body">
                        <section id="configuration">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Report From Customers</h4>
                                            <a className="heading-elements-toggle" href="!#"><i className="fa fa-ellipsis-v font-medium-3"></i></a>
                                        </div>
                                        {
                                            this.state.reportList.length !== 0 ?
                                                <div>
                                                    <div className="card-content collapse show">
                                                        <div className="card-body card-dashboard">
                                                            <table className="table table-striped table-bordered zero-configuration">
                                                                <thead>
                                                                    <tr>
                                                                        <th align="center">Id</th>
                                                                        <th align="center">Product URL</th>
                                                                        <th align="center">Phone Customer</th>
                                                                        <th align="center">Time Report</th>
                                                                        <th >Content Report</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        Array.isArray(list)
                                                                        && list.map(report => {
                                                                            return (
                                                                                <Report
                                                                                    key={report.id}
                                                                                    report={report}
                                                                                />
                                                                            );
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="content-header-right col-12">
                                                        <div className="btn-group float-md-right">
                                                            <ul class="pagination pagination-separate pagination-curved page2-links">
                                                                <li class="page-item prev">
                                                                    <button onClick={this.decreatePage} class="page-link">Prev</button>
                                                                </li>
                                                                <li class="page-item active">
                                                                    <a href="!#" class="page-link">{this.state.page}</a>
                                                                </li>
                                                                <li class="page-item next" onClick={this.increatePage}>
                                                                    <button onClick={this.increatePage} class="page-link">Next</button>
                                                                </li>
                                                                {/* <li>
                                                                    <Link to={'?page=' + (this.state.page - 1)} onClick={this.decreatePage}><i className="ft-arrow-left"></i> Previous</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={'?page=' + (this.state.page + 1)} onClick={this.increatePage}>Next <i className="ft-arrow-right"></i></Link>
                                                                </li> */}

                                                            </ul>
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
                                                        <h3>Don't have users!</h3>
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

export default ReportList;