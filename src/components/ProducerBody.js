import React, { Component } from 'react';
import ProductList from './ProductList';
import { Switch, Route } from 'react-router-dom'
import '../assets/css/ProducerBody.css';
import ProductForm from './ProductForm';
import ProducerProfile from './ProducerProfile';

class ProducerBody extends Component {
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
                                            <h4 className="card-title">Product Management</h4>
                                            <a className="heading-elements-toggle" href="!#"><i className="fa fa-ellipsis-v font-medium-3"></i></a>
                                        </div>
                                        <div className="content-header-right col-12">
                                            <div className="btn-group float-md-right">
                                                <button className="btn btn-info round dropdown-toggle dropdown-menu-right px-2" type="button" aria-haspopup="true" ><i className="ft-settings icon-left"></i> Create Product</button>
                                            </div>
                                        </div>
                                       
                                    </div>
                                    <ProducerProfile />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
} export default ProducerBody;