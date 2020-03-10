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
                    Sub Form!!!
                    {this.props.tempJobExists && <NewMediaContainer transaction_link={this.props.transaction_link} transaction_id={this.props.transaction_id}/>}
                    {this.props.tempJobExists && <NewCapJobFormContainer transaction_id={this.props.transaction_id}/>}
                    {this.props.tempJobExists && <button>Submit Request</button>}
                </div>

            )
        }

}

function mapStateToProps({mediaSearchReducer, errorsReducer, tempJobsFormReducer}, {transaction_id, transaction_link}) {


    let mediaExists = mediaSearchReducer.hasOwnProperty(transaction_id);
    let tempJobExists = tempJobsFormReducer.hasOwnProperty(transaction_id);

    return {
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer,
        transaction_id,
        mediaExists,
        tempJobExists,
        transaction_link
    }
}


export default withRouter(connect(mapStateToProps)(SubmissionForm))