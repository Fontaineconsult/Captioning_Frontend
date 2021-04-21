import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import  "../../css/users.css"
import StudentRequestsCaptioningTabulatorContainer from "./StudentRequestsCaptioningTabulatorContainer";

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
                <StudentRequestsCaptioningTabulatorContainer props={{"bool":"student_requests_captions_email_sent",
                    "date": "student_requests_captions_email_sent_date",
                    "filter": "ilearn_video_service_requested",
                    "filter_by": true,
                    "reducer": this.props.coursesReducer}}/>
            </div>




        )
    }

}


function mapStateToProps({coursesReducer}, {props}) {



    return {
        coursesReducer

    }
}

export default withRouter(connect(mapStateToProps)(SendEmailsContainer))