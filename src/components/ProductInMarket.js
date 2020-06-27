import React, { Component } from 'react';
import {Link} from "react-router-dom";

class ProductInMarket extends Component {
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
                {/* <td className="ProductRecord_Details"><Link to={href}>Link</Link></td> */}
                <td>
                     <Link to={href}><button className="btn btn-info btn-min-width mr-1 mb-1 ladda-button" data-style="zoom-in"><span class="ladda-label">View Details</span></button></Link>
                </td>
            </tr>
        )
        }
}

export default ProductInMarket;