import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {NavLink, Route, Switch,} from "react-router-dom";
import CanvasAllCoursesView from "../CanvasViewContainers/CanvasAllCoursesView";
import CanvasNewJobView from "../CanvasNewVideosContainer/CanvasNewJobsView";


class CanvasManagementControlContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div className="ContentManagementMasterContainer">
                <div className="control-bar">
                    <div className="controlBarNavButtons">
                        <div id="jobManager" role="button" className="navButton">
                            <NavLink
                                to={{
                                    pathname: "/captioning/canvas-scraper/active-courses",
                                    search: this.props.location.search,
                                }}>Active Courses </NavLink><span className={"jobCount"}>{this.props.capActive}</span>
                        </div>
                        {/*<div id="jobManager" role="button" className="navButton">*/}
                        {/*    <NavLink*/}
                        {/*        to={{*/}
                        {/*            pathname: "/captioning/canvas-scraper/inactive-courses",*/}
                        {/*            search: this.props.location.search,*/}
                        {/*        }}>Inactive Courses </NavLink><span*/}
                        {/*    className={"jobCount"}>{this.props.capInactive}</span>*/}
                        {/*</div>*/}

                        <div id="jobManager" role="button" className="navButton">
                            <NavLink
                                to={{
                                    pathname: "/captioning/canvas-scraper/new-videos",
                                    search: this.props.location.search,
                                }}>New Videos </NavLink><span className={"jobCount"}>{this.props.newVideos}</span>
                        </div>
                        {/*<div className="controlButton">*/}
                        {/*    Search*/}
                        {/*</div>*/}
                        {/*<div className="controlButton">*/}
                        {/*    Add*/}
                        {/*</div>*/}
                    </div>

                </div>
                <div>
                    <Switch>
                        <Route path="/captioning/canvas-scraper/active-courses"
                               render={(props) => <CanvasAllCoursesView {...props} studentActive={true}/>}/>
                        {/*<Route path="/captioning/canvas-scraper/inactive-courses"*/}
                        {/*       render={(props) => <CanvasAllCoursesView {...props} studentActive={false}/>}/>*/}
                        <Route path="/captioning/canvas-scraper/new-videos"
                               render={(props) => <CanvasNewJobView {...props} studentActive={true}/>}/>
                    </Switch>
                </div>
            </div>

        )

    }


}


function mapStateToProps({loadingStatusReducer, errorsReducer, videosJobsReducer, coursesReducer}, {jobsLoading}) {

    let capActive = 0;
    let capInactive = 0;


    function capActiveFunc(element, index, array) {
        return element.student_requests_captioning === true
    }


    Object.keys(coursesReducer).forEach(function (key) {


        if (coursesReducer[key].canvas_page_id !== null) {
            capActive += 1

        }


    });


    return {
        videosJobsReducer,
        jobsLoading,
        capActive,
        capInactive,
        newVideos: 33
    }
}

export default withRouter(connect(mapStateToProps)(CanvasManagementControlContainer))