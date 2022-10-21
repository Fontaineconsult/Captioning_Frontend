import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import AddEmployeeContainer from "./addEmployeeContainer"
import AssignEmployeeContainer from "./assignEmployeeContainer";
import "../../../css/users.css"

class AddUserContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {

        return (
            <div style={{"height": "90vh"}}>
                <div className={"scroll-inside-div"}>
                    <div className="masterListItem masterListUser">
                        <div style={{"marginBottom": "10px"}} className={"emp-display-container"}>
                            <div className={"emp-display-title"}>
                                <div style={{"fontWeight": "600"}}>
                                    Add Employee
                                </div>
                            </div>
                            <AddEmployeeContainer/>
                        </div>
                        <div className={"emp-display-container"}>
                            <div className={"emp-display-title"}>
                                <div style={{"fontWeight": "600"}}>Assign Employee</div>
                            </div>
                            <AssignEmployeeContainer/>

                        </div>

                    </div>
                </div>
            </div>

        )
    }

}


function mapStateToProps({employeesReducer, requesterReducer, campusOrgReducer}, {props}) {


    return {}
}

export default withRouter(connect(mapStateToProps)(AddUserContainer))