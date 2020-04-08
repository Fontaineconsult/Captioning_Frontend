import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import TabulatorContainer from '../iLearnTabulatorViewContainer/TabulatorContainer'
import '../../../css/courseContainer-css.css'
import {iLearnURL} from '../../../constants'



class ILearnCourseContainer extends Component {
    ilearnPage = iLearnURL() + this.props.ilearnId;

    render() {


        return(

            <div className={"courseContainer"}>
                <div className={"courseUpperContainer"}>
                    <div className={"courseUpperContainerLeft"}>
                        Course: {this.props.course_name}.{this.props.courseSection}
                    </div>



                    <div className={"courseUpperContainerRight"}>
                        <div className={"infoContainerLeft"}>
                            <div>Students Enrolled: {this.props.numStudentsEnrolled}</div>
                            <div>Captioning Requested: {this.props.studentRequestsCaptioning === true ? "Yes":"No" }</div>
                        </div>
                        <div className={"infoContainerRight"}>
                            <div><b>Semester: </b>{this.props.semester}</div>
                            <div>ilearnID: <a href={this.ilearnPage}>{this.props.ilearnId}</a> </div>
                        </div>

                    </div>
                </div>
                <div className={"courseLowerContainer"}>

                    {this.props.courseHasVideos === true && (<TabulatorContainer ilearnvideos={this.props.courseilearnvideos} course_gen_id = {this.props.course_id}/>)}
                    {this.props.courseHasVideos === false && (<div className={"courseNoVideos"}>Course Has No Videos</div>)}
                </div>
            </div>

        )
    }


}



function mapStateToProps({iLearnVideoReducer, loadingStatusReducer, coursesReducer}, {course_id, ilearnvideos}) {


    let numStudentsEnrolled = 0;
    let studentRequestsCaptioning = false;

    // counts enrollement and captioning request state
    Object.keys(coursesReducer[course_id].students_enrolled).forEach(enroll => {
        if (coursesReducer[course_id].students_enrolled[enroll].student_enrolled === true){
            numStudentsEnrolled += 1;
            if (coursesReducer[course_id].students_enrolled[enroll].student_requests_captioning === true){
                studentRequestsCaptioning = true
            }
        }

    });





    let courseilearnvideos = ilearnvideos[course_id]
    let course_name = coursesReducer[course_id].course_name
    let courseHasVideos = Object.keys(courseilearnvideos).length > 0

    let courseSection = coursesReducer[course_id].course_section
    let semester = coursesReducer[course_id].semester;
    let ilearnId = coursesReducer[course_id].ilearn_page_id == null ? "No iLearn ID" : coursesReducer[course_id].ilearn_page_id.ilearn_page_id


    return {
        ilearnId,
        semester,
        courseSection,
        course_name,
        course_id,
        courseHasVideos,
        numStudentsEnrolled,
        studentRequestsCaptioning,
        courseilearnvideos

    }
}




export default withRouter(connect(mapStateToProps)(ILearnCourseContainer))