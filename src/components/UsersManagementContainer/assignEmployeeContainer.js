import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Select from 'react-select'
import {Form} from "formik";
import {addCampusAssociationAssignment} from "../../../src/actions/ampApi/postData"

class AssignEmployeeContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employeeId:'',
            campusOrgs:'',
        };

        this.submitAssignment = this.submitAssignment.bind(this)
        this.updateValue = this.updateValue.bind(this)
    }



    submitAssignment(event) {
        event.preventDefault()
        this.props.dispatch(addCampusAssociationAssignment(this.state.campusOrgs.value,
            this.state.employeeId.value,
            this.props.semester))
    }

    updateValue(event) {
        this.setState({[event.id]: event})
    }




    render() {

        return (
            <div className="addEmployeeContainer">
                Assign Employee Container
            <Form onSubmit={this.submitAssignment}>
                <label>
                    Select Employee
                    <Select onChange={this.updateValue} value={this.state.employeeId} options={this.props.employee}/>

                </label>
                <label>
                    Select Organization
                    <Select onChange={this.updateValue} value={this.state.campusOrgs} options={this.props.campusOrgs}/>
                </label>
                <input type={"submit"} name={"Add Assignment"}/>
            </Form>
            </div>

        )

    }


}


function mapStateToProps({employeesReducer, requesterReducer, campusOrgReducer, globalsReducer}, {props}) {

    let campusOrgs = Object.keys(campusOrgReducer).map(orgId => {
        return {"id":"campusOrgs", "label": campusOrgReducer[orgId].organization_name, "value": orgId}

    })

    let employee = Object.keys(employeesReducer).map(employeeId => {
        return {"id":"employeeId", "label": employeesReducer[employeeId].employee_first_name + ' ' + employeesReducer[employeeId].employee_last_name + " | " + employeesReducer[employeeId].employee_id, "value": employeeId}

    })


    return {
        campusOrgs,
        employee,
        semester: globalsReducer.currentSemester
    }
}

export default withRouter(connect(mapStateToProps)(AssignEmployeeContainer))