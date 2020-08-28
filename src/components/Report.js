import React, { Component } from 'react';

class Report extends Component {
    render() {
        return (
            <tr className="Report">
                <td className="ReportId">{this.props.report.id}</td>
                <td className="UserRecord_UserName">
                    <a href={"https://" + this.props.report.productLink} target="_blank">[{this.props.report.productLink.slice(27)}]</a>
                </td>
                <td className="UserRecord_Email">{this.props.report.phone}</td>
                <td className="UserRecord_Role">{this.props.report.time}</td>
                <td className="UserReCord_CreateAt">{this.props.report.reportContent}</td>
            </tr>

        );
    }
}

export default Report;