import React, {Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import AllCoursesTabulator from "./AllCoursesTabulator";
import {fetchAllCourses} from "../../../actions/ampApi/fetchData";

class CoursesContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

        this.props.dispatch(fetchAllCourses(this.props.globalsReducer.currentSemester))

    }

    render() {

        return (
            <div>
                <AllCoursesTabulator/>
            </div>


        )
    }

}


function mapStateToProps({coursesReducer, globalsReducer}, {props}) {


    return {
        coursesReducer,
        globalsReducer

    }
}

export default withRouter(connect(mapStateToProps)(CoursesContainer))