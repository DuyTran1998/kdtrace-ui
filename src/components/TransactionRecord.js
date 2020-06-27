import React, { Component } from 'react';
import {Link} from "react-router-dom";

class TransactionRecord extends Component {
    constructor(props){
        super(props)
        this.state = {
           id : 1,
           productId: 20,
           productName: "Cherry",
           quantity: 20,
           statusProcess: "WAITING",
           createAt: "27/6/2020",
           link: "/message"
        }
    }
    componentDidMount(){
        
    }
    render() {
        return (
            <div></div>
        );
    }
}

export default TransactionRecord;