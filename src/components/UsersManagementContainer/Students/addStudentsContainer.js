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
            <div className={"scroll-inside-div"}>
                <div className="masterListItem masterListUser">
                    <div className={"stu-scroll-container"}>
                        <div className={"stu-display-container"}>
                            <div className={"emp-display-title"}>
                                <div>
                                    Add Student
                                </div>
                            </div>
                            <AddStudentFormContainer/>
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