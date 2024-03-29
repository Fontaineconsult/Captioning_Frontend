import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Select from "react-select";
import {mediaSelectCustomStyles} from "./selectCustomStyle";
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import Button from "@material-ui/core/Button";
import {downloadCaptionFile} from '../../actions/ampApi/fetchData'
import {uploadCaptionFileWithMediaId} from "../../actions/ampApi/postData"
import green from "@material-ui/core/colors/green";
import {v1 as uuidv1} from "uuid";


class MediaContentContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            captionFiles: this.props.captionFiles,
            caption_select: "",
            media_select: "",
            mediaFiles: this.props.mediaFiles,
            capFileUpload: "",
            mediaFileUpload: "",
            cap_temp_id: "",
            media_temp_id: "",
            sha_256_hash: ""

        };

        this.downloadCaption = this.downloadCaption.bind(this)
        this.updateCapSelectState = this.updateCapSelectState.bind(this)
        this.setCaptionFile = this.setCaptionFile.bind(this)
        this.uploadCaptionFile = this.uploadCaptionFile.bind(this)
        this.updateMediaSelectState = this.updateMediaSelectState.bind(this)


    }

    // Cap select methods

    downloadCaption() {
        this.props.dispatch(downloadCaptionFile(this.state.caption_select.caption_id, this.props.mediaId))
        this.setState({
            capFileUpload: ""
        })
    }

    setCaptionFile(event) {

        document.getElementById('captionUpload').click();
        document.getElementById('captionUpload').onchange = () => {

            let fileReader = new FileReader()
            fileReader.readAsArrayBuffer(document.getElementById('captionUpload').files[0])
            let fileToSend = new FormData()
            fileToSend.append(document.getElementById('captionUpload').files[0].name,
                document.getElementById('captionUpload').files[0])

            this.setState({
                capFileUpload: fileToSend,
                cap_temp_id: uuidv1()
            });
        }

    }

    uploadCaptionFile(event) {

        this.props.dispatch(uploadCaptionFileWithMediaId(this.state.capFileUpload, this.props.mediaId, this.state.cap_temp_id))

    }


    updateCapSelectState(event) {
        this.setState({
            caption_select: event
        });

    }

    updateMediaSelectState(event) {
        this.setState({
            media_select: event
        });

    }

    render() {

        let downloadCCDisabled = this.state.caption_select === ''

        return (
            <div className="mediaContentContainer">

                <div className={"mediaContentSelectors"}>
                    <div>
                        <label form={"caption_select"}>Caption Files</label>
                        <Select
                            style={{display: "block"}}
                            name="caption_select"
                            onChange={this.updateCapSelectState}
                            styles={mediaSelectCustomStyles}
                            value={this.state.caption_select}
                            options={this.state.captionFiles
                            }/>
                    </div>
                    <div>
                        <label style={{display: "block", fontSize: '12px', textAlign: "center"}}
                               form={"caption_select"}>Download</label>
                        <Button disabled={downloadCCDisabled} onClick={this.downloadCaption}><GetAppIcon
                            fontSize="small"/></Button>
                        <input id='captionUpload' type='file' accept="text/*" hidden={true}/>
                    </div>
                    <div>
                        <label style={{display: "block", fontSize: '12px', textAlign: "center"}}
                               form={"caption_select"}>Upload</label>
                        {this.state.capFileUpload === "" &&
                            <Button onClick={this.setCaptionFile}><PublishIcon color="primary"
                                                                               fontSize="small"/></Button>}
                        {this.state.capFileUpload !== "" &&
                            <Button onClick={this.uploadCaptionFile}><PublishIcon style={{color: green[500]}}
                                                                                  fontSize="small"/></Button>}
                    </div>
                </div>
            </div>

        )
    }
}


function mapStateToProps({loadingStatusReducer, errorsReducer, mediaReducer}, {mediaId}) {

    let captionFiles
    let mediaFiles

    if (loadingStatusReducer.mediaLoading === false) {


        captionFiles = mediaReducer[mediaId].media_objects.reduce((accumulator, currentValue) => {
            if (currentValue.associated_captions !== null) {
                accumulator.push({
                    caption_id: currentValue.associated_captions.id,
                    value: currentValue.associated_captions.file_name,
                    label: currentValue.associated_captions.file_name,
                    association_id: currentValue.id
                })
            }
            return accumulator
        }, [])

        // mediaFiles = mediaReducer[mediaId].media_objects.reduce((accumulator, currentValue) => {
        //     if (currentValue.associated_files !== null) {
        //         accumulator.push({file_id:currentValue.associated_files.id, value:currentValue.associated_files.file_name, label:currentValue.associated_files.file_name, association_id:currentValue.id})
        //     }
        //     return accumulator
        // },[])


    }


    return {
        captionFiles,
        mediaFiles,
        mediaReducer,
        mediaId

    }
}

export default withRouter(connect(mapStateToProps)(MediaContentContainer))