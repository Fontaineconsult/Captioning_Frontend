import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import NewJobMasterContainer from "./newJobMasterContainer";
import { NavLink } from "react-router-dom";

class AddJobControlContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleRequestEnabled: false,
            playlistEnabled: false
        };
    }

    handleSingleRequestClick = () => {
        // Enable/disable single request button and inputs
        this.setState({
            singleRequestEnabled: !this.state.singleRequestEnabled
        });
    };

    handlePlaylistClick = () => {
        // Enable/disable playlist button and inputs
        this.setState({
            playlistEnabled: !this.state.playlistEnabled
        });
    };

    render() {
        return (
            <div className="ContentManagementMasterContainer">

                <div className={"newJobOuterConainer"}>
                    <NewJobMasterContainer
                        singleRequestEnabled={this.state.singleRequestEnabled}
                        playlistEnabled={this.state.playlistEnabled}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps({ loadingStatusReducer, errorsReducer, videosJobsReducer }, { jobsLoading }) {
    return {
        videosJobsReducer,
        jobsLoading
    }
}

export default withRouter(connect(mapStateToProps)(AddJobControlContainer));
