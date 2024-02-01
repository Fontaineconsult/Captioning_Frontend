import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import CanvasCourseContainer from '../../CanvasViewsContainer/CanvasCourseContainer/CanvasCourseContainerView'
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
        console.log("IT MOUNTED")
        if (this.props.studentActive === true) {
            this.setState({
                cache: new CellMeasurerCache({
                    fixedWidth: true,
                    defaultHeight: 200
                }),
                canvasVideoRowCount: Object.keys(this.props.requests_captioning).length,
                captioningCourses: Object.keys(this.props.requests_captioning),
                describedVideoRowCount: Object.keys(this.props.requests_described).length,
                describedCourses: Object.keys(this.props.requests_described)


            })


        }


        // if (this.props.studentActive === true && this.props.described === true) {
        //     console.log("ZOOM", this.props.requests_described)
        //
        //     this.setState({
        //         cache: new CellMeasurerCache({
        //             fixedWidth: true,
        //             defaultHeight: 200
        //         }),
        //         describedVideoRowCount: Object.keys(this.props.requests_described).length,
        //         describedCourses: Object.keys(this.props.requests_described)
        //
        //     })
        //
        //
        // }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("IT UPDATED")
        if (Object.keys(this.props.coursesReducer).length !== Object.keys(prevProps.coursesReducer).length) {

            //CAPTIONING
            if (this.props.studentActive) {

                if (this.props.studentActive === true) {
                    this.setState({
                        cache: new CellMeasurerCache({
                            fixedWidth: true,
                            defaultHeight: 200
                        }),
                        canvasVideoRowCount: Object.keys(this.props.requests_captioning).length,
                        captioningCourses: Object.keys(this.props.requests_captioning),
                        describedVideoRowCount: Object.keys(this.props.requests_described).length,
                        describedCourses: Object.keys(this.props.requests_described)


                    })


                }
            } else {

                if (this.props.studentActive === true) {
                    this.setState({
                        cache: new CellMeasurerCache({
                            fixedWidth: true,
                            defaultHeight: 200
                        }),
                        canvasVideoRowCount: Object.keys(this.props.requests_captioning).length,
                        captioningCourses: Object.keys(this.props.requests_captioning),
                        describedVideoRowCount: Object.keys(this.props.requests_described).length,
                        describedCourses: Object.keys(this.props.requests_described)


                    })


                }
            }
            //DESCRIBED
            // if (this.props.studentActive === true && this.props.described === true) {
            //
            //     this.setState({
            //         cache: new CellMeasurerCache({
            //             fixedWidth: true,
            //             defaultHeight: 200
            //         }),
            //         describedVideoRowCount: Object.keys(this.props.requests_described).length,
            //         describedCourses: Object.keys(this.props.requests_described)
            //     })
            // } else {
            //
            //     this.setState({
            //         cache: new CellMeasurerCache({
            //             fixedWidth: true,
            //             defaultHeight: 200
            //         }),
            //         describedVideoRowCount:Object.keys(this.props.requests_described).length,
            //         describedCourses:Object.keys(this.props.requests_described)
            //     })
            // }


        }


        if (Object.keys(this.props.canvasVideoReducer).length !== Object.keys(prevProps.canvasVideoReducer).length) {

            //CAPTIONING
            if (this.props.studentActive) {

                if (this.props.studentActive === true) {
                    this.setState({
                        cache: new CellMeasurerCache({
                            fixedWidth: true,
                            defaultHeight: 200
                        }),
                        canvasVideoRowCount: Object.keys(this.props.requests_captioning).length,
                        captioningCourses: Object.keys(this.props.requests_captioning),
                        describedVideoRowCount: Object.keys(this.props.requests_described).length,
                        describedCourses: Object.keys(this.props.requests_described)


                    })


                }
            } else {

                if (this.props.studentActive === true) {
                    this.setState({
                        cache: new CellMeasurerCache({
                            fixedWidth: true,
                            defaultHeight: 200
                        }),
                        canvasVideoRowCount: Object.keys(this.props.requests_captioning).length,
                        captioningCourses: Object.keys(this.props.requests_captioning),
                        describedVideoRowCount: Object.keys(this.props.requests_described).length,
                        describedCourses: Object.keys(this.props.requests_described)


                    })


                }
            }



        }





        if (this.props.studentActive !== prevProps.studentActive || this.props.described !== prevProps.described) {





            if (this.props.studentActive === true && this.props.described === false) {
                this.setState({
                    cache: new CellMeasurerCache({
                        fixedWidth: true,
                        defaultHeight: 200
                    }),
                    canvasVideoRowCount: Object.keys(this.props.requests_captioning).length,
                    captioningCourses: Object.keys(this.props.requests_captioning),
                    describedVideoRowCount: Object.keys(this.props.requests_described).length,
                    describedCourses: Object.keys(this.props.requests_described)

                })


            }

            if (this.props.studentActive === true && this.props.described === true) {
                this.setState({
                    cache: new CellMeasurerCache({
                        fixedWidth: true,
                        defaultHeight: 200
                    }),
                    canvasVideoRowCount: Object.keys(this.props.requests_captioning).length,
                    captioningCourses: Object.keys(this.props.requests_captioning),
                    describedVideoRowCount: Object.keys(this.props.requests_described).length,
                    describedCourses: Object.keys(this.props.requests_described)

                })


            }

        }

    }

    renderRowAlpha(index) {

        if (this.props.studentActive === true && this.props.described === false) {
            console.log("RENDER ALPHA CAPTIONED", this.props.studentActive, this.props.described)
            if (this.state.cache !== undefined) {

                return(
                    <CellMeasurer
                        key={index.key}
                        cache={this.state.cache}
                        parent={index.parent}
                        columnIndex={0}
                        rowIndex={index.index}>
                        <div key={index.key} style={index.style} className="row">

                            <CanvasCourseContainer canvasvideos={this.props.courseCanvasVideos}
                                                   course_id={this.state.captioningCourses[index.index]}
                                                   key={this.state.captioningCourses[index.index]}/>
                        </div>
                    </CellMeasurer>

                )

            }

        }

        if (this.props.studentActive === true && this.props.described === true) {
            console.log("RENDER ALPHA DESCRIBED", this.props.studentActive, this.props.described)
            if (this.state.cache !== undefined) {
                console.log("INDEX", index.key)
                return(
                    <CellMeasurer
                        key={index.key}
                        cache={this.state.cache}
                        parent={index.parent}
                        columnIndex={0}
                        rowIndex={index.index}>
                        <div key={index.key} style={index.style} className="row">

                            <CanvasCourseContainer canvasvideos={this.props.describedVideos}
                                                   course_id={this.state.describedCourses[index.index]}
                                                   key={this.state.describedCourses[index.index]}/>
                        </div>

                    </CellMeasurer>

                )

            }


        }


    }

    render() {
        console.log("DAT STATE", this.state, this.props)
        if (this.props.described === false) {
            console.log("ZRRZRRRRR", this.state.cache.rowHeight, this.state.canvasVideoRowCount)
            return(

                <div>
                    <div className={"iLearnContentContainer"}>
                        {Object.keys(this.props.courseCanvasVideos).length === 0 && ("No Canvas Videos")}


                        {Object.keys(this.props.courseCanvasVideos).length > 0 && this.props.showCourseStubs  && <CircularProgress/>}
                        {Object.keys(this.props.courseCanvasVideos).length > 0 && !this.props.showCourseStubs && (
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
                                                rowCount={this.state.canvasVideoRowCount}
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

        if (this.props.described === true) {
            console.log("QPQPQ", this.state.cache.rowHeight, this.state.describedVideoRowCount)
            return(

                <div>
                    <div className={"iLearnContentContainer"}>
                        {Object.keys(this.props.describedVideos).length === 0 && ("No Canvas Videos")}


                        {Object.keys(this.props.describedVideos).length > 0 && this.props.showCourseStubs  && <CircularProgress/>}
                        {Object.keys(this.props.describedVideos).length > 0 && !this.props.showCourseStubs && (
                            <div key={this.props.described} className="list">
                                <AutoSizer>
                                    {
                                        ({ width, height }) => {
                                            return <List
                                                width={width}
                                                height={height}
                                                deferredMeasurementCache={this.state.cache}
                                                rowHeight={this.state.cache.rowHeight}
                                                rowRenderer={this.renderRowAlpha}
                                                rowCount={this.state.describedVideoRowCount}
                                                overscanRowCount={5} />
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



}


function mapStateToProps({canvasVideoReducer, loadingStatusReducer, coursesReducer}, {studentActive, described})  {




    let courseIsLoading = loadingStatusReducer['coursesLoading'] && Object.keys(coursesReducer).length === 0;
    let isLoading = loadingStatusReducer['canvasVideosLoading'] && Object.keys(canvasVideoReducer).length === 0;
    let showCourseStubs = courseIsLoading || isLoading;

    let requests_captioning = {};
    let requests_described = {};
    let no_captioning = {};

    let canvasVideosSearchTemp = {...canvasVideoReducer}
    let canvasDescribedVideosSearchTemp = {...canvasVideoReducer}

    let courseCanvasVideos = {}
    let describedVideos = {}


    function capActiveFunc(element, index, array) {
        return element.student_requests_captioning === studentActive
    }


    function describedActiveFunc(element, index, array) {
        return element.student_requests_described_video === studentActive // is just true
    }


    Object.keys(coursesReducer).forEach(function (key) {

        if (coursesReducer[key].students_enrolled.some(capActiveFunc) === true) {
            requests_captioning[key] = coursesReducer[key]
        }
    });


    Object.keys(coursesReducer).forEach(function (key) {

        if (coursesReducer[key].students_enrolled.some(describedActiveFunc) === true) {
            requests_described[key] = coursesReducer[key]
        }
    });



    // build canvas-videos dict
    Object.keys(requests_captioning).forEach(courseKey => {

            courseCanvasVideos[courseKey] = {};
            Object.keys(canvasVideosSearchTemp).forEach(videoKey => {
                if (canvasVideosSearchTemp[videoKey]['course_gen_id'] === courseKey) {
                    courseCanvasVideos[courseKey][videoKey] = canvasVideosSearchTemp[videoKey]
                    delete canvasVideosSearchTemp[videoKey]
                }
            })


    });



    // build described dict
    Object.keys(requests_described).forEach(courseKey => {

        describedVideos[courseKey] = {};
        Object.keys(canvasDescribedVideosSearchTemp).forEach(videoKey => {

            if (canvasDescribedVideosSearchTemp[videoKey]['course_gen_id'] === courseKey) {
                describedVideos[courseKey][videoKey] = canvasDescribedVideosSearchTemp[videoKey]
                delete canvasDescribedVideosSearchTemp[videoKey]
            }
        })


    });

    let showCourseContainer = !courseIsLoading && !isLoading && Object.keys(courseCanvasVideos).length > 0;
    let showDescribedCourseContainer = !courseIsLoading && !isLoading && Object.keys(describedVideos).length > 0;



        console.log("captioned", courseCanvasVideos, requests_captioning, showCourseContainer, studentActive)
        console.log("described", describedVideos, requests_described, showDescribedCourseContainer, described)

        return {
        courseIsLoading,
        coursesReducer,
        showCourseStubs:false,
        showCourseContainer,
        requests_captioning,
        no_captioning,
        courseCanvasVideos,
        studentActive,
        describedVideos,
        requests_described,
        showDescribedCourseContainer,
        described,
            canvasVideoReducer
    }
}


export default withRouter(connect(mapStateToProps)(CanvasAllCoursesView))