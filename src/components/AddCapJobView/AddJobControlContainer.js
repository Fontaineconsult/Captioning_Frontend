import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import NewJobMasterContainer from "./newJobMasterContainer";
import {NavLink} from "react-router-dom";





class AddJobControlContainer extends Component {

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
                                to={{pathname: "/captioning/add-job",
                                    search: this.props.location.search,
                                }}>Add Job</NavLink>
                        </div>

                    </div>
                </div>
                <div className={"masterListItem"}>
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