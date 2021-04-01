import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import  "../../css/users.css"
import EmailTabulator from "./EmailTabulator";

class SendEmailsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }





    render() {

        return (
            <div>
                <div>
                    Student Requests Captioning
                </div>
                <EmailTabulator props={{"bool":"student_requests_captions_email_sent",
                    "date": "student_requests_captions_email_sent_date",
                    "filter": "ilearn_video_service_requested"}}/>
            </div>




        )
    }

}


function mapStateToProps({employeesReducer, requesterReducer, campusOrgReducer}, {props}) {



    return {


    }
}

export default withRouter(connect(mapStateToProps)(SendEmailsContainer))