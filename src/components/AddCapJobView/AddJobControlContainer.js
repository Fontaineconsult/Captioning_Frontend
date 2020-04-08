import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import NewJobMasterContainer from "./newJobMasterContainer";





class AddJobControlContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }





    render() {

        return (

            <div>
                <div>Add Job    Add Media    Edit Media</div>
                <div>
                    <NewJobMasterContainer/>
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

export default withRouter(connect(mapStateToProps)(AddJobControlContainer))