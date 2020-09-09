import React, { Component } from 'react';
import { API_CREATE_PRODUCT } from '../constants/API/api';
import { Snackbar, CircularProgress } from '@material-ui/core';
class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            root: '',
            startDay: null,
            endDay: null,
            medicines: [],
            price: null,
            quantity: '',
            type: 'Vegetable',
            unit: 'PCS',
            exp: '',
            mfg: '',
            progress: false,
            images: [],
            nameMedicine: '',
            date: '',
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleDelete = element => {
        let list = this.state.medicines;
        let temp = 0;
        for (let object in this.state.medicines) {
            if (object.nameMedicine === element) {
                delete list[temp];
            }
            temp++
        }
        this.setState({
            medicines: list
        })

    }

    handleFiles = e => {
        let files = e.target.files;
        if (files.length !== 0) {
            this.setState({
                images: files,
            })
        }
    }

    handleClick = () => {
        if (this.state.nameMedicine !== '' && this.state.date !== '') {
            let object = {
                medicine: this.state.nameMedicine,
                time: this.state.date
            }
            let list = this.state.medicines;
            list.push(object);
            this.setState({
                medicines: list
            })
        }
    }

    handleSubmit = (e) => {
        this.setState({ progress: true });
        const productModel = {
            exp: this.state.exp,
            mfg: this.state.mfg,
            startDay: this.state.startDay,
            endDay: this.state.endDay,
            name: this.state.name,
            root: this.state.root,
            quantity: parseInt(this.state.quantity),
            type: this.state.type,
            unit: this.state.unit,
            medicines: this.state.medicines,
            price: parseInt(this.state.price),
        }
        let formData = new FormData();
        let images = this.state.images;
        const json = JSON.stringify(productModel);
        const model = new Blob([json], {
            type: 'application/json'
        });
        for (let i = 0; i < images.length; i++) {
            formData.append("files", images.item(i));
        }
        formData.append("productModel", model);

        const token = localStorage.getItem('token');
        fetch(API_CREATE_PRODUCT, {
            method: "POST",
            body: formData,
            cache: 'no-cache',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'same-origin'
        }).then(response => response.json())
            .then(res => {
                this.handleCloseProgress();
                if (res.status === 200) {
                    this.props.handleOpenAlert('success');
                    this.props.handleClose();
                }
                else {
                    this.props.handleOpenAlert('fail');
                }
            })
        e.preventDefault();
    }
    handleCloseProgress = e => {
        this.setState({ progress: false });
    }
    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>

                <div className="form-body">
                    <h4 class="form-section"><i class="ft-clipboard"></i> Root Product</h4>
                    <div className="form-group">
                        <label htmlFor="issueinput7">Root Type</label>
                        <input type="text" id="issueinput15" className="form-control" placeholder="Example: Carot Seeds..." name="root" onChange={this.handleChange} required />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="issueinput8">Start Day</label>
                                <input type="date" id="issueinput2" className="form-control" name="startDay" onChange={this.handleChange} data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Date Opened" required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="issueinput9">Harvest Day</label>
                                <input type="date" id="issueinput3" className="form-control" name="endDay" onChange={this.handleChange} data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Date Fixed" required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="issueinput3">Medicine History</label>
                                <input type="text" id="issueinput4" className="form-control" name="nameMedicine" onChange={this.handleChange} data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Date Opened" required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="issueinput3">Time</label>
                                <input type="date" id="issueinput5" className="form-control" name="date" onChange={this.handleChange} data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Date Fixed" required />
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" onClick={this.handleClick}>
                        <i class="ft-plus"></i> Add new
                    </button>
                    <h3></h3>

                    {
                        Array.isArray(this.state.medicines)
                        && this.state.medicines.map(medicine => {
                            return (
                                <div key={medicine.medicine} class="input-group mb-1" data-repeater-item="">
                                    <input type="text" placeholder={medicine.medicine + "-" + medicine.time} class="form-control" id="example-tel-input" disabled />
                                    <span class="input-group-append" id="button-addon2">
                                        <button class="btn btn-danger" type="button" onClick={() => this.handleDelete(medicine.nameMedicine)}><i class="ft-x"></i></button>
                                    </span>
                                </div>
                            );
                        })
                    }
                    <h4 class="form-section"><i class="ft-clipboard"></i> Product Detail</h4>
                    <div className="form-group">
                        <label htmlFor="issueinput13">Product Name</label>
                        <input type="text" id="issueinput13" className="form-control" placeholder="Ex: Apple" name="name" onChange={this.handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="issueinput5">Type</label>
                        <select id="issueinput7" name="type" onChange={this.handleChange} className="form-control" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Priority" required>
                            <option value="Vegetable">Vegetable</option>
                            <option value="Fruit">Fruits</option>
                            <option value="Meal">Meals</option>
                            <option value="SeaFood">SeaFoods</option>
                            <option value="Cereal">Cereals</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="issueinput8">Unit</label>
                        <select id="issueinput6" name="unit" onChange={this.handleChange} className="form-control" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Status" required>
                            <option value="PCS">PCS</option>
                            <option value="DOZENS">DOZENS</option>
                            <option value="BOXS">BOXS</option>
                            <option value="KGS">KGS</option>
                            <option value="TONS">TONS</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="issueinput14">Quantity</label>
                        <input type="text" id="issueinput14" className="form-control" placeholder="1,2,3..." name="quantity" onChange={this.handleChange} data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Opened By" required />
                    </div>

                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                        </div>
                        <input type="text" class="form-control" placeholder="Price Per Product" aria-label="Amount (to the nearest dollar)" name="price" onChange={this.handleChange}/>
                        <div class="input-group-append">
                            <span class="input-group-text">VND</span>
                        </div>
                    </div>
                    <h1></h1>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="issueinput10">Manufacture Date</label>
                                <input type="date" id="issueinput10" className="form-control" name="mfg" onChange={this.handleChange} data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Date Opened" required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="issueinput11">Expiration Date</label>
                                <input type="date" id="issueinput11" className="form-control" name="exp" onChange={this.handleChange} data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Date Fixed" required />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="issueinput6">Add Images...</label>
                        <input className="form-control" type="file" name="files[]" multiple onChange={this.handleFiles} />
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
            </form >
        );
    }
}
export default ProductForm;