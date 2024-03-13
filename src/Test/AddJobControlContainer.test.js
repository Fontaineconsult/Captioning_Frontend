import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import NewJobMasterContainer from "./newJobMasterContainer";

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
                                to={{
                                    pathname: "/captioning/add-job",
                                    search: this.props.location.search,
                                }}
                            >
                                Add Job
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className={"newJobOuterConainer"}>
                    <NewJobMasterContainer />
                </div>
            </div>
        );
    }
}

export default withRouter(connect()(AddJobControlContainer));