import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import  "../../css/users.css"

import EmailTemplateTabulator from "./EmailTemplateTabulator";


class EmailHistoryContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }





    render() {

        return (
            <div className="masterListItem masterListUser">
                <div style={{"margin-bottom":"10px"}} className={"emp-display-container"}>
                    <div className={"emp-display-title"}>
                        <div style={{"font-weight":"600"}}>
                            Mail History
                        </div>
                    </div>
                    <EmailTemplateTabulator props={{"bool":"student_requests_captions_email_sent",
                        "date": "student_requests_captions_email_sent_date"}}/>
                </div>


            </div>
        )
    }

}


function mapStateToProps({employeesReducer, requesterReducer, campusOrgReducer}, {props}) {



    return {


    }
}

export default withRouter(connect(mapStateToProps)(EmailHistoryContainer))