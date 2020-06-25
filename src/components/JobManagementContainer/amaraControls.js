import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";






class AmaraControls extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log("GGEERRGG", this.props.amaraResource)
        return (
            <div className="astControls">
                {this.props.amaraResource.url}
            </div>

        )
    }

}


function mapStateToProps({loadingStatusReducer, errorsReducer, videosJobsReducer}, {amaraResource}) {

    return {
        amaraResource

    }
}

export default withRouter(connect(mapStateToProps)(AmaraControls))