import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API_GET_PROFILE_PRODUCER, API_GET_PROFILE_TRANSPORT, API_UPDATE_PROFILE_PRODUCER} from '../constants/API/api';
import * as actions from '../actions/index';
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
            error: '',
            token:'',
            role: null,
            reload: false,
        }
    }
    componentDidMount() {
        const a = this.props.userContext.role;
        const token = localStorage.getItem('token');
        this.setState({
            token: localStorage.getItem('token')
        })
        console.log(this.state.token);
        if (a === 'ROLE_PRODUCER') {
            console.log(this.state.token);
            this.getProfileCompany(API_GET_PROFILE_PRODUCER, token);
        }
        if (a === 'ROLE_TRANSPORT') {
            this.getProfileCompany(API_GET_PROFILE_TRANSPORT, token);
        }
        console.log(this.state);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            role: nextProps.userContext.role,
        })
    }

    getProfileCompany(url, token) {
        console.log(url);
        console.log(token);
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                console.log(res);
                this.setState({
                    id: res.result.id,
                    companyName: res.result.companyName,
                    email: res.result.email,
                    address: res.result.address,
                    phone: res.result.phone
                })
            })
            .catch(error => {
                this.setState({
                    error: error,
                })
            })
    }
    handleClickDisable = () => {
        this.setState({ disable: !this.state.disable });
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(this.state);
    }

    handleSubmit = e => {
        const role = this.props.userContext.role;
        let api;
        if(role === "ROLE_PRODUCER"){
            api = API_UPDATE_PROFILE_PRODUCER;
        }
        if(role === 'ROLE_TRANSPORT'){
            api = API_GET_PROFILE_TRANSPORT;
        }
        this.updateProfileCompany(api, this.state.token);
        this.componentDidMount();
        e.preventDefault();
    }

    updateProfileCompany(url, token) {
        const profile = {
            id: this.state.id,
            companyName: this.state.companyName,
            email: this.state.email,
            address: this.state.address,
            phone: this.state.phone
        }
        console.log(profile);
        fetch(url, {
            method: "PATCH",
            body: JSON.stringify(profile),
            cache: 'no-cache',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                console.log(res);
            })
            .catch(error => {
                this.setState({
                    error: error,
                })
            })
    }

    render() {
        return (
            <div className="app-content container center-layout mt-2">
                <div className="content-wrapper">
                    <div className="content-body">
                        <section id="configuration">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row justify-content-md-center">
                                        <div className="col-md-6">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h4 className="card-title" id="basic-layout-colored-form-control">Company Profile</h4>
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
                                                                    <input className="form-control border-primary" type="email" placeholder="Email" name ="email" id="userinput5" defaultValue={this.state.email} disabled={this.state.disable} onChange={this.handleChange} required />
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
                                                                <button type="button" className="btn btn-warning mr-1" onClick={this.handleClickDisable}>
                                                                    <i className="ft-x"></i> Edit
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
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        userContext: state.profile,
    }
}

export default connect(mapStateToProps)(ProducerProfile);