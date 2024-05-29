import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import "../../css/users.css"
import EmailTemplatesContainer from "./EmailTemplatesContainer";
import ReadyJobsEmailContainer from "./ReadyJobsEmailContainer";
import NewJobsContainer from "./NewJobsContainer";

class SendEmailsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div style={{height: "100%", overflowY: "auto"}}>
                <div className="masterListItem masterListUser">
                    <div style={{marginBottom: "20px"}} className="emp-display-container">
                        <div className="emp-display-title" style={{fontWeight: "600"}}>
                            Templates
                        </div>
                        <EmailTemplatesContainer/>
                    </div>
                    <div style={{marginBottom: "20px"}} className="emp-display-container">
                        <div className="emp-display-title" style={{fontWeight: "600"}}>
                            Current Queues
                        </div>
                        <NewJobsContainer/>
                    </div>
                    <div className="emp-display-container">
                        <div className="emp-display-title" style={{fontWeight: "600"}}>
                            Current Queues
                        </div>
                        <ReadyJobsEmailContainer/>

                    </div>
                </div>
                <footer className="footer">
                    <p>Copyright</p>
                </footer>
            </div>
        )
    }
}

function mapStateToProps({employeesReducer, requesterReducer, campusOrgReducer }, { props }) {
    return {}
}

export default withRouter(connect(mapStateToProps)(SendEmailsContainer));
