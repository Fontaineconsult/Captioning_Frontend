import React, { Component } from 'react';

import NewCapJobFormContainer from "../AddCapJobView/newCapJobFormContainer";
import NewMediaContainer from "../AddMediaContainer/newMediaContainer";
import {withRouter} from "react-router";
import {connect} from "react-redux";






class SubmissionForm extends Component {


        constructor(props) {
            super(props);
            this.state = {
            }
        }

        render() {

            return (

                <div>
                    <br/>
                    <br/>
                    Sub Form!!!
                    {this.props.mediaExists && <NewMediaContainer transaction_link={this.props.transaction_link} transaction_id={this.props.transaction_id}/>}
                    {this.props.showJobs && <NewCapJobFormContainer transaction_id={this.props.transaction_id}/>}
                    {this.props.showJobs && <button>Submit Request</button>}
                </div>

            )
        }

}

function mapStateToProps({mediaSearchReducer, errorsReducer, tempJobsFormReducer}, {transaction_id, transaction_link}) {


    let mediaExists = mediaSearchReducer.hasOwnProperty(transaction_id);
    let tempJobExists = Object.keys(tempJobsFormReducer).length > 0;


    let completedJobExists = Object.keys(tempJobsFormReducer).map(key => {
        return tempJobsFormReducer[key].meta.created === true
    }).includes(true)

    let showJobs = tempJobExists || completedJobExists


    return {
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer,
        transaction_id,
        mediaExists,
        tempJobExists,
        transaction_link,
        completedJobExists,
        showJobs
    }
}


export default withRouter(connect(mapStateToProps)(SubmissionForm))