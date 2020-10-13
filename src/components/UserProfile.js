import React, { Component } from 'react';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: true,
        }
    }

    render() {
        const { result } = this.props;
        return (
            <form className="form">
                <div className="form-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="userinput1">Company Name</label>
                                <input
                                    type="text"
                                    id="userinput1"
                                    className="form-control border-primary"
                                    name="companyName"
                                    disabled={this.state.disable}
                                    defaultValue={result.companyName}
                                    onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="userinput2">Tax identification number</label>
                                <input
                                    type="text"
                                    id="userinput2"
                                    className="form-control border-primary" name="tin"
                                    disabled={this.state.disable}
                                    defaultValue={result.tin} onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>

                    <h4 className="form-section"><i className="ft-mail"></i> Contact Info & Address</h4>

                    <div className="form-group">
                        <label htmlFor="userinput5">Email</label>
                        <input
                            className="form-control border-primary"
                            type="email"
                            name="email" id="userinput5"
                            defaultValue={result.email}
                            disabled={this.state.disable}
                            onChange={this.handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="userinput6">Website</label>
                        <input
                            className="form-control border-primary"
                            type="url"
                            name="website" id="userinput6"
                            defaultValue={result.website}
                            disabled={this.state.disable} onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Contact Number</label>
                        <input
                            className="form-control border-primary"
                            id="userinput7"
                            type="tel"
                            name="phone"
                            defaultValue={result.phone}
                            disabled={this.state.disable} onChange={this.handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="userinput8">Address</label>
                        <textarea id="userinput8"
                            rows="5"
                            className="form-control border-primary"
                            name="address"
                            defaultValue={result.address}
                            disabled={this.state.disable} onChange={this.handleChange} required></textarea>
                    </div>
                </div>
            </form>
        );
    }
}

export default UserProfile;