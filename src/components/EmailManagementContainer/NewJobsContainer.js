import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import  "../../css/users.css"
import ReadyJobsTabulator from "./ReadyJobsTabulator";
import NewJobsTabulator from "./NewJobsTabulator";

class NewJobsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }





    render() {

        return (
            <div>
                <div>
                    New Jobs
                    <br/>
                </div>
                <NewJobsTabulator props={{
                    "reducer": this.props.videosJobsReducer}}/>
            </div>




        )
    }

}


function mapStateToProps({videosJobsReducer}, {props}) {



    return {

        videosJobsReducer
    }
}

export default withRouter(connect(mapStateToProps)(NewJobsContainer))