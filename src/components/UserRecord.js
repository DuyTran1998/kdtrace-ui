import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';

const tdStyle = {
    paddingTop: '1px',
    paddingBottom: '5px',
};

class UserRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.user.active,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = e => {
        let value = e.target.checked;
        console.log(this.state.isChecked);
        this.setState({ 'isChecked': value });
        this.props.onChange(this.props.user.id);
    }
    render() {
        return (
            <tr className="UserRecord">
                <td className="UserRecord_Id">{this.props.user.id}</td>
                <td className="UserRecord_UserName">{this.props.user.username}</td>
                <td className="UserRecord_Email">{this.props.user.email}</td>
                <td className="UserRecord_Role">{this.props.user.role.roleName}</td>
                <td className="UserReCord_CreateAt">2011/04/25</td>
                <td className="UserRecord_Active" style={tdStyle}>
                    <Switch
                        checked={this.state.isChecked}
                        onChange={this.handleChange}
                        color="primary"
                        name="isChecked"
                    />
                </td>
            </tr>
        )
    };
}
export default UserRecord;