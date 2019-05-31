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
                {this.props.ilearn_videos !== undefined && (<TabulatorContainer course_gen_id = {this.props.course_id} videos={this.props.ilearn_videos}/>)}

                {this.props.ilearn_videos === undefined && (<p>Course has no videos</p>)}


            </div>

        )
    }


}




function mapStateToProps({iLearnVideoReducer, loadingStatusReducer, coursesReducer}, course_id) {
    let course_name = coursesReducer[course_id.course_id].course_name

    let ilearn_videos = iLearnVideoReducer[course_id.course_id]

    return {
        ilearn_videos,
        course_name,
        course_id

    }
}


export default withRouter(connect(mapStateToProps)(ILearnCourseContainer))