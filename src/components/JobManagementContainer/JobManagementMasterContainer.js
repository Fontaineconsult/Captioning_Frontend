import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {fetchAllVideoJobsBySemester} from '../../actions/ampApi/fetchData'
import JobContainer from './JobContainer'
import videosJobsReducer from "../../reducers/existingVideoJobs";
import JobManagementControlContainer from './JobManagementControlContainer'



class JobManagementMasterContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {


        this.props.dispatch(fetchAllVideoJobsBySemester(this.props.query.semester))

    }


    render() {

        return (


            <div className="JobManagementMasterContainer">
                <JobManagementControlContainer jobsLoading={this.props.jobsLoading}/>
            </div>

        )


    }


}


function mapStateToProps({loadingStatusReducer, errorsReducer, videosJobsReducer}, {props}) {

    let jobsLoading = loadingStatusReducer.videoJobsLoading;

    return {

        errorsReducer,
        jobsLoading,
        props

    }
}

export default withRouter(connect(mapStateToProps)(JobManagementMasterContainer))