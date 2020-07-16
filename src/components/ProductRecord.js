import React, { Component } from 'react';
import {Link} from "react-router-dom";

class ProductRecord extends Component {
    constructor(props){
        super(props);
        this.state= {

        }
    }
    render() {
        const href = "/product/"+this.props.product.id;

        return (
            <tr className="ProductRecord">
                <td className="ProductRecord_Id">{this.props.product.id}</td>
                <td className="ProductRecord_Name">{this.props.product.name}</td>
                <td className="ProductRecord_Type">{this.props.product.type}</td>
                <td className="ProductRecord_Quantity">{this.props.product.quantity}</td>
                <td className="ProductRecord_Unit">{this.props.product.unit}</td>
                <td className="ProductRecord_Mfg">{this.props.product.mfg}</td>
                <td className="ProductRecord_Exp">{this.props.product.exp}</td>
                <td className="ProductRecord_Details"><Link to={href}>Details</Link></td>
            </tr>
        )
    }
} export default ProductRecord;