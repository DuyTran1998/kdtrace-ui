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
                                    <ProductList />
                                    <ProducerProfile/>
                                    <ProductForm />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
} export default ProducerBody;