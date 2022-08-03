import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import '../../../css/courseContainer-css.css'
import CircularProgress from '@material-ui/core/CircularProgress';


class CanvasCourseLoadingContainer extends Component {

    render() {

        return(

            <div className={"courseContainer"}>
                <div className={"courseUpperContainer"}>
                    <div className={"courseUpperContainerLeft"}>
                        Course: {this.props.course_name}.{this.props.courseSection}
                    </div>
                    <div className={"courseUpperContainerRight"}>
                        {this.props.semester}
                        {this.props.ilearnId}
                    </div>
                </div>
                <div className={"courseLowerContainer"}>
                    Videos Loading
                    <CircularProgress/>
                </div>
            </div>

        )
    }


}




function mapStateToProps({iLearnVideoReducer, loadingStatusReducer, coursesReducer}, course_id) {
    let course_name = coursesReducer[course_id.course_id].course_name
    let courseHasVideos = iLearnVideoReducer.hasOwnProperty(course_id.course_id)
    let courseSection = coursesReducer[course_id.course_id].course_section
    let semester = coursesReducer[course_id.course_id].semester;
    let ilearnId = coursesReducer[course_id.course_id].ilearn_page_id == null ? "No iLearn ID" : coursesReducer[course_id.course_id].ilearn_page_id.ilearn_page_id
    let iLearnVideosLoading = loadingStatusReducer['iLearnVideosLoading'] && Object.keys(iLearnVideoReducer).length === 0;


    return {
        ilearnId,
        semester,
        courseSection,
        course_name,
        course_id,
        courseHasVideos,
        iLearnVideosLoading

    }
}




export default withRouter(connect(mapStateToProps)(CanvasCourseLoadingContainer))