import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import {fetchMediaBySourceUrl} from '../../actions/ampApi/fetchData'
import NewCapJobFormContainer from "../AddCapJobView/newCapJobFormContainer";
import NewMediaContainer from "../AddMediaContainer/newMediaContainer";
import { v1 as uuidv1 } from 'uuid';
import SubmissionForm from "./SubmissionForm";
import {addTempJob} from "../../actions/tempJobsForm";
import {clearMediaSearch} from '../../actions/mediaSearch'

class MediaMasterContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            link: '',
            transaction_link: '',
            transaction_id: '',
            request_active: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkURL = this.checkURL.bind(this)
        this.checkError = this.checkError.bind(this)
        this.createJob = this.createJob.bind(this)
    }
    checkURL(event) {

        if (this.state.link !== ''){

                let transaction_id = uuidv1();
                if (this.state.link !== this.state.transaction_link) {
                    this.setState({transaction_id: transaction_id,
                                        transaction_link: this.state.link});
                    this.props.dispatch(fetchMediaBySourceUrl(this.state.link, transaction_id))

                }
        }


        if (this.state.link === "") {
            this.setState({transaction_id: ''})
            this.props.dispatch(clearMediaSearch())


        }

    }
    checkError(){
        return !!this.props.errorsReducer[this.state.transaction_id];
    }

    createJob(event){


        if (!this.state.transaction_id) {this.setState({transaction_id : uuidv1()})}
        if (this.state.link !== '') {
            this.props.dispatch(addTempJob(this.state.transaction_id))
            this.setState({request_active: true})

        } else {
            alert("Add a link")
        }

    }

    handleInputChange(event) {

        if (this.state.transaction_link !== this.state.link)  {
            this.setState({
                request_active: false
            })
        }

        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });

        if (this.state.transaction_link !== this.state.link || this.state.link === '')  {
            this.setState({
                request_active: false
            })
        }
    }

    render() {
        return(
            <div>
                <form onSubmit={this.createTempJob}>
                    <label>
                        Source Link:
                        <input
                            name="link"
                            type='text'
                            size="50"
                            value={this.state.link}
                            onChange={this.handleInputChange}
                            onBlur={this.checkURL}/>
                    </label>
                </form>
                {<button onClick={this.createJob}>Create Request</button>}
                {this.checkError() && noItemFound()}
                {this.props.mediaSearchReducer[this.state.transaction_id] && mediaInfoDisplay(this.props.mediaSearchReducer[this.state.transaction_id])}
                {this.state.request_active && <SubmissionForm transaction_link = {this.state.transaction_link} transaction_id = {this.state.transaction_id} />}
            </div>

        )
    }

}

function mediaInfoDisplay(props) {
    console.log(props)
    return (<div>
        <h2>{props.title}</h2>
        {props.captioned_url ? <a href={props.captioned_url}>{props.captioned_url}</a> : <span>No captioned version provided</span>}
            </div>)

}

function noItemFound(){
    return <h2>No Item Found</h2>
}



function mapStateToProps({mediaSearchReducer, errorsReducer, tempJobsFormReducer}) {

    return {
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer

    }
}


export default withRouter(connect(mapStateToProps)(MediaMasterContainer))