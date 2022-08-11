import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from "react-router";
import {addMediaToDBandTempJob, uploadVideoWithMediaId} from '../../actions/ampApi/postData'
import {fetchMediaByShaHash, fetchMediaBySourceUrl} from '../../actions/ampApi/fetchData'
import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {removeErrorState} from '../../actions/error_state'
import {clearMediaSearch} from '../../actions/mediaSearch'
import {addMediaToTempJobNoId} from "../../actions/tempJobsForm";
import CryptoJS from 'crypto-js'
import {updateSingleSourceLocation, updateSingleVideoTitle, updateSingleVideoType} from "../../actions/tempFormData";

class NewMediaContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.video_title,
            cap_location: '',
            source_location: this.props.source_location,
            type: 'URL',
            sha_256_hash: ''

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkSourceUrl = this.checkSourceUrl.bind(this);
        this.addNewMediaToJob = this.addNewMediaToJob.bind(this)
        this.checkIfFileExists = this.checkIfFileExists.bind(this)
        this.addNewMediaFileToJob = this.addNewMediaFileToJob.bind(this)
        this.uploadVideoAndAddToTempJob = this.uploadVideoAndAddToTempJob.bind(this)
        this.addNewMediaFileInfoToDB = this.addNewMediaFileInfoToDB.bind(this)
    }

    addNewMediaFileToJob(event) {
        event.preventDefault();

        this.setState({
            title: this.props.mediaSearchReducer[this.props.transaction_id].title

        })

        this.props.dispatch(addMediaToTempJobNoId(this.props.transaction_id, this.props.mediaSearchReducer[this.props.transaction_id]))
        this.props.dispatch(removeErrorState(this.props.transaction_id));
        this.props.dispatch(clearMediaSearch(this.props.transaction_id));


    }

    addNewMediaFileInfoToDB(event) {
        event.preventDefault();
        if (this.state.title === '') {
            alert("Enter a title")
        } else {
            event.preventDefault();
            this.props.dispatch(addMediaToDBandTempJob(this.state.title, this.state.sha_256_hash, this.state.type, this.props.transaction_id))
            this.props.dispatch(removeErrorState(this.props.transaction_id));
            this.props.dispatch(clearMediaSearch(this.props.transaction_id));

        }
    }

    uploadVideoAndAddToTempJob(event) {

        event.preventDefault();

        if (this.props.videoSelected) {
            if (this.props.tempJobsFormReducer[this.props.transaction_id].meta.uploaded === false) {
                let media_id = this.props.mediaSearchReducer[this.props.transaction_id].id
                this.props.dispatch(uploadVideoWithMediaId(this.state.fileToSend, media_id, this.props.transaction_id, this.state.content_type))
                this.props.dispatch(removeErrorState(this.props.transaction_id));
                this.props.dispatch(clearMediaSearch(this.props.transaction_id));
            }

        }

        if (!this.props.videoSelected) {

            if (this.props.tempJobsFormReducer[this.props.transaction_id].meta.uploaded === false) {
                let media_id = this.props.mediaSearchReducer[this.props.transaction_id].id
                this.props.dispatch(uploadVideoWithMediaId(this.state.fileToSend, media_id, this.props.transaction_id, this.state.content_type))
                this.props.dispatch(removeErrorState(this.props.transaction_id));
                this.props.dispatch(clearMediaSearch(this.props.transaction_id));
            }

            this.setState({
                title: this.props.mediaSearchReducer[this.props.transaction_id].title

            })

        }

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (!this.props.isLocked) {
            this.setState({
                [name]: value
            }, () => {
                this.props.dispatch(updateSingleVideoType(this.state.type))
                this.props.dispatch(updateSingleSourceLocation(this.state.source_location))
                this.props.dispatch(updateSingleVideoTitle(this.state.title))


            });

        }


    }

    checkIfFileExists(event) {

        let fileReader = new FileReader()

        fileReader.onload = (completionEvent) => {
            let slicedFile = fileReader.result.slice(0, 1024)
            let wordArray = CryptoJS.lib.WordArray.create(slicedFile)
            let fileHash = CryptoJS.SHA256(wordArray).toString()

            this.props.dispatch(removeErrorState(this.props.transaction_id));
            this.props.dispatch(clearMediaSearch(this.props.transaction_id));
            this.props.dispatch(fetchMediaByShaHash(fileHash, this.props.transaction_id))
            this.setState({
                sha_256_hash: fileHash,
            })

        }

        fileReader.readAsArrayBuffer(event.target.files[0])

        let blobFile = new Blob([event.target.files[0]], {type: event.target.files[0].type})
        this.setState({
            fileToSend: blobFile,
            content_type: event.target.files[0].type
        })

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
                        // if the media doesn't exists
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
                        // if the media exists
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
                accept="video/*,audio/*"
                name="videoFile"
                type="file"
                onChange={this.checkIfFileExists}
                required={true}
                disabled={this.props.inputsDisabled}
            />
        }

        return (
            <div className="newMediaOuterContainer">
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
                                        onChange={this.handleInputChange}
                                    />

                                </label>
                            </div>

                            <div className="videoInputs inputsLower">

                                <div className="mediaSubmitButton">
                                    {!this.props.videoSelected && !this.props.submitDisabled &&
                                        <Button size="small" color="secondary" variant="contained" name="submit"
                                                type="submit" disabled={true}>Add Video</Button>}

                                    {this.state.type === 'URL' && this.props.inMedia && !this.props.videoSelected &&
                                        <Button size="small" color="secondary" variant="contained" name="submit"
                                                type="submit" disabled={!this.props.submitDisabled}
                                                onClick={this.addNewMediaToJob}>Use Video</Button>}
                                    {this.state.type === 'URL' && this.props.inError &&
                                        <Button size="small" color="secondary" variant="contained" name="submit"
                                                type="submit" disabled={!this.props.submitDisabled}
                                                onClick={this.addNewMediaToJob}>Add Video</Button>}
                                    {this.state.type === 'URL' && this.props.videoSelected &&
                                        <Button size="small" color="primary" variant="contained" name="submit"
                                                type="submit" disabled={true}>Video Selected</Button>}


                                    {/* not in media table. Need to add */}
                                    {this.state.type === 'File' && this.props.inError &&
                                        <Button size="small" color="secondary" variant="contained" name="submit"
                                                type="submit" disabled={!this.props.submitDisabled}
                                                onClick={this.addNewMediaFileInfoToDB}>Add File</Button>}
                                    {/* In Media Table and file present. */}
                                    {this.state.type === 'File' && this.props.inMedia && !this.props.videoSelected && this.props.filePresent &&
                                        <Button size="small" color="secondary" variant="contained" name="submit"
                                                type="submit" disabled={!this.props.submitDisabled}
                                                onClick={this.addNewMediaFileToJob}>Use File</Button>}
                                    {/* Added to media table but no file uploaded video not in job yet*/}
                                    {this.state.type === 'File' && this.props.inMedia && !this.props.videoSelected && !this.props.filePresent &&
                                        <Button size="small" color="secondary" variant="contained" name="submit"
                                                type="submit" disabled={!this.props.submitDisabled}
                                                onClick={this.uploadVideoAndAddToTempJob}>- Upload File</Button>}
                                    {/* Added to media table but no file uploaded*/}
                                    {this.state.type === 'File' && this.props.inMedia && this.props.videoSelected && !this.props.filePresent &&
                                        <Button size="small" color="secondary" variant="contained" name="submit"
                                                type="submit" disabled={!this.props.submitDisabled}
                                                onClick={this.uploadVideoAndAddToTempJob}>Upload File</Button>}
                                    {/* File Uploaded and Video info complete*/}
                                    {this.state.type === 'File' && this.props.fileUploaded && this.props.videoSelected &&
                                        <Button size="small" color="primary" variant="contained" name="submit"
                                                type="submit" disabled={true}>Video Selected</Button>}
                                </div>
                            </div>
                        </form>

                    </div>

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


function mapStateToProps({mediaSearchReducer, errorsReducer, tempJobsFormReducer, tempFormDataReducer}, {
    transaction_id,
    transaction_link,
    isLocked
}) {
    let videoSelected = false;
    let inputsDisabled = transaction_id === ''
    let filePresent = false
    let fileUploaded = false

    let source_location = '';
    let video_title = '';

    let submitDisabled = mediaSearchReducer.hasOwnProperty(transaction_id) || errorsReducer.hasOwnProperty(transaction_id)

    if (tempJobsFormReducer[transaction_id]) {

        videoSelected = tempJobsFormReducer[transaction_id].video.hasOwnProperty("id")
        fileUploaded = tempJobsFormReducer[transaction_id].meta.uploaded

    }


    if (mediaSearchReducer[transaction_id]) {
        filePresent = mediaSearchReducer[transaction_id].media_objects.some(item => {

                return item.associated_files.sha_256_hash === mediaSearchReducer[transaction_id].sha_256_hash
            }
        )

    }


    if (Object.keys(tempFormDataReducer).length > 0) {
        //checking if formvalue exists

        if (tempFormDataReducer.data.single_source_location != null) {
            source_location = tempFormDataReducer.data.single_source_location;
        }


        if (tempFormDataReducer.data.single_video_title != null) {
            video_title = tempFormDataReducer.data.single_video_title;
        }


        if (tempFormDataReducer.data.btn_clicked === "single") {
            inputsDisabled = false;
            isLocked = false;
        }


    }

    let inError = errorsReducer.hasOwnProperty(transaction_id);
    let inMedia = mediaSearchReducer.hasOwnProperty(transaction_id);

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
        videoSelected,
        filePresent,
        fileUploaded,
        source_location,
        video_title

    }
}

export default withRouter(connect(mapStateToProps)(NewMediaContainer))