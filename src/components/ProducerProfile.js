import React, { Component } from 'react';

class ProducerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            companyName: '',
            TIN: '',
            email: '',
            url: '',
            phone: '',
            address: '',
            disable: true,
        }
    }
    componentDidMount() {
        const url = "http://localhost:8080/api/producer/get";
        const token = localStorage.getItem('token');
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(jsonResponse => {
                this.setState({
                    id: jsonResponse.result.id,
                    companyName: jsonResponse.result.companyName,
                    email: jsonResponse.result.email,
                    address: jsonResponse.result.address,
                    phone: jsonResponse.result.phone
                })
            })
    }
    handleClickDisable = () => {
        this.setState({ disable: !this.state.disable });
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        const profile = {
            id: this.state.id,
            companyName: this.state.companyName,
            email: this.state.email,
            address: this.state.address,
            phone: this.state.phone
        }
        console.log(profile);
        const url = "http://localhost:8080/api/producer/update";
        const token = localStorage.getItem('token');
        fetch(url, {
            method: "PATCH",
            body: JSON.stringify(profile),
            cache: 'no-cache',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
            })
        e.preventDefault();
    }

    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title" id="basic-layout-colored-form-control">Company Profile</h4>
                            <div className="heading-elements">
                                <button type="button" className="btn bg-info bg-lighten-3 " onClick={this.handleClickDisable}>
                                    Edit
								</button>
                            </div>
                        </div>
                        <div className="card-content collapse show">
                            <div className="card-body">
                                <form className="form">
                                    <div className="form-body">
                                        <h4 className="form-section"><i className="fa fa-eye"></i> About Company</h4>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="userinput1">Company Name</label>
                                                    <input type="text" id="userinput1" className="form-control border-primary" placeholder="Name" name="companyName" disabled={this.state.disable} defaultValue={this.state.companyName} onChange={this.handleChange} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="userinput2">TIN</label>
                                                    <input type="text" id="userinput2" className="form-control border-primary" placeholder="text indentify num" name="tin" disabled={this.state.disable} />
                                                </div>
                                            </div>
                                        </div>

                                        <h4 className="form-section"><i className="ft-mail"></i> Contact Info & Address</h4>

                                        <div className="form-group">
                                            <label htmlFor="userinput5">Email</label>
                                            <input className="form-control border-primary" type="email" placeholder="Email" id="userinput5" defaultValue={this.state.email} disabled={this.state.disable} onChange={this.handleChange} required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="userinput6">Website</label>
                                            <input className="form-control border-primary" type="url" placeholder="http://" id="userinput6" disabled={this.state.disable} />
                                        </div>

                                        <div className="form-group">
                                            <label>Contact Number</label>
                                            <input className="form-control border-primary" id="userinput7" type="tel" placeholder="Contact Number" name="phone" defaultValue={this.state.phone} disabled={this.state.disable} onChange={this.handleChange} required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="userinput8">Address</label>
                                            <textarea id="userinput8" rows="5" className="form-control border-primary" name="address" placeholder="Address" defaultValue={this.state.address} disabled={this.state.disable} onChange={this.handleChange} required></textarea>
                                        </div>

                                    </div>

                                    <div className="form-actions right">
                                        <button type="button" className="btn btn-warning mr-1">
                                            <i className="ft-x"></i> Cancel
								        </button>

                                        <button type="submit" className="btn bg-blue-grey bg-lighten-2" onClick={this.handleSubmit}>
                                            <i className="fa fa-check-square-o"></i> Save
								        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} export default ProducerProfile;