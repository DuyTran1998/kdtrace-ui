import React, { Component } from 'react';
import {Link} from "react-router-dom";

class TransactionRecord extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    render() {
        const link = "/transaction/"+ this.props.transaction.id;
        return (
             <tr className="TransactionRecord">
                <td className="Transaction">{this.props.transaction.id}</td>
                <td className="Transaction">{this.props.transaction.productID}</td>
                <td className="Transaction">{this.props.transaction.quanlity}</td>
                <td className="Transaction">{this.props.transaction.statusProcess}</td>
                <td className="Transaction">null</td>
                <td className="Transaction">
                    <Link to={link}><button className="btn btn-info"><span class="ladda-label">View Details</span></button></Link>
                </td>
            </tr>
        );
    }
}

export default TransactionRecord;