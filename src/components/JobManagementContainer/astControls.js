import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";






class AstControls extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="astControls">
                AST CONTROL FORM HERE JOB ID: {this.props.ast_job_id}
            </div>

        )
    }

}


function mapStateToProps({loadingStatusReducer, errorsReducer, videosJobsReducer}, {ast_job_id}) {

    return {
        ast_job_id
    }
}

export default withRouter(connect(mapStateToProps)(AstControls))