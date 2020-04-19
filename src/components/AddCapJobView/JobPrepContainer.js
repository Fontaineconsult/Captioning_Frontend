import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import { v1 as uuidv1 } from 'uuid';
import Button from '@material-ui/core/Button'
import NewMediaContainer from "../AddMediaContainer/AddMediaContainer";
import {addTempJob, completeTempJob, clearTempCapJobs} from "../../actions/tempJobsForm";
import {clearMediaSearch} from "../../actions/mediaSearch"
import {removeErrorState} from "../../actions/error_state"
import NewJobFormContainer from "./newJobFormContainer"
import MediaDisplayContainer from "../AddMediaContainer/mediaDisplayContainer";
import '../../css/addJobContainer.css'

class JobPrepContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            transaction_id:''
        };

        this.createTransaction = this.createTransaction.bind(this)
        this.finalizeTransaction = this.finalizeTransaction.bind(this)
        this.clearTransaction = this.clearTransaction.bind(this)
    }

    createTransaction (event) {
        let transaction_id = uuidv1()
        this.setState({
            transaction_id:transaction_id
        });
        this.props.dispatch(addTempJob(transaction_id))

    }

    clearTransaction(event){
        this.setState({
            transaction_id:''
        })

        this.props.dispatch(clearTempCapJobs())
        this.props.dispatch(clearMediaSearch())
        this.props.dispatch(removeErrorState())

    }


    finalizeTransaction (){

        this.props.dispatch(completeTempJob(this.props.transaction_id, true))


    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.tempJobsFormReducer[this.state.transaction_id]) {
            if (this.props.tempJobsFormReducer[this.state.transaction_id].meta.created === true) {
                this.setState({
                    transaction_id: ''
                })
            }
        } else {
            return false
        }


    }


    render() {
        let buttonDisabled = this.props.formDisabled ? "disabled": null;

        let isLocked = this.state.transaction_id === '';

        return (

            <div className="jobPrepMasterContainer">
                <div className="jobPrepButtons">

                    <Button size="small" variant="contained"  onClick={e => this.createTransaction(e)} disabled={this.props.formDisabled}>Add Request</Button>
                    <Button size='small' variant="contained" onClick={e => this.clearTransaction(e)} buttonDisabled disabled={this.props.formDisabled}>Clear</Button>

                </div>
                <div className="jobPrepContainer">

                    <div className="jobPrepContainerLeft">
                        <div className="newMediaOuterContainer">

                            <NewMediaContainer
                                               transaction_id = {this.state.transaction_id}
                                               isLocked = {isLocked}
                            />
                        </div>
                        <div className="newJobFormOuterContainer">
                            <NewJobFormContainer requesterId = {this.props.requesterId}
                                                 transaction_id = {this.state.transaction_id}
                                                 isLocked = {isLocked}
                            />
                        </div>
                    </div>

                    <div className="jobPrepContainerRight">
                        <div className="videoSearchFeedbackContainer">
                            <MediaDisplayContainer transaction_id = {this.state.transaction_id}/>
                        </div>

                    </div>

                </div>







            </div>

        )
    }

}




function mapStateToProps({mediaSearchReducer, errorsReducer, tempJobsFormReducer}, {requesterId}) {

    let formDisabled = requesterId === "";



    return {
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer,

        formDisabled
    }
}


export default withRouter(connect(mapStateToProps)(JobPrepContainer))