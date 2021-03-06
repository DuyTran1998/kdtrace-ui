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
                <td className="Transaction">{this.props.transaction.productModel.name}</td>
                <td className="Transaction">{this.props.transaction.quanlity}</td>
                <td className="Transaction">
                    {
                        this.props.transaction.statusProcess === 'PRODUCER_REJECT' ?
                        <h4><span className="badge badge-danger">{this.props.transaction.statusProcess}</span></h4>
                        : null
                    }
                    {
                        this.props.transaction.statusProcess === 'WAITING_RESPONSE_PRODUCER' ?
                        <h4><span className="badge" style={{backgroundColor: 'palevioletred'}}>{this.props.transaction.statusProcess}</span></h4>
                        : null
                    }
                    {
                        this.props.transaction.statusProcess === 'CHOOSE_DELIVERYTRUCK_TRANSPORT' ?
                        <h4><span className="badge" style={{backgroundColor: 'steelblue'}}>{this.props.transaction.statusProcess}</span></h4>
                        : null
                    }
                    {
                        this.props.transaction.statusProcess === 'WAITING_RESPONSE_TRANSPORT' ?
                        <h4><span className="badge" style={{backgroundColor: 'darkturquoise'}}>{this.props.transaction.statusProcess}</span></h4>
                        : null
                    }
                     {
                        this.props.transaction.statusProcess === 'ON_BOARDING_GET' ?
                        <h4><span className="badge" style={{backgroundColor: 'deepskyblue'}}>{this.props.transaction.statusProcess}</span></h4>
                        : null
                    }
                    {
                        this.props.transaction.statusProcess === 'ON_BOARDING_RECEIVE' ?
                        <h4><span className="badge" style={{backgroundColor: 'mediumorchid'}}>{this.props.transaction.statusProcess}</span></h4>
                        : null
                    }
                    {
                        this.props.transaction.statusProcess === 'RECEIVED' ?
                        <h4><span className="badge" style={{backgroundColor: 'mediumaquamarine'}}>{this.props.transaction.statusProcess}</span></h4>
                        : null
                    }
                    {
                        this.props.transaction.statusProcess === 'TRANSPORT_REJECT' ?
                        <h4><span className="badge badge-warning">{this.props.transaction.statusProcess}</span></h4>
                        : null
                    }
                </td>
                <td className="Transaction">{this.props.transaction.updateAt}</td>
                <td className="Transaction">{this.props.transaction.create_at}</td>
                <td className="Transaction">
                    <Link to={link}><span className="ladda-label">Details</span></Link>
                </td>
            </tr>
        );
    }
}

export default TransactionRecord;