import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserList from '../components/UserList';
import ProductList from '../components/ProductList';
import CarList from '../components/CarList';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: null,
        }
    }
    componentDidMount() {
        if(this.props.userContext.role) {
            this.setState({
                role: this.props.userContext.role
            })
        }
        console.log(this.state.role);
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
                    this.state.role === 'ROLE_ADMIN' ? <UserList /> : null
                }
                {
                    this.state.role === 'ROLE_PRODUCER' ? <ProductList /> : null
                }
                {
                    this.state.role === 'ROLE_TRANSPORT' ? <CarList /> : null
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

export default connect(mapStateToProps)(HomePage);