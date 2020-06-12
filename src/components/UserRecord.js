import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import '../assets/css/UserRecord.css'

const tdStyle = {
    paddingTop: '1px',
    paddingBottom: '5px',
};

class UserRecord extends Component {
    constructor(props){
        super(props);
        this.state = {
            isChecked: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = e => {
        console.log(this.state.isChecked);
        let value = e.target.checked;
        this.setState({'isChecked': value});
    }
    render() {
        return (
            <tr className="UserRecord">
                <td className="UserRecord_Id">1</td>
                <td className="UserRecord_UserName">DuyTran1998</td>
                <td className="UserRecord_Email">Duytran1998@gmail.com</td>
                <td className="UserRecord_Role">ROLE_ADMIN</td>
                <td className="UserReCord_CreateAt">2011/04/25</td>
                <td className= "UserRecord_Active" style={tdStyle}>
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