import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {
    Switch,
    Route,
    NavLink,

} from "react-router-dom";

import SendEmailsContainer from "./SendEmailsContainer";
import EmailHistoryContainer from "./EmailHistoryContainer";

class EmailManagementControlContainer extends Component {


    render() {

        return (
            <div className="ContentManagementMasterContainer">
                <div className="control-bar">
                    <div className="controlBarNavButtons">
                        <div id="jobManager" role="button" className="navButton">
                            <NavLink
                                to={{pathname: "/captioning/email/send",
                                    search: this.props.location.search,
                                }}>Send Emails</NavLink>
                        </div>
                        <div id="jobManager" role="button" className="navButton">
                            <NavLink
                                to={{pathname: "/captioning/email/history",
                                    search: this.props.location.search,
                                }}>Mail History</NavLink>
                        </div>
                        <div id="jobManager" role="button" className="navButton">
                            <NavLink
                                to={{pathname: "/captioning/email/somethingmore",
                                    search: this.props.location.search,
                                }}>Settings</NavLink>
                        </div>
                    </div>
                </div>
                <div>
                    <Switch>
                        <Route path="/captioning/email/send">{<SendEmailsContainer/>}</Route>
                        <Route path="/captioning/email/history">{<EmailHistoryContainer/>}</Route>
                    </Switch>
                </div>
            </div>


        )

    }

}


function mapStateToProps({videosJobsReducer}, {props}) {



    return {
        videosJobsReducer,
        props

    }
}

export default withRouter(connect(mapStateToProps)(EmailManagementControlContainer))