import React, {Component} from 'react';
import {withRouter} from "react-router";
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css';
import EmployeesContainer from "./Employees/EmployeesContainer"
import StudentsContainer from "./Students/StudentsContainer";


class EditUsersContainer extends Component {

    constructor(props) {
        super(props);

        this.ref = null;

    }

    render() {

        return (<div>
            <div className={"scroll-inside-div"}>
                <div className="masterListItem masterListUser">
                    <div style={{"marginBottom": "10px"}} className={"emp-display-container"}>
                        <div className={"emp-display-title"}>
                            <div style={{"fontWeight": "600"}}>
                                All Employees
                            </div>
                        </div>
                        <EmployeesContainer/>

                    </div>

                    <div style={{"marginBottom": "10px"}} className={"emp-display-container"}>
                        <div className={"emp-display-title"}>
                            <div style={{"fontWeight": "600"}}>
                                All Students
                            </div>
                        </div>
                        <StudentsContainer/>

                    </div>
                </div>
            </div>

        </div>)
    }
}


export default withRouter(EditUsersContainer)