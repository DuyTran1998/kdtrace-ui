import React, { Component } from 'react';
import ProductRecord from './ProductRecord';
import { Dialog, DialogTitle, DialogContentText, DialogContent, Typography } from '@material-ui/core';
import ProductForm from './ProductForm';
import { API_GET_ALL_PRODUCT } from '../constants/API/api'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { CircularProgress } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listKeyFilter: new Map(),
            productListOrigin: [],
            productList: [],
            open: false,
            reload: false,
            page: 1,
            alertSuccess: false,
            alertFail: false,
            loading: true,
            asc: true,
            showArrow: {
                id: false,
                name: false,
                type: false,
                quantity: false,
                unit: false,
                mfg: false
            }
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        const url = API_GET_ALL_PRODUCT;
        const token = localStorage.getItem('token');
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(jsonResponse => {
                this.setState({
                    loading: false,
                    productList: jsonResponse.result,
                    productListOrigin: jsonResponse.result
                });
            })
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
        var list = this.state.productListOrigin;
        console.log(this.state.listKeyFilter);
        for (var [key, value] of this.state.listKeyFilter) {
            filterList = []
            for (let i = 0; i < list.length; i++) {
                if (list[i][key].toUpperCase().indexOf(value.toUpperCase()) > -1) {
                    filterList.push(list[i]);
                }
            }
            list = filterList;
        }

        this.setState({
            productList: filterList,
        })
    }

    hasLeading = s => /^\S+\s\S+\s\S+$/.test(s);
    sortData = (column, subColumn) => {
        let data = [];
        data = this.state.productList.sort((a, b) => {
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
            name: false,
            type: false,
            quantity: false,
            unit: false,
            mfg: false
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

    handleOpenDialog = () => {
        this.setState({
            open: true,
        });
    }

    handleClose = () => {
        this.setState({
            open: false,
        });
        this.componentDidMount();
    }
    handleOpenAlert = (flag) => {
        if (flag === 'success') {
            this.setState({ alertSuccess: true });
        }
        if (flag === 'fail') {
            this.setState({ alertFail: true })
        }
    }
    handleCloseAlert = e => {
        this.setState({ alertSuccess: false, alertFail: false });
    }

    increatePage = () => {
        if (this.state.productList.length / (this.state.page * 10) > 1) {
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
        const list = this.pagation(this.state.productList, this.state.page);
        return (
            <div className="app-content container center-layout mt-2">
                <div className="content-wrapper">
                    <div className="content-body">
                        <section id="configuration">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Product Management</h4>
                                        </div>
                                        <div className="content-header-right col-12">
                                            <div className="btn-group float-md-right">
                                                <button
                                                    className="btn btn-info round dropdown-toggle dropdown-menu-right px-2"
                                                    type="button"
                                                    aria-haspopup="true"
                                                    onClick={this.handleOpenDialog}>
                                                    <i className="ft-settings icon-left"></i> Create Product
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-content collapse show">
                                            <div className="card-body card-dashboard">
                                                <table style={{ marginLeft: 'auto', marginRight: '0' }}>
                                                    <tr>
                                                        <td>
                                                            <img src={"/seach.gif"} width="100%" style={{ maxWidth: "50px" }} alt="image" />
                                                        </td>
                                                        <td style={{ width: '121px' }}>
                                                            <input type="text" id="issueinput1" className="form-control" placeholder="Product Name" name="name" onChange={(e) => { this.handleKeyFilter(e) }} />
                                                        </td>
                                                        <td>
                                                            <select id="issueinput5" name="type" onChange={(e) => { this.handleKeyFilter(e) }} className="form-control" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Priority" >
                                                                <option value="">Type</option>
                                                                <option value="vegetable">Vegetable</option>
                                                                <option value="fruit">Fruits</option>
                                                                <option value="meal">Meals</option>
                                                                <option value="seafood">SeaFoods</option>
                                                                <option value="cereals">Cereals</option>
                                                                <option value="other">Other</option>
                                                            </select>
                                                        </td>
                                                        <td style={{ width: '110px' }}>
                                                            <input type="text" id="issueinput1" className="form-control" placeholder="Manufacture" name="mfg" onChange={(e) => { this.handleKeyFilter(e) }} />
                                                        </td>
                                                        <td style={{ width: '105px' }}>
                                                            <input type="text" id="issueinput1" className="form-control" placeholder="Expiration" name="exp" onChange={(e) => { this.handleKeyFilter(e) }} />
                                                        </td>
                                                    </tr>
                                                    <tr><p></p></tr>
                                                </table>
                                                {this.state.productList.length !== 0 ?
                                                    <div>
                                                        <table className="table table-striped table-bordered zero-configuration">
                                                            <thead>
                                                                <tr>
                                                                    <th onClick={() => this.sortData('id')}>        Id                  {this.handleArrow(this.state.showArrow.id)}</th>
                                                                    <th onClick={() => this.sortData('name')}>      Product Name        {this.handleArrow(this.state.showArrow.name)}</th>
                                                                    <th onClick={() => this.sortData('type')}>      Type                {this.handleArrow(this.state.showArrow.type)}</th>
                                                                    <th onClick={() => this.sortData('quantity')}>  Quantity            {this.handleArrow(this.state.showArrow.quantity)}</th>
                                                                    <th onClick={() => this.sortData('unit')}>      Unit                {this.handleArrow(this.state.showArrow.unit)}</th>
                                                                    <th onClick={() => this.sortData('mfg')}>       Manufacture         {this.handleArrow(this.state.showArrow.mfg)}</th>
                                                                    <th onClick={() => this.sortData('exp')}>       Expiration          {this.handleArrow(this.state.showArrow.exp)}</th>
                                                                    <th>Details</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    Array.isArray(list)
                                                                    && list.map(product => {
                                                                        return (
                                                                            <ProductRecord key={product.id}
                                                                                product={product}
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
                                                                        <button class="page-link">{this.state.page}</button>
                                                                    </li>
                                                                    <li class="page-item next" onClick={this.increatePage}>
                                                                        <button onClick={this.increatePage} class="page-link">Next</button>
                                                                    </li>
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
                                                            <h3>Don't have products!</h3>
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
                <Dialog
                    open={this.state.open}
                    keepMounted
                    onClose={this.handleClose}
                    fullWidth
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <DialogTitle id="alert-dialog-slide-title">{"Create product form"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <Typography>
                                <ProductForm handleClose={this.handleClose} handleOpenAlert={this.handleOpenAlert} />
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <Snackbar open={this.state.alertSuccess} onClose={this.handleCloseAlert}
                    autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                    <Alert severity="success" style={{ fontSize: '15px' }}>Create product successfully!</Alert>
                </Snackbar>
                <Snackbar open={this.state.alertFail} onClose={this.handleCloseAlert}
                    autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                    <Alert severity="error" style={{ fontSize: '15px' }}>Fail to create product!</Alert>
                </Snackbar>
            </div>
        )
    }
} export default ProductList;
