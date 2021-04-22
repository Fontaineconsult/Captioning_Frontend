import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import  "../../css/users.css"
import ReadyJobsTabulator from "./ReadyJobsTabulator";

class SendEmailsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }





    render() {

        return (
            <div>
                <div>
                    Ready Jobs
                    <br/>
                </div>
                <ReadyJobsTabulator props={{"bool":"completed_email_sent",
                    "date": "completed_email_sent_date",
                    "filter": "job_status",
                    "filter_by": "Delivered",
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

export default withRouter(connect(mapStateToProps)(SendEmailsContainer))