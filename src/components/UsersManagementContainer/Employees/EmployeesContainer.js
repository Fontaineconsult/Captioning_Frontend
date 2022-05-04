import React, {Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import AllEmployeesTabulator from "./AllEmployeesTabulator";

class EmployeesContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {

        return (
            <div>
                <AllEmployeesTabulator/>
            </div>


        )
    }

}


function mapStateToProps({employeesReducer}, {props}) {


    return {
        employeesReducer

    }
}

export default withRouter(connect(mapStateToProps)(EmployeesContainer))