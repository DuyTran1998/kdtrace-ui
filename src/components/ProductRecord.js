import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ExploreOffIcon from '@material-ui/icons/ExploreOff';
import CheckIcon from '@material-ui/icons/Check';
import Tooltip from '@material-ui/core/Tooltip';

class ProductRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const href = "/product/" + this.props.product.id;
        const moment = require('moment');
        const today = moment();
        var expDate = moment(this.props.product.exp, "YYYY-MM-DD");
        var subDay = expDate.diff(today, 'days');
        var exp = true;
        if (subDay > 0) {
            exp = false;
        }
        return (
            exp ?
                <tr className="ProductRecord">
                    < td className="ProductRecord_Id" > {this.props.product.id}</td >
                    <td className="ProductRecord_Name">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {this.props.product.name}
                            {<Tooltip title="Product is expired" placement="top"><ExploreOffIcon style={{ color: 'tomato' }} /></Tooltip>}
                        </div>
                    </td>
                    <td className="ProductRecord_Type">{this.props.product.type}</td>
                    <td className="ProductRecord_Quantity">{this.props.product.quantity}</td>
                    <td className="ProductRecord_Unit">{this.props.product.unit}</td>
                    <td className="ProductRecord_Mfg">{this.props.product.mfg}</td>
                    <td className="ProductRecord_Exp" style={{ color: 'tomato' }}>{this.props.product.exp}</td>
                    <td className="ProductRecord_Details"><Link to={href}>Details</Link></td>
                </tr >
                :
                <tr className="ProductRecord">
                    <td className="ProductRecord_Id">{this.props.product.id}</td>
                    <td className="ProductRecord_Name">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {this.props.product.name}
                            {<CheckIcon style={{ color: 'green' }} />}
                        </div></td>
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