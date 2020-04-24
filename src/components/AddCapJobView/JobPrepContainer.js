import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import { v1 as uuidv1 } from 'uuid';
import Button from '@material-ui/core/Button'
import NewMediaContainer from "../AddMediaContainer/AddMediaContainer";
import {addTempJob, completeTempJob, clearIncompleteTempCapJobs} from "../../actions/tempJobsForm";
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
        this.props.dispatch(addTempJob(transaction_id, this.props.requesterId.requester_id))

    }

    clearTransaction(event){
        this.setState({
            transaction_id:''
        })

        this.props.dispatch(clearIncompleteTempCapJobs())
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
        let formDisabled = (this.props.requesterId === "" || this.props.tempJobsFormReducer.hasOwnProperty(this.state.transaction_id))
        let isLocked = this.state.transaction_id === '';

        return (

            <div className="jobPrepMasterContainer">
                <div className="jobPrepButtons">
                    <div className="jobPrepButton">
                        <Button size="small" variant="contained" onClick={e => this.createTransaction(e)} disabled={formDisabled}>Add Request</Button>
                    </div>
                    <div className="jobPrepButton">
                        <Button size='small' variant="contained"  onClick={e => this.clearTransaction(e)}  disabled={this.props.clearDisabled}>Clear</Button>
                    </div>


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

    let formDisabled = requesterId === ""



    let clearDisabled = Object.keys(tempJobsFormReducer).filter(job => {
        return tempJobsFormReducer[job].meta.created === false


    }).length === 0



    return {
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer,
        clearDisabled,
        formDisabled,
        requesterId
    }
}


export default withRouter(connect(mapStateToProps)(JobPrepContainer))