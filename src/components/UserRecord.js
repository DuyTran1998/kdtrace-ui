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
        this.setState({ 'isChecked': value });
        this.props.onChange(this.props.user.id);
    }

    handleEvent = e => {
        this.props.getProfile(this.props.user.username, this.props.user.role.roleName);
        this.props.open();
    }
    render() {
        return (
            <tr className="UserRecord">
                <td className="UserRecord_Id">{this.props.user.id}</td>
                <td className="UserRecord_UserName">
                    <div onClick= {this.handleEvent}>
                        {this.props.user.username}
                    </div>
                </td>
                <td className="UserRecord_Email">{this.props.user.email}</td>
                <td className="UserRecord_Role">{this.props.user.role.roleName}</td>
                <td className="UserReCord_CreateAt">{this.props.user.createAt}</td>
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