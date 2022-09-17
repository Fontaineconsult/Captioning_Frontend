import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import CanvasTabulatorContainer from '../CanvasTabulatorViewContainer/TabulatorContainer'
import '../../../css/courseContainer-css.css'
import {canvasURL} from '../../../constants'
import {updateCourse} from '../../../actions/ampApi/putData'


class CanvasCourseContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {

            ignore_course_check: false,
            course_comments: " "
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.submitCommentsChange = this.submitCommentsChange.bind(this)
        this.updateCommentsChange = this.updateCommentsChange.bind(this)
        this.canvasPage = canvasURL() + this.props.canvasID;
    }




    handleInputChange(event) {

        const target = event.target;
        const value = target.checked === true
        const name = target.name;

        this.setState({
            [name]: value
        });

        // if (name === "ilearn_video_active_check") {
        //     this.props.dispatch(updateCourse(this.props.course_id, "ilearn_video_service_requested", value))
        // }
        //
        if (name === "ignore_course_check") {
            this.props.dispatch(updateCourse(this.props.course_id, "ignore_course_ilearn_videos", value))

        }

        if (name === "course_comments") {
            this.props.dispatch(updateCourse(this.props.course_id, "course_comments", value))

        }

    }

    updateCommentsChange(event){

        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    submitCommentsChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.props.dispatch(updateCourse(this.props.course_id, "course_comments", value))

    }

    render()
        {
        return(
            <div className={"courseContainer masterListItem"}>
                <div className={"courseUpperContainer"}>
                    <div className={"courseUpperContainerLeft"}>
                        <div>Course: {this.props.course_name}.{this.props.courseSection}</div>
                        <div>Instructor: {this.props.instructor}</div>
                        <div>Email: {this.props.email}</div>
                    </div>
                    <div className={"courseUpperContainerRight"}>
                        <div className={"infoContainerLeft"}>
                            <div>Students Enrolled: {this.props.numStudentsEnrolled}</div>
                            <div>Captioning Requested: {this.props.studentRequestsCaptioning === true ? "Yes":"No" }</div>
                            <div><form>
                                <label htmlFor={"ignore_course_check"}>Ignore Course</label>
                                <input checked={this.state.ignore_course_check} onChange={this.handleInputChange} name={"ignore_course_check"} id={"ignore_course_check" + this.props.course_id} type="checkbox"/>
                            </form></div>
                        </div>
                        <div className={"infoContainerRight"}>
                            <div className={"infoContainerRight"}>
                                <div>
                                    <textarea value={this.state.course_comments}
                                              onBlur={this.submitCommentsChange}
                                              onChange={this.updateCommentsChange}
                                              name={"course_comments"}
                                              id={"course_comments" + this.props.course_id} rows={4}/>
                                </div>
                                <div>
                                    <div><b>Semester: </b>{this.props.semester}</div>
                                    <div>CanvasID: <a target="_blank" href={this.canvasPage}>{this.props.canvasID}</a> </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={"courseLowerContainer"}>
                    {this.props.courseHasVideos === true && (<CanvasTabulatorContainer canvasVideos={this.props.courseCanvasVideos} course_gen_id = {this.props.course_id}/>)}
                    {this.props.courseHasVideos === false && (<div className={"courseNoVideos"}>Course Has No Videos</div>)}
                </div>
            </div>
        )
    }


}


function mapStateToProps({loadingStatusReducer, coursesReducer}, {course_id, canvasvideos}) {

    let numStudentsEnrolled = 0;
    let studentRequestsCaptioning = false;
    let instructor = ""
    let email = ""
    let courseCanvasVideos = {}
    let course_name = ''
    let courseSection = ''
    let semester = ''
    let canvasID = ''

    if (loadingStatusReducer.coursesLoading === false && loadingStatusReducer.iLearnVideosLoading === false) {
        if (Object.keys(coursesReducer).length > 0) {
            Object.keys(coursesReducer[course_id].students_enrolled).forEach(enroll => {
                if (coursesReducer[course_id].students_enrolled[enroll].student_enrolled === true){
                    numStudentsEnrolled += 1;
                    if (coursesReducer[course_id].students_enrolled[enroll].student_requests_captioning === true){
                        studentRequestsCaptioning = true
                    }
                }
            });
            courseCanvasVideos = canvasvideos[course_id]
            course_name = coursesReducer[course_id].course_name
            courseSection = coursesReducer[course_id].course_section
            semester = coursesReducer[course_id].semester;
            canvasID = coursesReducer[course_id].canvas_page_id == null ? "No Canvas ID" : coursesReducer[course_id].canvas_page_id.canvas_page_id
            instructor = coursesReducer[course_id].course_instructor.employee_first_name + " " + coursesReducer[course_id].course_instructor.employee_last_name
            email = coursesReducer[course_id].course_instructor.employee_email
        }

    }

    // counts enrollement and captioning request state


    let courseHasVideos = Object.keys(canvasvideos[course_id]).length > 0


    return {
        instructor,
        email,
        canvasID,
        semester,
        courseSection,
        course_name,
        course_id,
        courseHasVideos,
        numStudentsEnrolled,
        studentRequestsCaptioning,
        courseCanvasVideos,
        course_comments: coursesReducer[course_id].course_comments

    }
}




export default withRouter(connect(mapStateToProps)(CanvasCourseContainer))