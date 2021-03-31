import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";

import {AddEmployee} from '../../actions/ampApi/postData'

class AddEmployeeContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employeeId:'',
            firstName:'',
            lastName:'',
            email:'',
            phoneNumber:'',
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }


    handleChange(event) {
        event.preventDefault()
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.dispatch(AddEmployee(this.state))

    }

    render() {

        return (
            <div className="addEmployeeContainer emp-top">
                <form onSubmit={this.handleSubmit}/>
                    <label htmlFor={"employeeId"}>
                        <div>Employee ID</div>
                        <input className={"emp-input"} maxLength={9} value={this.state.employeeId} type={'text'} name={"employeeId"} onChange={this.handleChange}/>
                    </label>

                    <label htmlFor={"firstName"}>
                        <div>First Name</div>
                        <input className={"emp-input"} required={true} value={this.state.firstName} type={'text'} name={"firstName"} onChange={this.handleChange}/>
                    </label>


                    <label htmlFor={"lastName"}>
                        <div>Last Name</div>
                        <input  className={"emp-input"} required={true} value={this.state.lastName} type={'text'} name={"lastName"} onChange={this.handleChange}/>
                    </label>

                    <label htmlFor={"email"}>
                        <div>E-Mail</div>
                        <input className={"emp-input"} required={true} value={this.state.email} type={'text'} name={"email"} onChange={this.handleChange}/>
                    </label>
                    <label htmlFor={"phoneNumber"}>
                        <div>Phone Number</div>
                        <input className={"emp-input"} value={this.state.phoneNumber} type={'text'} name={"phoneNumber"} onChange={this.handleChange}/>
                    </label>
                    <div>
                        <input type={"submit"} name={"submit"}/>
                    </div>



            </div>

        )

    }


}


function mapStateToProps({videosJobsReducer}, {props}) {



    return {


    }
}

export default withRouter(connect(mapStateToProps)(AddEmployeeContainer))