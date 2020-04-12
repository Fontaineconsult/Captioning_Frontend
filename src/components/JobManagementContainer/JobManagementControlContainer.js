import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import JobContainer from "./JobContainer";
import Select from "react-select";
import videosJobsReducer from "../../reducers/existingVideoJobs";





class JobManagementControlContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videoJobs: this.props.videosJobsReducer,
            courseIds: {}
        };

        this.reductionFilter = this.reductionFilter.bind(this);
    }


    reductionFilter(key, toFilter) {



        let filter = Object.keys(this.state.videoJobs).reduce((accumulator, element) => {
            if (this.state.videoJobs[element][key] === toFilter) {
                accumulator[element] = this.state.videoJobs[element]
            }
            return accumulator
        }, {});

        this.setState({videoJobs:filter})
    }







    componentDidMount() {




        // let requester_id = requester_ids.find(x => this.props.requesterReducer[x].course_id === this.props.current_course)

    }


    render() {


        return (

            <div className="JobManagementControlContainer">
                <div className="control-bar">
                    <div className="controlBarNavButtons">
                        <div className="controlButton">
                            Courses
                        </div >
                        <div className="controlButton" >
                            Filters
                        </div>
                        <div className="controlButton">
                            Videos
                        </div>

                    </div>
                    <div className="jobManagementFilters">
                        <div className="filtersOuterContainer">
                            <div onClick={this.reductionFilter}>
                                <Select value={this.state.course} options={this.props.courses_list} onChange={this.applyCourse}/>
                            </div>
                            <div>
                                Status
                            </div>
                            <div>
                                FILTER 3
                            </div>


                        </div>


                    </div>


                </div>
                <div className="contentContainer">


                    {!this.props.jobsLoading && Object.keys(this.state.videoJobs).map(job => (
                        <JobContainer key={job} jobId={job}/>
                    ))}

                </div>

            </div>

        )

    }


}


function mapStateToProps({loadingStatusReducer, errorsReducer, videosJobsReducer, requesterReducer, coursesReducer}, {jobsLoading}) {


    let requester = {};
    let courseSelectorContent = {};


    if (Object.keys(requesterReducer).length > 0 && Object.keys(videosJobsReducer).length > 0) {

        let requester_ids = Object.keys(videosJobsReducer).map(x => {
            return videosJobsReducer[x].requester_id
        });

        requester = requester_ids.reduce((accumulator, element) => {
            accumulator[element] = {id: requesterReducer[element].id, course_id: requesterReducer[element].course_id}
            return accumulator

        }, {});

        courseSelectorContent = requester_ids.map(x => {
            return {id: requesterReducer[x].id, course_id: requesterReducer[x].course_id}

        });


    }

    console.log("DFSDFSDF", requester, courseSelectorContent)


    return {
        videosJobsReducer,
        jobsLoading,
        requesterReducer,
        coursesReducer,
        requester,
        courseSelectorContent

    }
}

export default withRouter(connect(mapStateToProps)(JobManagementControlContainer))