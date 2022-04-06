import React, {Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import AllStudentsTabulator from "./AllStudentsTabulator";


class StudentsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {

        return (
            <div>
                <AllStudentsTabulator/>
            </div>


        )
    }

}


function mapStateToProps({employeesReducer}, {props}) {


    return {
        employeesReducer

    }
}

export default withRouter(connect(mapStateToProps)(StudentsContainer))