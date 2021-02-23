import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import TabulatorContainer from '../iLearnTabulatorViewContainer/TabulatorContainer'
import '../../../css/courseContainer-css.css'
import {iLearnURL} from '../../../constants'
import {updateCourse} from '../../../actions/ampApi/putData'


class ILearnCourseContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            ilearn_video_active_check: false,
            ignore_course_check: false,
            course_comments: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.submitCommentsChange = this.submitCommentsChange.bind(this)
        this.updateCommentsChange = this.updateCommentsChange.bind(this)
        this.ilearnPage = iLearnURL() + this.props.ilearnId;
    }

    componentDidMount() {
        this.setState({ilearn_video_active_check: this.props.ilearn_video_active_check,
                            course_comments: this.props.course_comments})
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.checked === true
        const name = target.name;

        this.setState({
            [name]: value
        });

        if (name === "ilearn_video_active_check") {
            this.props.dispatch(updateCourse(this.props.course_id, "ilearn_video_service_requested", value))
        }

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
                                <label htmlFor={"ilearn_video_active_check"}>iLearn Video Active</label>
                                <input checked={this.state.ilearn_video_active_check} onChange={this.handleInputChange} name={"ilearn_video_active_check"} id={"ilearn_video_active_check"} type="checkbox"/>
                                <label htmlFor={"ignore_course_check"}>Ignore Course</label>
                                <input checked={this.state.ignore_course_check} onChange={this.handleInputChange} name={"ignore_course_check"} id={"ignore_course_check"} type="checkbox"/>
                            </form></div>

                        </div>
                        <div className={"infoContainerRight"}>
                            <div className={"infoContainerRight"}>
                                <div>
                                    <textarea value={this.state.course_comments}
                                              onBlur={this.submitCommentsChange}
                                              onChange={this.updateCommentsChange}
                                              name={"course_comments"}
                                              id={"course_comments"} rows={4}/>
                                </div>
                                <div>
                                    <div><b>Semester: </b>{this.props.semester}</div>
                                    <div>ilearnID: <a target="_blank" href={this.ilearnPage}>{this.props.ilearnId}</a> </div>
                                </div>
                            </div>


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


function mapStateToProps({loadingStatusReducer, coursesReducer}, {course_id, ilearnvideos}) {


    let numStudentsEnrolled = 0;
    let studentRequestsCaptioning = false;
    let ilearn_video_active_check = null
    let instructor = ""
    let email = ""
    let courseilearnvideos = {}
    let course_name = ''
    let courseSection = ''
    let semester = ''
    let ilearnId = ''

    if (loadingStatusReducer.coursesLoading === false && loadingStatusReducer.iLearnVideosLoading === false) {
        if (Object.keys(coursesReducer).length > 0) {
            ilearn_video_active_check = coursesReducer[course_id].ilearn_video_service_requested === null ? false : coursesReducer[course_id].ilearn_video_service_requested
            Object.keys(coursesReducer[course_id].students_enrolled).forEach(enroll => {
                if (coursesReducer[course_id].students_enrolled[enroll].student_enrolled === true){
                    numStudentsEnrolled += 1;
                    if (coursesReducer[course_id].students_enrolled[enroll].student_requests_captioning === true){
                        studentRequestsCaptioning = true
                    }
                }

            });
            courseilearnvideos = ilearnvideos[course_id]
            course_name = coursesReducer[course_id].course_name
            courseSection = coursesReducer[course_id].course_section
            semester = coursesReducer[course_id].semester;
            ilearnId = coursesReducer[course_id].ilearn_page_id == null ? "No iLearn ID" : coursesReducer[course_id].ilearn_page_id.ilearn_page_id
            instructor = coursesReducer[course_id].course_instructor.employee_first_name + " " + coursesReducer[course_id].course_instructor.employee_last_name
            email = coursesReducer[course_id].course_instructor.employee_email
        }


    }

    // counts enrollement and captioning request state

    let courseHasVideos = Object.keys(courseilearnvideos).length > 0

    return {
        instructor,
        email,
        ilearnId,
        semester,
        courseSection,
        course_name,
        course_id,
        courseHasVideos,
        numStudentsEnrolled,
        studentRequestsCaptioning,
        courseilearnvideos,
        ilearn_video_active_check,
        course_comments: coursesReducer[course_id].course_comments

    }
}




export default withRouter(connect(mapStateToProps)(ILearnCourseContainer))