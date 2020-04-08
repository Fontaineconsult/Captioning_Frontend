import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import ILearnAllCoursesView from '../iLearnViewContainers/iLearnAllCoursesView'





class IlearnManagementControlContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }





    render() {

        return (

            <div>
                <div>Active Courses    Inactive Courses    New Videos    Search</div>
                <div>
                    <ILearnAllCoursesView/>
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

export default withRouter(connect(mapStateToProps)(IlearnManagementControlContainer))