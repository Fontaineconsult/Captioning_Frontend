import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";






class AmaraControls extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="astControls">
                AMARA CONTROLS GO HERE
            </div>

        )
    }

}


function mapStateToProps({loadingStatusReducer, errorsReducer, videosJobsReducer}, {jobsLoading}) {

    return {

    }
}

export default withRouter(connect(mapStateToProps)(AmaraControls))