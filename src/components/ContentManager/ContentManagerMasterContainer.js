import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import ContentManagerControlContainer from "./ContentManagerControlContainer";


class ContentManagerMasterContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {

        return (

            <div className="ContentManagementMasterContainer">
                <ContentManagerControlContainer/>
            </div>

        )

    }


}


function mapStateToProps({loadingStatusReducer, errorsReducer, videosJobsReducer}, {props}) {


    return {

        errorsReducer,
        props

    }
}

export default withRouter(connect(mapStateToProps)(ContentManagerMasterContainer))