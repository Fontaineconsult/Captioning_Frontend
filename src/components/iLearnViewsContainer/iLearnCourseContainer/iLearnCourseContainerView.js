import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import TabulatorContainer from '../iLearnTabViewContainer/TabulatorContainer'

class ILearnCourseContainer extends Component {

    render() {

        return(

            <div>

                <p>ilearnCourseContainer</p>
                <p>{this.props.course_name}</p>
                {this.props.courseHasVideos === true && (<TabulatorContainer course_gen_id = {this.props.course_id}/>)}
                {this.props.courseHasVideos === false && (<p>Course Has No Videos</p>)}

            </div>

        )
    }


}




function mapStateToProps({iLearnVideoReducer, loadingStatusReducer, coursesReducer}, course_id) {
    let course_name = coursesReducer[course_id.course_id].course_name
    let courseHasVideos = iLearnVideoReducer.hasOwnProperty(course_id.course_id)

    return {

        course_name,
        course_id,
        courseHasVideos

    }
}


export default withRouter(connect(mapStateToProps)(ILearnCourseContainer))