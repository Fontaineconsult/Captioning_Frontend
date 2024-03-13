import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {v1 as uuidv1} from 'uuid';
import Button from '@material-ui/core/Button'
import NewMediaContainer from "../AddMediaContainer/AddMediaContainer";
import {addTempJob, clearIncompleteTempCapJobs, completeTempJob} from "../../actions/tempJobsForm";
import CircularProgress from '@material-ui/core/CircularProgress';
import {clearMediaSearch} from "../../actions/mediaSearch"
import {removeErrorState} from "../../actions/error_state"
import NewJobFormContainer from "./newJobFormContainer"
import MediaDisplayContainer from "../AddMediaContainer/mediaDisplayContainer";
import ListItemsMasterContainer from "../AddCapJobView/playlistsContainer"
import '../../css/addJobContainer.css'
import {clearFormData, updateBtnClickedInTempFormValue, updateTransactionId} from "../../actions/tempFormData";


function MediaSearcher(props) {
    return (

        <div className="videoSearchFeedbackContainer">
            {props.mediaSearchLoading ? <CircularProgress/>
                : <MediaDisplayContainer transaction_id={props.transaction_id}/>
            }
        </div>
    )

}

class JobPrepContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            //modified by KG
            transaction_id: this.props.transactionId,
            //listItemsView: false
            listItemsView: this.props.listItemView
        };


        this.createTransaction = this.createTransaction.bind(this)
        this.finalizeTransaction = this.finalizeTransaction.bind(this)
        this.clearTransaction = this.clearTransaction.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)


    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState({
            [name]: value
        });
    }

    createTransaction() {
        //single request button clicked


        // aaron: Start here. The transaction ID directs ever action the job creation process takes.

        let transaction_id = uuidv1()
        this.setState({
            transaction_id: transaction_id,
            listItemsView: false,
        });


        // aaron: This is the action that adds the transaction to the tempJobsFormReducer
        this.props.dispatch(addTempJob(transaction_id, this.props.requesterId.requester_id))
        this.props.dispatch(updateBtnClickedInTempFormValue("single", this.props.requesterId))

        // aaron: This is the action that adds the transaction ID to the tempFormDataReducer
        this.props.dispatch(updateTransactionId(transaction_id))
        // aaron: make sure to watch the tempFormDataReducer. You will see the transaction ID created when these functions are called
    }


    createListTransaction() {
        //Playlist btn clicked

        // aaron: DON'T LOOK HERE!!!!!!
        let transaction_id = uuidv1()
        this.setState({
            listItemsView: true,
            transaction_id: transaction_id
        });

        this.props.dispatch(updateBtnClickedInTempFormValue("list"))

    }

    clearTransaction(event) {
        this.setState({
            transaction_id: '',
            listItemsView: false
        })
        this.props.dispatch(clearIncompleteTempCapJobs())
        this.props.dispatch(clearMediaSearch(this.state.transaction_id))
        this.props.dispatch(removeErrorState(this.state.transaction_id))
        this.props.dispatch(clearFormData())

    }


    finalizeTransaction() {
        // aaron: This is the action that completes the transaction and sets the meta.created to true. This is likely where the wrong logic is happening.
        this.props.dispatch(completeTempJob(this.props.transaction_id, true))

    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        //aaron: This is where the transaction ID is being set to null. This is likely where a problem is happening.
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

        //form disabled has to be true when changing page and coming back
        //problem is transaction id is getting null on page change

        //The above problem is solved
        // console.log("transaction id is ", this.state.transaction_id)
        // console.log("JopPrepContainer: tempJobsFormReducer has property", this.props.tempJobsFormReducer.hasOwnProperty(this.state.transaction_id))
        // console.log("JopPrepContainer: Requester ID", this.props.requesterId)

        if (this.props.listItemView) {
            formDisabled = false
        }

        // aaron: DEF CHECK HERE!!!! There is probably a way to add more logic to this in order to fix the problem.
        let isLocked = this.state.transaction_id === '';

        return (

            <div className="jobPrepMasterContainer">
                <div className="jobPrepButtons">
                    <div className="jobPrepButton">
                        <Button name="add_single" size="small" variant="contained"
                                onClick={e => this.createTransaction(e)} disabled={formDisabled}>Add Single
                            Request</Button>
                    </div>
                    <div className="jobPrepButton">
                        <Button name="add_list" size="small" variant="contained"
                                onClick={e => this.createListTransaction(e)} disabled={formDisabled}>Add From
                            Playlist</Button>
                    </div>
                    <div className="jobPrepButton">
                        <Button name="clear" size='small' variant="contained" onClick={e => this.clearTransaction(e)}
                                disabled={this.props.clearDisabled}>Clear</Button>
                    </div>


                </div>
                <div className="jobPrepContainer">

                    <div className="jobPrepContainerLeft"
                         style={{width: this.state.listItemsView === true ? '100%' : '70%'}}>


                        {!this.state.listItemsView &&
                            <NewMediaContainer transaction_id={this.state.transaction_id} isLocked={isLocked}/>
                        }

                        {!this.state.listItemsView && <NewJobFormContainer requesterId={this.props.requesterId}
                                                                           transaction_id={this.state.transaction_id}
                                                                           isLocked={isLocked}/>
                        }

                        {this.state.listItemsView && <ListItemsMasterContainer isLocked={isLocked}
                                                                               requesterId={this.props.requesterId}
                                                                               transaction_id={this.state.transaction_id}/>}


                    </div>

                    <div className="jobPrepContainerRight"
                         style={{width: this.state.listItemsView === true ? '0%' : '30%'}}>
                        {this.state.listItemsView === false ?
                            <MediaSearcher mediaSearchLoading={this.props.mediaSearchLoading}
                                           transaction_id={this.state.transaction_id}/> : <div></div>}


                    </div>

                </div>

            </div>

        )
    }

}


function mapStateToProps({
                             mediaSearchReducer,
                             errorsReducer,
                             tempJobsFormReducer,
                             loadingStatusReducer,
                             tempFormDataReducer
                         }, {requesterId}) {
    let mediaSearchLoading = loadingStatusReducer.mediaLoading
    let formDisabled = requesterId === ""
    let transactionId = '';
    let btn_clicked = '';
    let listItemView = false;


    //aaron: maybe here?
    let clearDisabled = Object.keys(tempJobsFormReducer).filter(job => {
        return tempJobsFormReducer[job].meta.created === false


    }).length === 0


    if (Object.keys(tempFormDataReducer).length > 0) {
        //checking if formvalue exists

        if (tempFormDataReducer.data.btn_clicked != null) {
            btn_clicked = tempFormDataReducer.data.btn_clicked;

            if (btn_clicked !== null) {


                if (btn_clicked === "list") {
                    listItemView = true;
                } else {
                    formDisabled = true;
                }
            }
        }

        if (tempFormDataReducer.data.transaction_id != null) {
            transactionId = tempFormDataReducer.data.transaction_id;
        }


    }

    return {
        loadingStatusReducer,
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer,
        clearDisabled,
        formDisabled,
        requesterId,
        mediaSearchLoading,
        btn_clicked,
        transactionId,
        listItemView
    }
}


export default withRouter(connect(mapStateToProps)(JobPrepContainer))