import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import JobContainer from "./JobContainer";





class JobManagementControlContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }





    render() {

        return (

            <div className="JobManagementControlContainer">
                <div>
                    Control Bar: Courses Filters Videos
                </div>
                <div className="contentContainer">
                    {!this.props.jobsLoading && Object.keys(this.props.videosJobsReducer).map(job => (
                        <JobContainer key={job} jobId={job}/>
                    ))}
                </div>

            </div>


        )


    }


}


function mapStateToProps({loadingStatusReducer, errorsReducer, videosJobsReducer}, {jobsLoading}) {



    return {
        videosJobsReducer,
        jobsLoading

    }
}

export default withRouter(connect(mapStateToProps)(JobManagementControlContainer))