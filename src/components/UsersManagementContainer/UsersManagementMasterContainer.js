import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import UserManagementControlContainer from './UserManagementControlContainer'



class UserManagementMasterContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {

        return (

            <div className="ContentManagementMasterContainer">
                <UserManagementControlContainer/>
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

export default withRouter(connect(mapStateToProps)(UserManagementMasterContainer))