import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {Form} from "formik";
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
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.dispatch(AddEmployee(this.state))

    }

    render() {

        return (
            <div className="addEmployeeContainer">
                Employee Container
                <Form onSubmit={this.handleSubmit}>
                    <label htmlFor={"employeeId"}>
                        <div>Employee ID</div>
                        <input maxLength={9} value={this.state.employeeId} type={'text'} name={"employeeId"} onChange={this.handleChange}/>
                    </label>

                    <label htmlFor={"firstName"}>
                        <div>First Name</div>
                        <input required={true} value={this.state.firstName} type={'text'} name={"firstName"} onChange={this.handleChange}/>
                    </label>


                    <label htmlFor={"lastName"}>
                        <div>Last Name</div>
                        <input required={true} value={this.state.lastName} type={'text'} name={"lastName"} onChange={this.handleChange}/>
                    </label>

                    <label htmlFor={"email"}>
                        <div>E-Mail</div>
                        <input required={true} value={this.state.email} type={'text'} name={"email"} onChange={this.handleChange}/>
                    </label>
                    <label htmlFor={"phoneNumber"}>
                        <div>Phone Number</div>
                        <input value={this.state.phoneNumber} type={'text'} name={"phoneNumber"} onChange={this.handleChange}/>
                    </label>
                    <div>
                        <input type={"submit"} name={"submit"}/>
                    </div>

                </Form>

            </div>

        )

    }


}


function mapStateToProps({videosJobsReducer}, {props}) {



    return {


    }
}

export default withRouter(connect(mapStateToProps)(AddEmployeeContainer))