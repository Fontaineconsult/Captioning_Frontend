import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import ILearnAllCoursesView from '../iLearnViewContainers/iLearnAllCoursesView'
import {
    Switch,
    Route,
    NavLink,

} from "react-router-dom";




class IlearnManagementControlContainer extends Component {

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
                                to={{pathname: "/captioning/ilearn-scraper/active-courses",
                                    search: this.props.location.search,
                                }}>Active Courses </NavLink><span className={"jobCount"}>{this.props.capActive}</span>
                        </div>
                        <div id="jobManager" role="button" className="navButton">
                            <NavLink
                                to={{pathname: "/captioning/ilearn-scraper/inactive-courses",
                                    search: this.props.location.search,
                                }}>Inactive Courses </NavLink><span className={"jobCount"}>{this.props.capInactive}</span>
                        </div>


                        {/*<div className="controlButton">*/}
                        {/*    Active Courses*/}
                        {/*</div >*/}
                        {/*<div className="controlButton" >*/}
                        {/*    Inactive Courses*/}
                        {/*</div>*/}
                        <div className="controlButton">
                            New Videos
                        </div >
                        <div className="controlButton" >
                            Search
                        </div>
                        <div className="controlButton" >
                            Add
                        </div>
                    </div>

                </div>
                <div>
                    <Switch>
                        <Route path="/captioning/ilearn-scraper/active-courses" render={(props) => <ILearnAllCoursesView {...props} studentActive={true} />}  />
                        <Route path="/captioning/ilearn-scraper/inactive-courses" render={(props) => <ILearnAllCoursesView {...props} studentActive={false} />}  />

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


    Object.keys(coursesReducer).forEach(function(key){

        if (coursesReducer[key].students_enrolled.some(capActiveFunc) === true) {
            capActive += 1
        } else {
            capInactive += 1
        }

    });


    return {
        videosJobsReducer,
        jobsLoading,
        capActive,
        capInactive

    }
}

export default withRouter(connect(mapStateToProps)(IlearnManagementControlContainer))