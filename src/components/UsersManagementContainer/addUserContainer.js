import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import AddEmployeeContainer from "./addEmployeeContainer"
import AssignEmployeeContainer from "./assignEmployeeContainer";
import  "../../css/users.css"

class AddUserContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }





    render() {

        return (
            <div className="masterListItem masterListUser">
                Add User Outer Container
                <AddEmployeeContainer/>
                <AssignEmployeeContainer/>
            </div>
        )
    }

}


function mapStateToProps({employeesReducer, requesterReducer, campusOrgReducer}, {props}) {



    return {


    }
}

export default withRouter(connect(mapStateToProps)(AddUserContainer))