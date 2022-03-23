import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import AddStudentFormContainer from "./addStudentFormContainer"
import "../../../css/users.css"

class AddUserContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {

        return (
            <div className="masterListItem masterListUser">
                <div>
                    <div style={{"margin-bottom": "10px"}} className={"emp-display-container"}>
                        <div className={"emp-display-title"}>
                            <div style={{"font-weight": "600"}}>
                                Add Student
                            </div>
                        </div>
                        <AddStudentFormContainer/>
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