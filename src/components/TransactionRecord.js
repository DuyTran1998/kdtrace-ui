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
                <td className="Transaction">
                    {
                        this.props.transaction.statusProcess === 'PRODUCER_REJECT' ?
                        <h4><span className="badge badge-danger">{this.props.transaction.statusProcess}</span></h4>
                        : null
                    }
                    {
                        this.props.transaction.statusProcess === 'WAITING_RESPONSE_PRODUCER' ?
                        <h4><span className="badge badge-info">{this.props.transaction.statusProcess}</span></h4>
                        : null
                    }
                    {
                        this.props.transaction.statusProcess === 'CHOOSE_DELIVERYTRUCK_TRANSPORT' ?
                        <h4><span className="badge badge-info">{this.props.transaction.statusProcess}</span></h4>
                        : null
                    }
                    {
                        this.props.transaction.statusProcess === 'WAITING_RESPONSE_TRANSPORT' ?
                        <h4><span className="badge badge-info">{this.props.transaction.statusProcess}</span></h4>
                        : null
                    }
                     {
                        this.props.transaction.statusProcess === 'ON_BOARDING_GET' ?
                        <h4><span className="badge badge-info">{this.props.transaction.statusProcess}</span></h4>
                        : null
                    }
                    {
                        this.props.transaction.statusProcess === 'ON_BOARDING_REVEIVE' ?
                        <h4><span className="badge badge-info">{this.props.transaction.statusProcess}</span></h4>
                        : null
                    }
                    {
                        this.props.transaction.statusProcess === 'REVEIVED' ?
                        <h4><span className="badge badge-success">{this.props.transaction.statusProcess}</span></h4>
                        : null
                    }
                    {
                        this.props.transaction.statusProcess === 'TRANSPORT_REJECT' ?
                        <h4><span className="badge badge-warning">{this.props.transaction.statusProcess}</span></h4>
                        : null
                    }
                </td>
                <td className="Transaction">{this.props.transaction.create_at}</td>
                <td className="Transaction">
                    <Link to={link}><span className="ladda-label">View Details</span></Link>
                </td>
            </tr>
        );
    }
}

export default TransactionRecord;