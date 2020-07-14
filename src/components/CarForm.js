import React, { Component } from 'react';
import {API_CREATE_CAR} from '../constants/API/api';
import { Snackbar, CircularProgress } from '@material-ui/core';

class CarForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            numberPlate: '',
            type: 'TOYOTA',
            progress: false
        } 
    }
    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleCloseProgress = e => {
        this.setState({ progress: false });
    }

    handleSubmit = (e) => {
        this.setState({ progress: true });
        const carModel = {
            numberPlate: this.state.numberPlate,
            autoMaker: this.state.type,
            statusDeliveryTruck: "AVAILABLE"
        }
        console.log(JSON.stringify(carModel));

        const token = localStorage.getItem('token');
        console.log(token);
        fetch(API_CREATE_CAR, {
            method: "POST",
            body: JSON.stringify(carModel),
            cache: 'no-cache',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(response => response.json())
            .then(res => {
                console.log(res);
                if(res.status === 201){
                    this.setState({
                        numberPlate: ''
                    })
                    this.props.handleOpenAlert('success', res.message);
                    this.props.handleClose();
                }
                else{
                    this.props.handleOpenAlert('fail', res.message); 
                }
                this.handleCloseProgress();
            })
        e.preventDefault();
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <div className="form-body">

                    <div class="form-group row">
                        <label class="col-md-3 label-control" htmlfor="eventRegInput1">Number Plate</label>
                        <div class="col-md-9">
                            <input type="text" id="eventRegInput1" className="form-control" placeholder="Ex: 74A1-060.79" name="numberPlate" 
                            required onChange={this.handleChange} maxlength="10"
                            data-validation-maxlength-message="The number plate just have maxium 10 characters!"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-md-3 label-control" htmlfor="eventRegInput2">Type</label>
                        <div class="col-md-9">
                            <select id="issueinput5" name="type" onChange={this.handleChange} className="form-control" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Priority">
                                <option value="TOYOTA">TOYOTA</option>
                                <option value="CHEVROLET">CHEVROLET</option>
                                <option value="FORD">FORD</option>
                                <option value="HONDA">HONDA</option>
                                <option value="HUYNDAI">HUYNDAI</option>
                                <option value="ISUZU">ISUZU</option>
                                <option value="SUZUKI">SUZUKI</option>
                                <option value="MITSUBISHI">MITSUBISHI</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-actions right">
                    <button
                        type="button"
                        onClick={this.props.handleClose}
                        className="btn btn-warning mr-1">
                        <i className="ft-x"></i> Cancel
								        </button>
                    <button type="submit" className="btn btn-primary">
                        <i className="fa fa-check-square-o"></i> Save
					</button>
                </div>
                <Snackbar open={this.state.progress} onClose={this.handleCloseProgress}  >
                    <CircularProgress color="primary" />
                </Snackbar>
            </form>
        );
    }
}

export default CarForm;