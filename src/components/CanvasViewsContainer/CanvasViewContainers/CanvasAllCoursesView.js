import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import ILearnCourseContainer from '../../CanvasViewsContainer/CanvasCourseContainer/CanvasCourseContainerView'
import ILearnCourseLoadingContainer from '../../CanvasViewsContainer/CanvasCourseContainer/CanvasCourseLoadingContainerView'
import '../../../css/courseContainer-css.css'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache} from "react-virtualized";
import CircularProgress from "@material-ui/core/CircularProgress";

class CanvasAllCoursesView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cache: new CellMeasurerCache({
                fixedWidth: true,
                defaultHeight: 200
            })
        };
        this.renderRowAlpha = this.renderRowAlpha.bind(this)

    }

    componentDidMount() {

        if (this.props.studentActive === true) {

            this.setState({
                cache: new CellMeasurerCache({
                    fixedWidth: true,
                    defaultHeight: 200
                }),
                ilearnVideoRowCount: Object.keys(this.props.requests_captioning).length,
                captioningCourses: Object.keys(this.props.requests_captioning)

            })

        } else {

            this.setState({
                cache: new CellMeasurerCache({
                    fixedWidth: true,
                    defaultHeight: 200
                }),
                ilearnVideoRowCount:Object.keys(this.props.no_captioning).length,
                captioningCourses:Object.keys(this.props.no_captioning)

            })
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (Object.keys(this.props.coursesReducer).length !== Object.keys(prevProps.coursesReducer).length) {
            if (this.props.studentActive === true) {
                this.setState({
                    cache: new CellMeasurerCache({
                        fixedWidth: true,
                        defaultHeight: 200
                    }),
                    ilearnVideoRowCount: Object.keys(this.props.requests_captioning).length,
                    captioningCourses: Object.keys(this.props.requests_captioning)

                })
            } else {

                this.setState({
                    cache: new CellMeasurerCache({
                        fixedWidth: true,
                        defaultHeight: 200
                    }),
                    ilearnVideoRowCount:Object.keys(this.props.no_captioning).length,
                    captioningCourses:Object.keys(this.props.no_captioning)
                })

            }


        }

        if (this.props.studentActive !== prevProps.studentActive) {

            if (this.props.studentActive === true) {
                this.setState({
                    cache: new CellMeasurerCache({
                        fixedWidth: true,
                        defaultHeight: 200
                    }),
                    ilearnVideoRowCount: Object.keys(this.props.requests_captioning).length,
                    captioningCourses: Object.keys(this.props.requests_captioning)

                })

            } else {

                this.setState({
                    cache: new CellMeasurerCache({
                        fixedWidth: true,
                        defaultHeight: 200
                    }),
                    ilearnVideoRowCount:Object.keys(this.props.no_captioning).length,
                    captioningCourses:Object.keys(this.props.no_captioning)

                })

            }
        }

    }

    renderRowAlpha(index) {
        console.log(index)

        if (this.state.cache !== undefined) {

            return(
                <CellMeasurer
                    key={index.key}
                    cache={this.state.cache}
                    parent={index.parent}
                    columnIndex={0}
                    rowIndex={index.index}>
                    <div key={index.key} style={index.style} className="row">


                            <ILearnCourseContainer ilearnvideos={this.props.courseilearnVideos}
                                                   course_id={this.state.captioningCourses[index.index]}
                                                   key={this.state.captioningCourses[index.index]}/>

                    </div>
                </CellMeasurer>

            )

        }

    }


    render() {
        return(

            <div>
                <div className={"iLearnContentContainer"}>
                    {Object.keys(this.props.courseilearnVideos).length === 0 && ("No iLearn Videos")}


                {Object.keys(this.props.courseilearnVideos).length > 0 && this.props.showCourseStubs  && <CircularProgress/>}
                {Object.keys(this.props.courseilearnVideos).length > 0 && !this.props.showCourseStubs && (
                        <div key={this.props.studentActive} className="list">
                            <AutoSizer>
                                {
                                    ({ width, height }) => {
                                        return <List
                                            width={width}
                                            height={height}
                                            deferredMeasurementCache={this.state.cache}
                                            rowHeight={this.state.cache.rowHeight}
                                            rowRenderer={this.renderRowAlpha}
                                            rowCount={this.state.ilearnVideoRowCount}
                                            overscanRowCount={1} />
                                    }
                                }
                            </AutoSizer>
                        </div>
                    )}
                </div>
            </div>
        )
    }



}


function mapStateToProps({CanvasVideoReducer, loadingStatusReducer, coursesReducer}, {studentActive})  {




    let courseIsLoading = loadingStatusReducer['coursesLoading'] && Object.keys(coursesReducer).length === 0;
    let isLoading = loadingStatusReducer['iLearnVideosLoading'] && Object.keys(CanvasVideoReducer).length === 0;
    let showCourseStubs = courseIsLoading || isLoading;

    let requests_captioning = {};
    let no_captioning = {};

    let canvasVideosSearchTemp = {...CanvasVideoReducer}
    let courseCanvasVideos = {}

    // build ilearn-videos dict
    Object.keys(coursesReducer).forEach(courseKey => {
        courseCanvasVideos[courseKey] = {};

        Object.keys(canvasVideosSearchTemp).forEach(videoKey => {
            if (canvasVideosSearchTemp[videoKey]['course_gen_id'] === courseKey) {
                courseCanvasVideos[courseKey][videoKey] = canvasVideosSearchTemp[videoKey]
                delete canvasVideosSearchTemp[videoKey]
            }

        })
    });

    function capActive(element, index, array) {
        return element.student_requests_captioning === true
    }

    let showCourseContainer = !courseIsLoading && !isLoading && Object.keys(courseCanvasVideos).length > 0;

    Object.keys(coursesReducer).forEach(function(key){


        if (coursesReducer[key].students_enrolled.some(capActive) === true) {
            requests_captioning[key] = coursesReducer[key]
        } else {
            no_captioning[key] = coursesReducer[key]
        }


    });

        return {
        courseIsLoading,
        coursesReducer,
        showCourseStubs,
        showCourseContainer,
        requests_captioning,
        no_captioning,
        courseCanvasVideos,
        studentActive
    }
}


export default withRouter(connect(mapStateToProps)(CanvasAllCoursesView))