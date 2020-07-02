import React, { Component } from 'react';

class CarRecord extends Component {
    render() {
        return (
            <tr className="CarRecord">
                <td className="CarRecord">{this.props.car.id}</td>
                <td className="CarRecord">{this.props.car.numberPlate}</td>
                <td className="CarRecord">{this.props.car.autoMaker}</td>
                <td className="CarRecord">{this.props.car.statusDeliveryTruck}</td>
                <td className="CarRecord"></td>
            </tr>
        );
    }
}

export default CarRecord;