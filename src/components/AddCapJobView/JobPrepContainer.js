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
import {clearFormData, updateBtnClickedInTempFormValue} from "../../actions/tempFormData";


function MediaSearcher(props) {
    console.log("SDFSDFDS", props)
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
            transaction_id: '',
            listItemsView: false
        };


        this.createTransaction = this.createTransaction.bind(this)
        this.finalizeTransaction = this.finalizeTransaction.bind(this)
        this.clearTransaction = this.clearTransaction.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)

        //TODO
        // if (this.props.btn_clicked === "single") {
        //     this.createTransaction()
        // } else if (this.props.btn_clicked === "list") {
        //     this.createListTransaction()
        // }

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
        let transaction_id = uuidv1()
        this.setState({
            transaction_id: transaction_id,
            listItemsView: false,
        });
        this.props.dispatch(addTempJob(transaction_id, this.props.requesterId.requester_id))
        this.props.dispatch(updateBtnClickedInTempFormValue("single"))

    }


    createListTransaction() {
        //Playlist btn clicked
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

    let btn_clicked = '';
    let clearDisabled = Object.keys(tempJobsFormReducer).filter(job => {
        return tempJobsFormReducer[job].meta.created === false


    }).length === 0

    if (Object.keys(tempFormDataReducer).length > 0) {
        //checking if formvalue exists

        if (tempFormDataReducer.data.btn_clicked != null) {
            btn_clicked = tempFormDataReducer.data.btn_clicked;
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
        btn_clicked
    }
}


export default withRouter(connect(mapStateToProps)(JobPrepContainer))