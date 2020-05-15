import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import {addMediaToDBandTempJob} from '../../actions/ampApi/postData'
import {fetchMediaBySourceUrl, fetchMediaByShaHash} from '../../actions/ampApi/fetchData'
import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import MediaDisplayContainer from './mediaDisplayContainer'
import {removeErrorState} from '../../actions/error_state'
import {clearMediaSearch} from '../../actions/mediaSearch'
import {addMediaToTempJob, addMediaToTempJobNoId} from "../../actions/tempJobsForm";
import addJobsContainer from "../iLearnViewsContainer/iLearnTabulatorViewContainer/addJobsContainer";
import Section from "react-virtualized/dist/commonjs/Collection/Section";
import md5 from 'crypto-js/md5'
import CryptoJS from 'crypto-js'

class NewMediaContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            cap_location: '',
            source_location: '',
            type: 'URL',

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkSourceUrl = this.checkSourceUrl.bind(this);
        this.addNewMediaToJob = this.addNewMediaToJob.bind(this)
        this.handleFileSubmit = this.handleFileSubmit.bind(this)

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (!this.props.isLocked) {
            this.setState({
                [name]: value
            });

        }


    }

    handleFileSubmit(event) {

        this.props.dispatch(removeErrorState(this.props.transaction_id));
        this.props.dispatch(clearMediaSearch(this.props.transaction_id));

        let userData = new FormData()
        let fileReader = new FileReader()
        fileReader.onload = (completionEvent) => {

            let wordArray = CryptoJS.lib.WordArray.create(fileReader.result)
            let fileHash = CryptoJS.SHA256(wordArray).toString()
            this.props.dispatch(fetchMediaByShaHash(fileHash, this.props.transaction_id))
        }
        fileReader.readAsArrayBuffer(event.target.files[0])


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


            if (this.state.type === 'URL') {
                if (this.state.source_location === '') {
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
            if (this.state.type === 'File') {



            }
            if (this.state.type === 'SFSU Box') {

            }

        }
    }

    render() {
        let SourceInput
        if (this.state.type === "URL") {
            SourceInput = <Input
                placeholder="e.x., https://www.youtube.com/watch?v=AAssk2N_oPk"
                className="addJobInput"
                name="source_location"
                type='text'
                size="50"
                maxLength="150"
                required={true}
                disabled={this.props.inputsDisabled}
                value={this.state.source_location}
                onChange={this.handleInputChange}
                onBlur={this.checkSourceUrl}/>
        } else if (this.state.type === "File") {
            SourceInput = <Input
                className="addJobInput"
                accept="video/*"
                name="videoFile"
                type="file"
                onChange={this.handleFileSubmit}
                required={true}
                disabled={this.props.inputsDisabled}
            />
        }


        return(
            <div className="addMediaContainer">
                <div className="videoFormContainer">
                    <form onSubmit={this.handleSubmit}>
                        <div className="videoInputs">
                            <label className="newJobLabel">
                                Video Type:
                                <Select
                                    disabled={this.props.inputsDisabled}
                                    className="videoType"
                                    name="type"
                                    onChange={this.handleInputChange}
                                    value={this.state.type}
                                >
                                    <MenuItem value={'URL'}>URL</MenuItem>
                                    <MenuItem value={"File"}>File</MenuItem>
                                </Select>
                            </label>

                            <label className="newJobLabel">
                                Source Location
                                {SourceInput}
                            </label>
                            <label className="newJobLabel">
                                Video Title
                                <Input
                                    className="addJobInput"
                                    name="title"
                                    type='text'
                                    size="50"
                                    required={true}
                                    disabled={this.props.inputsDisabled}
                                    maxLength="128"
                                    value={this.state.title}
                                    onChange={this.handleInputChange}/>

                            </label>
                        </div>

                        <div className="videoInputs inputsLower">

                                <div className="mediaSubmitButton">
                                    {!this.props.videoSelected && !this.props.submitDisabled && <Button size="small" color="secondary"  variant="contained" name="submit"  type="submit" disabled={true}>Add Video</Button>}
                                    {this.props.inError && <Button size="small" color="secondary"  variant="contained" name="submit"  type="submit" disabled={!this.props.submitDisabled} onClick={this.addNewMediaToJob}>Add Video</Button>}
                                    {this.props.inMedia && !this.props.videoSelected && <Button size="small" color="secondary"  variant="contained" name="submit"  type="submit" disabled={!this.props.submitDisabled} onClick={this.addNewMediaToJob}>Use Video</Button>}
                                    {this.props.videoSelected && <Button size="small" color="primary"  variant="contained" name="submit"  type="submit" disabled={true}>Video Selected</Button>}
                                </div>
                        </div>
                    </form>

                </div>

            </div>

        )
    }




    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.transaction_id !== this.props.transaction_id) {
            if (this.props.transaction_id === '') {
                this.setState({
                    title: '',
                    cap_location: '',
                    source_location: '',
                    type: 'URL',
                })
            }

        }

    }

}


function mapStateToProps({mediaSearchReducer, errorsReducer, tempJobsFormReducer}, {transaction_id, transaction_link, isLocked}) {
    let videoSelected = false;
    let inputsDisabled = transaction_id === ''

    let submitDisabled = mediaSearchReducer.hasOwnProperty(transaction_id) || errorsReducer.hasOwnProperty(transaction_id)

    if (tempJobsFormReducer[transaction_id]) {

        videoSelected = tempJobsFormReducer[transaction_id].video.hasOwnProperty("id")
    }


    let inError = errorsReducer.hasOwnProperty(transaction_id);
    let inMedia = mediaSearchReducer.hasOwnProperty(transaction_id);


    console.log("videoSelected", videoSelected)
    return {
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer,
        transaction_id,
        transaction_link,
        isLocked,
        submitDisabled,
        inError,
        inMedia,
        inputsDisabled,
        videoSelected

    }
}

export default withRouter(connect(mapStateToProps)(NewMediaContainer))