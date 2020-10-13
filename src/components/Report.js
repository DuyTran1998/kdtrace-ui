import React, { Component } from 'react';
import Rating from '@material-ui/lab/Rating';

class Report extends Component {
    render() {
        return (
            <tr className="Report">
                <td className="UserRecord_UserName">
                    <a href={"https://" + this.props.report.productLink} target="_blank">[{this.props.report.productLink.slice(27)}]</a>
                </td>
                <td className="ReportId">{this.props.report.name}</td>
                <td className="UserRecord_Email">{this.props.report.phone}</td>
                <td className="UserRecord_Role">{this.props.report.time}</td>
                <td className="UserReCord_CreateAt">{this.props.report.reportContent}</td>
                <td className="UserReCord_CreateAt"><Rating name="read-only" value={this.props.report.rate} readOnly /></td>
            </tr>

        );
    }
}

export default Report;