import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import EmailManagementControlContainer from './EmailManagementControlContainer'



class EmailManagementMasterContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {

        return (

            <div className="ContentManagementMasterContainer">
                <EmailManagementControlContainer/>
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

export default withRouter(connect(mapStateToProps)(EmailManagementMasterContainer))