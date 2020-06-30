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
            <div className="amaraControls">
                <div>
                    <a target="_blank" href={this.props.amaraResource.url}>{this.props.amaraResource.url}</a>
                </div>

                <div className="amaraCapStatus">
                    <div>Uploaded: {this.props.amaraResource.captions_uploaded ? ("True") : ("False")}</div>
                    <div>Complete: {this.props.amaraResource.captions_uploaded ? ("True") : ("False")}</div>
                </div>
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