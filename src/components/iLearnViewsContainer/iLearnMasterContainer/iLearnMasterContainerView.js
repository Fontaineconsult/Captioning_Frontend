import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import ILearnCourseContainer from '../../iLearnViewsContainer/iLearnCourseContainer/iLearnCourseContainerView'
import ILearnCourseLoadingContainer from '../../iLearnViewsContainer/iLearnCourseContainer/iLearnCourseLoadingContainerView'
import '../../../css/courseContainer-css.css'

class ILearnMasterContainer extends Component {

    render() {

        return(

            <div>

                <p>Your iLearn Videos</p>

                <div className={"iLearnContentContainer"}>
                {this.props.showCourseStubs === true  && (Object.keys(this.props.coursesReducer).map((course, i) =>(
                    <ILearnCourseLoadingContainer course_id={course} key={i}/>

                )))}

                {this.props.showCourseContainer === true && (Object.keys(this.props.coursesReducer).map((course, i) =>(
                        <ILearnCourseContainer course_id={course} key={i}/>

                    )))}
                </div>




            </div>

        )
    }


}




function mapStateToProps({iLearnVideoReducer, loadingStatusReducer, coursesReducer}) {

    let courseIsLoading = loadingStatusReducer['coursesLoading'] && Object.keys(coursesReducer).length === 0;

    let isLoading = loadingStatusReducer['iLearnVideosLoading'] && Object.keys(iLearnVideoReducer).length === 0;

    let showCourseStubs = !courseIsLoading && isLoading;
    let showCourseContainer = !courseIsLoading && !isLoading;

    return {
        courseIsLoading,
        coursesReducer,
        showCourseStubs,
        showCourseContainer
    }
}


export default withRouter(connect(mapStateToProps)(ILearnMasterContainer))