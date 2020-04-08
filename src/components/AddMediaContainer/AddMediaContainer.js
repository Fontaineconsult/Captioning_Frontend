import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import {addMediaToDBandTempJob} from '../../actions/ampApi/postData'
import {fetchMediaBySourceUrl} from '../../actions/ampApi/fetchData'

import MediaDisplayContainer from './mediaDisplayContainer'
import {removeErrorState} from '../../actions/error_state'
import {clearMediaSearch} from '../../actions/mediaSearch'
import {addMediaToTempJob, addMediaToTempJobNoId} from "../../actions/tempJobsForm";


class NewMediaContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current_course: '',
            title: '',
            cap_location: '',
            source_location: '',
            type: 'URL',

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkSourceUrl = this.checkSourceUrl.bind(this);
        this.addNewMediaToJob = this.addNewMediaToJob.bind(this)

    }

    handleInputChange(event) {


        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(target)

        if (!this.props.isLocked) {

            this.setState({
                [name]: value
            });

        }


    }
    checkSourceUrl(event) {

        this.props.dispatch(removeErrorState(this.props.transaction_id));
        this.props.dispatch(clearMediaSearch(this.props.transaction_id));

        if (this.state.source_location !== '') {
            event.preventDefault();
            this.props.dispatch(fetchMediaBySourceUrl(this.state.source_location, this.props.transaction_id))
        }

    }

    addNewMediaToJob(event) {
        event.preventDefault();

        if (!this.props.isLocked) {
            event.preventDefault();

            if (this.state.source_location === '' ||  this.state.type === '') {
                event.preventDefault();
                alert("Missing Input")


            } else {

                if (!this.props.mediaSearchReducer[this.props.transaction_id]) {

                    if (this.state.title !== '') {
                        event.preventDefault();
                        this.props.dispatch(removeErrorState(this.props.transaction_id));
                        this.props.dispatch(clearMediaSearch(this.props.transaction_id));
                        this.props.dispatch(addMediaToDBandTempJob(this.state.title, this.state.source_location, this.state.type, this.props.transaction_id));

                    } else {
                        event.preventDefault();
                        alert("Add a title")

                    }
                } else {
                    this.setState({
                        title: this.props.mediaSearchReducer[this.props.transaction_id].title
                    })
                    this.props.dispatch(addMediaToTempJobNoId(this.props.transaction_id, this.props.mediaSearchReducer[this.props.transaction_id]))
                    this.props.dispatch(removeErrorState(this.props.transaction_id));
                    this.props.dispatch(clearMediaSearch(this.props.transaction_id));

                }
            }
        }
    }


    render() {
        console.log("DA ID", this.state, this.props.mediaSearchReducer[this.props.transaction_id], this.props.errorsReducer[this.props.transaction_id] )
        return(
            <div>
                <p>NEW MEDIA FORM</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Source Location
                        <input
                            name="source_location"
                            type='text'
                            size="50"
                            value={this.state.source_location}
                            onChange={this.handleInputChange}
                            onBlur={this.checkSourceUrl}/>
                    </label>
                    <label>
                        Video Title:
                        <input
                            name="title"
                            type='text'
                            size="50"
                            value={this.state.title}
                            onChange={this.handleInputChange}/>

                    </label>
                    <br />
                    <label>
                        Video Type:
                        <select name="type" value={this.state.type} onChange={this.handleInputChange}>
                            <option value="URL">URL</option>
                            <option value="File">File</option>
                        </select>
                    </label>
                    <label>
                        Submit
                        <input
                            name="submit"
                            type="submit"
                            onClick={this.addNewMediaToJob}
                        />
                    </label>
                </form>


                {this.props.mediaSearchReducer[this.props.transaction_id]  && < MediaDisplayContainer transaction_id = {this.props.transaction_id}/>}

                {this.props.errorsReducer[this.props.transaction_id]  && < MediaDisplayContainer transaction_id = {this.props.transaction_id}/>}

            </div>

        )
    }

    componentDidMount() {
        this.setState({current_course: this.props.current_course})
    }



    componentDidUpdate(prevProps, prevState, snapshot) {


        if (prevProps.transaction_id !== this.props.transaction_id) {
            if (this.props.transaction_id === '') {
                this.setState({
                    current_course: '',
                    title: '',
                    cap_location: '',
                    source_location: '',
                    type: 'URL',
                })
            }

        }


    }

}




function mapStateToProps({mediaSearchReducer, errorsReducer, tempJobsFormReducer}, {transaction_id, transaction_link, current_course, isLocked}) {



    return {
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer,
        transaction_id,
        transaction_link,
        current_course,
        isLocked

    }
}

export default withRouter(connect(mapStateToProps)(NewMediaContainer))