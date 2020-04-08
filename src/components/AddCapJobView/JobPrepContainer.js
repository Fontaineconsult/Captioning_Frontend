import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import { v1 as uuidv1 } from 'uuid';
import Button from '@material-ui/core/Button'
import NewMediaContainer from "../AddMediaContainer/AddMediaContainer";
import {addTempJob, completeTempJob} from "../../actions/tempJobsForm";
import NewJobFormContainer from "./newJobFormContainer"

class JobPrepContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            transaction_id:''
        };

        this.createTransaction = this.createTransaction.bind(this)
        this.finalizeTransaction = this.finalizeTransaction.bind(this)
    }

    createTransaction (event) {
        let transaction_id = uuidv1()
        this.setState({
            transaction_id:transaction_id
        });
        this.props.dispatch(addTempJob(transaction_id))

    }

    finalizeTransaction (){

        this.props.dispatch(completeTempJob(this.props.transaction_id, true))


    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.tempJobsFormReducer[this.state.transaction_id]) {
            console.log("It exists")
            if (this.props.tempJobsFormReducer[this.state.transaction_id].meta.created === true) {
                console.log("updating transaction id")
                this.setState({
                    transaction_id: ''
                })
            }
        } else {
            return false
        }


    }


    render() {

        let isLocked = this.state.transaction_id === '';

        return (

            <div>
                JobPrepContainer

                <Button size="small"  onClick={e => this.createTransaction(e)}>Add Request</Button>
                <NewMediaContainer current_course = {this.props.currentCourse}
                                   transaction_id = {this.state.transaction_id}
                                   isLocked = {isLocked}
                />
                <NewJobFormContainer current_course = {this.props.currentCourse}
                                     transaction_id = {this.state.transaction_id}
                                     isLocked = {isLocked}
                />



            </div>

        )
    }

}

function mapStateToProps({mediaSearchReducer, errorsReducer, tempJobsFormReducer}, {props}) {



    return {
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer,
        props
    }
}


export default withRouter(connect(mapStateToProps)(JobPrepContainer))