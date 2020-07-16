import React, { Component } from 'react';
import AdminMenu from './AdminMenu';
import ProducerMenu from './ProducerMenu';
import DistributorMenu from './DistributorMenu';
import { connect } from 'react-redux';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: null,
        }
    }
    componentDidMount() {
        if (this.props.userContext.role) {
            this.setState({
                role: this.props.userContext.role
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            role: nextProps.userContext.role,
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.role === 'ROLE_ADMIN' ? <AdminMenu /> : null
                }
                {
                    this.state.role === 'ROLE_PRODUCER' ? <ProducerMenu /> : null
                }
                {
                    this.state.role === 'ROLE_TRANSPORT' ? <ProducerMenu /> : null
                }
                {
                    this.state.role === 'ROLE_DISTRIBUTOR' ? <DistributorMenu /> : null
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userContext: state.profile,
    }
}

export default connect(mapStateToProps)(Menu);