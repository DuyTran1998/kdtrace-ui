import React, { Component } from 'react';
import QRCode from 'qrcode.react';

class QRCodeRecord extends Component {
    render() {
        return (
            <tr className="ProductRecord">
                <td className="ProductRecord_Id">{this.props.code.id}</td>
                <td className="ProductRecord_Name">{this.props.code.code}</td>
                <td className="ProductRecord_Type">{this.props.code.ower}</td>
                <td className="ProductRecord_Quantity">{this.props.code.statusQRCode}</td>
                <td className="ProductRecord_Unit"><QRCode id='qrcode' value={this.props.code.link} size={150} level={'H'} includeMargin={true}></QRCode></td>
            </tr>
        )
    }
} export default QRCodeRecord;