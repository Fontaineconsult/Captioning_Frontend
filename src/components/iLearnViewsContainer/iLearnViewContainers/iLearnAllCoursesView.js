import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import ILearnCourseContainer from '../../iLearnViewsContainer/iLearnCourseContainer/iLearnCourseContainerView'
import ILearnCourseLoadingContainer from '../../iLearnViewsContainer/iLearnCourseContainer/iLearnCourseLoadingContainerView'
import '../../../css/courseContainer-css.css'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache} from "react-virtualized";

class ILearnAllCoursesView extends Component {

    constructor(props) {
        super(props);

        this.cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 200
        })

    }
    ilearnVideoRowCount = Object.keys(this.props.requests_captioning).length
    captioningCourses = Object.keys(this.props.requests_captioning)


    renderRow = (index, key, style, parent) => {

        return(

            <CellMeasurer
                key={index.key}
                cache={this.cache}
                parent={index.parent}
                columnIndex={0}
                rowIndex={index.index}
            >
                <div style={index.style} className="row">
                    <div className="content">
                        <ILearnCourseContainer ilearnvideos={this.props.courseilearnVideos}
                                               course_id={this.captioningCourses[index.index]}
                                               key={this.captioningCourses[index.index]}/>
                    </div>
                </div>

            </CellMeasurer>
        )
    }

    render() {

        return(

            <div>
                <p>Your iLearn Videos</p>

                <div className={"iLearnContentContainer"}>
                {this.props.showCourseStubs === true  && (Object.keys(this.props.coursesReducer).map((course, i) =>(
                    <ILearnCourseLoadingContainer course_id={course} key={i}/>
                )))}

                <div className="list">

                    <AutoSizer>
                        {
                            ({ width, height }) => {
                                return <List
                                    width={width}
                                    height={height}
                                    deferredMeasurementCache={this.cache}
                                    rowHeight={this.cache.rowHeight}
                                    rowRenderer={this.renderRow}
                                    rowCount={this.ilearnVideoRowCount}
                                    overscanRowCount={1} />
                            }
                        }
                    </AutoSizer>

                    {/*{this.props.showCourseContainer === true && (Object.keys(this.props.requests_captioning).map((course, i) =>(*/}

                    {/*    <ILearnCourseContainer ilearnvideos={this.props.courseilearnVideos} course_id={course} key={i}/>*/}

                    {/*)))}*/}

                </div>

                <span>
                    <b>  -----    Captioning not requested.  -----   </b>
                </span>
                {/*<div>*/}
                {/*    {this.props.showCourseContainer === true && (Object.keys(this.props.no_captioning).map((course, i) =>(*/}
                {/*        <ILearnCourseContainer ilearnvideos={this.props.courseilearnVideos} course_id={course} key={i}/>*/}

                {/*    )))}*/}
                {/*</div>*/}

                </div>
            </div>
        )
    }

}
function mapStateToProps({iLearnVideoReducer, loadingStatusReducer, coursesReducer}) {



    let courseIsLoading = loadingStatusReducer['coursesLoading'] && Object.keys(coursesReducer).length === 0;
    let isLoading = loadingStatusReducer['iLearnVideosLoading'] && Object.keys(iLearnVideoReducer).length === 0;
    let showCourseStubs = !courseIsLoading && isLoading;

    let requests_captioning = {};
    let no_captioning = {};

    let iLearnVideosSearchTemp = {...iLearnVideoReducer}
    let courseilearnVideos = {}

    // build ilearn-videos dict
    Object.keys(coursesReducer).forEach(courseKey => {
        courseilearnVideos[courseKey] = {};

        Object.keys(iLearnVideosSearchTemp).forEach(videoKey => {
            if (iLearnVideosSearchTemp[videoKey]['course_gen_id'] === courseKey) {
                courseilearnVideos[courseKey][videoKey] = iLearnVideosSearchTemp[videoKey]
                delete iLearnVideosSearchTemp[videoKey]
            }

        })
        if (Object.keys(courseilearnVideos[courseKey]).length === 0) {


        }

    });

    function capActive(element, index, array) {
        return element.student_requests_captioning === true

    }

    let showCourseContainer = !courseIsLoading && !isLoading && Object.keys(courseilearnVideos).length > 0;

    Object.keys(coursesReducer).forEach(function(key){


        if (coursesReducer[key].students_enrolled.some(capActive) === true) {
            requests_captioning[key] = coursesReducer[key]
        } else {
            no_captioning[key] =coursesReducer[key]
        }


    });
        return {
        courseIsLoading,
        coursesReducer,
        showCourseStubs,
        showCourseContainer,
        requests_captioning,
        no_captioning,
        courseilearnVideos
    }
}


export default withRouter(connect(mapStateToProps)(ILearnAllCoursesView))