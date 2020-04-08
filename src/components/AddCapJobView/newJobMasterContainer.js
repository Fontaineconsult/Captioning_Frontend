import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Select from "react-select";
import PreparedJobsContainer from "./preparedJobsContainer";
import JobPrepContainer from "./JobPrepContainer";
import {AddVideoJobBatch} from '../../actions/ampApi/postData'
import {clearTempCapJobs} from '../../actions/tempJobsForm'





class NewJobMasterContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            course: ''
        };

        this.applyCourse = this.applyCourse.bind(this)
        this.submitJobs = this.submitJobs.bind(this)
    }

    applyCourse(value) {
        this.setState({course:value})
    }

    submitJobs() {
        this.props.dispatch(AddVideoJobBatch(this.props.tempJobsFormReducer))
        this.props.dispatch(clearTempCapJobs())
        console.log("farts")

    }

    render() {
        console.log(this.state)
        return (

            <div>
                <form>
                    <label>
                        Select Course
                        <Select value={this.state.course} options={this.props.courses_list} onChange={this.applyCourse}/>
                    </label>

                </form>
                <JobPrepContainer currentCourse = {this.state.course.value}/>
                <PreparedJobsContainer/>
                <button onClick={this.submitJobs}>Submit Jobs</button>
            </div>

        )
    }

}

function mapStateToProps({mediaSearchReducer, errorsReducer, tempJobsFormReducer, coursesReducer}, {props}) {



    let courses_list = Object.keys(coursesReducer).map(current_course => {
        return {value: current_course , label: current_course,}
    });

    return {
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer,
        courses_list
    }
}


export default withRouter(connect(mapStateToProps)(NewJobMasterContainer))