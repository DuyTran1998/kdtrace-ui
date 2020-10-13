import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import Report from '../components/Report';
import { API_GET_REPORTS } from '../constants/API/api'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


class ReportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            listKeyFilter: new Map(),
            reportListOrigin: [],
            reportList: [],
            loading: true,
            asc: true,
            showArrow: {
                id: false,
                time: false,
                productLink: false
            }

        }
    }
    componentDidMount() {
        this.getAllReport();
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
        var list = this.state.reportListOrigin;
        console.log(this.state.listKeyFilter);
        for (var [key, value] of this.state.listKeyFilter) {
            filterList = []
            for (let i = 0; i < list.length; i++) {
                if (key === 'productLink') {
                    if (list[i][key].toUpperCase().slice(27).indexOf(value.toUpperCase()) > -1) {
                        filterList.push(list[i]);
                    }
                } else if (list[i][key].toUpperCase().indexOf(value.toUpperCase()) > -1) {
                    filterList.push(list[i]);
                }
            }
            list = filterList;
        }

        this.setState({
            reportList: filterList,
        })
    }


    hasLeading = s => /^\S+\s\S+\s\S+$/.test(s);
    sortData = (column, subColumn) => {
        let data = [];
        data = this.state.reportList.sort((a, b) => {
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
            time: false,
            productLink: false
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

    getAllReport = () => {
        const token = localStorage.getItem('token');
        this.setState({ loading: true })
        const url = API_GET_REPORTS;
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                this.setState({ loading: false })
                this.setState({
                    reportList: jsonResponse.result,
                    reportListOrigin: jsonResponse.result
                });
            })
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
                                        <div className="card-content collapse show">
                                            <div className="card-body card-dashboard">
                                                <table style={{ marginLeft: 'auto', marginRight: '0' }}>
                                                    <tr>
                                                        <td>
                                                            <img src={"/seach.gif"} width="100%" style={{ maxWidth: "50px" }} alt="image" />
                                                        </td>
                                                        <td style={{ width: '121px' }}>
                                                            <input type="text" id="issueinput1" className="form-control" placeholder="Product URL" name="productLink" onChange={(e) => { this.handleKeyFilter(e) }} />
                                                        </td>
                                                        <td style={{ width: '121px' }}>
                                                            <input type="text" id="issueinput1" className="form-control" placeholder="Time Report" name="time" onChange={(e) => { this.handleKeyFilter(e) }} />
                                                        </td>
                                                    </tr>
                                                    <tr><p></p></tr>
                                                </table>
                                                {
                                                    this.state.reportList.length !== 0 ?
                                                        <div>
                                                            <table className="table table-striped table-bordered zero-configuration">
                                                                <thead>
                                                                    <tr>
                                                                        <th align="center" onClick={() => this.sortData('productLink')}>Product URL{this.handleArrow(this.state.showArrow.productLink)}</th>
                                                                        <th >Name of Customer</th>
                                                                        <th align="center">Phone Customer</th>
                                                                        <th align="center" onClick={() => this.sortData('time')}>Time Report{this.handleArrow(this.state.showArrow.time)}</th>
                                                                        <th >Content Report</th>
                                                                        <th onClick={() => this.sortData('rate')}>Rate{this.handleArrow(this.state.showArrow.rate)}</th>
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