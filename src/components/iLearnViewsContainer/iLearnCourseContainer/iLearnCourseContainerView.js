import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import TabulatorContainer from '../iLearnTabViewContainer/TabulatorContainer'
import '../../../css/courseContainer-css.css'


class ILearnCourseContainer extends Component {

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
                            <div>ilearnID: {this.props.ilearnId}</div>
                        </div>

                    </div>


                </div>
                <div className={"courseLowerContainer"}>

                    {this.props.courseHasVideos === true && (<TabulatorContainer course_gen_id = {this.props.course_id}/>)}
                    {this.props.courseHasVideos === false && (<div className={"courseNoVideos"}>Course Has No Videos</div>)}
                </div>
            </div>

        )
    }


}




function mapStateToProps({iLearnVideoReducer, loadingStatusReducer, coursesReducer}, course_id) {




    let numStudentsEnrolled = 0;
    let studentRequestsCaptioning = false;


    Object.keys(coursesReducer[course_id.course_id].students_enrolled).forEach(enroll => {
        if (coursesReducer[course_id.course_id].students_enrolled[enroll].student_enrolled === true){
            numStudentsEnrolled += 1;

            if (coursesReducer[course_id.course_id].students_enrolled[enroll].student_requests_captioning === true){
                numStudentsEnrolled += 1
            }

        }

    });


    let course_name = coursesReducer[course_id.course_id].course_name
    let courseHasVideos = iLearnVideoReducer.hasOwnProperty(course_id.course_id)
    let courseSection = coursesReducer[course_id.course_id].course_section
    let semester = coursesReducer[course_id.course_id].semester;
    let ilearnId = coursesReducer[course_id.course_id].ilearn_page_id == null ? "No iLearn ID" : coursesReducer[course_id.course_id].ilearn_page_id.ilearn_page_id


    return {
        ilearnId,
        semester,
        courseSection,
        course_name,
        course_id,
        courseHasVideos,
        numStudentsEnrolled,
        studentRequestsCaptioning

    }
}




export default withRouter(connect(mapStateToProps)(ILearnCourseContainer))