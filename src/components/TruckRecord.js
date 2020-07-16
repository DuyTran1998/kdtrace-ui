import React, { Component } from 'react';

class TruckRecord extends Component {
    render() {
        return (
            <tr className="TruckRecord">
                <td className="TruckRecord">{this.props.truck.id}</td>
                <td className="TruckRecord">{this.props.truck.numberPlate}</td>
                <td className="TruckRecord">{this.props.truck.autoMaker}</td>
                <td className="TruckRecord">{this.props.truck.statusDeliveryTruck}</td>
                <td className="TruckRecord"></td>
            </tr>
        );
    }
}

export default TruckRecord;
