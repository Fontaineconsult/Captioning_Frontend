import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Select from "react-select";
import {mediaSelectCustomStyles} from "./selectCustomStyle";
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import Button from "@material-ui/core/Button";
import {downloadCaptionFile, downloadMediaFile, fetchMediaByShaHash} from '../../actions/ampApi/fetchData'
import {uploadCaptionFileWithMediaId, uploadMediaFromJobView} from "../../actions/ampApi/postData"
import green from "@material-ui/core/colors/green";
import {v1 as uuidv1} from "uuid";
import CryptoJS from "crypto-js";
import {removeErrorState} from "../../actions/error_state";
import {clearMediaSearch} from "../../actions/mediaSearch";

class MediaContentContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            captionFiles: this.props.captionFiles,
            caption_select: "",
            media_select: "",
            mediaFiles: this.props.mediaFiles,
            capFileUpload:"",
            mediaFileUpload:"",
            cap_temp_id: "",
            media_temp_id:"",
            sha_256_hash:""

        };

        this.downloadCaption = this.downloadCaption.bind(this)
        this.updateCapSelectState = this.updateCapSelectState.bind(this)
        this.setCaptionFile = this.setCaptionFile.bind(this)
        this.uploadCaptionFile = this.uploadCaptionFile.bind(this)
        this.updateMediaSelectState = this.updateMediaSelectState.bind(this)
        this.downloadMedia = this.downloadMedia.bind(this)
        this.setMediaFile = this.setMediaFile.bind(this)
        this.uploadMediaFile = this.uploadMediaFile.bind(this)

    }

    // Cap select methods

    downloadCaption() {
        this.props.dispatch(downloadCaptionFile(this.state.caption_select.caption_id, this.props.mediaId))
        this.setState({
            capFileUpload:""
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
                capFileUpload:fileToSend,
                cap_temp_id: uuidv1()
            });
        }

    }

    uploadCaptionFile(event) {

        this.props.dispatch(uploadCaptionFileWithMediaId(this.state.capFileUpload, this.props.mediaId, this.state.cap_temp_id))

    }

    // file select methods



    downloadMedia() {
        this.props.dispatch(downloadMediaFile(this.state.media_select.file_id, this.props.mediaId))
    }

    setMediaFile(event) {

        document.getElementById('mediaFileUpload').click();
        document.getElementById('mediaFileUpload').onchange = () => {

            let fileReader = new FileReader()

            fileReader.onload = (completionEvent) => {
                let slicedFile = fileReader.result.slice(0, 1024)
                let wordArray = CryptoJS.lib.WordArray.create(slicedFile)
                let fileHash = CryptoJS.SHA256(wordArray).toString()

                // this.props.dispatch(removeErrorState(this.props.transaction_id));
                // this.props.dispatch(clearMediaSearch(this.props.transaction_id));
                // this.props.dispatch(fetchMediaByShaHash(fileHash, this.props.transaction_id))
                this.setState({
                    sha_256_hash: fileHash,
                })
                console.log("1State", this.state)
            }


            fileReader.readAsArrayBuffer(document.getElementById('mediaFileUpload').files[0])

            let type = document.getElementById('mediaFileUpload').files[0].type
            let blobFile = new Blob([document.getElementById('mediaFileUpload').files[0]], {type: type})
            this.setState({
                mediaFileUpload:blobFile,
                content_type:type,
                media_temp_id: uuidv1()
            });
        }

        console.log(this.state)
    }

    uploadMediaFile(event) {

        this.props.dispatch(uploadMediaFromJobView(this.state.mediaFileUpload, this.props.mediaId, this.state.cap_temp_id, this.state.content_type, this.state.sha_256_hash))
        this.setState({
            mediaFileUpload:"",
            content_type:""
        })

    }

    //

    updateCapSelectState(event){
        this.setState({
            caption_select: event
        });

    }

    updateMediaSelectState(event){
        this.setState({
            media_select: event
        });

    }

    render() {

        let downloadCCDisabled = this.state.caption_select === ''
        let downloadMediaDisabled = this.state.media_select === ''

        return (
            <div className="mediaContentContainer">

                <div className={"mediaContentSelectors"}>
                    <div>
                        <label style={{display: "block", fontSize: '12px'}} form={"caption_select"}>Caption Files</label>
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
                        <label style={{display: "block", fontSize: '12px', textAlign: "center"}} form={"caption_select"}>Download</label>
                        <Button disabled={downloadCCDisabled} onClick={this.downloadCaption}><GetAppIcon fontSize="small"/></Button>
                        <input id='captionUpload' type='file' accept="text/*" hidden={true}/>
                    </div>
                    <div>
                        <label style={{display: "block", fontSize: '12px', textAlign: "center"}} form={"caption_select"}>Upload</label>
                        {this.state.capFileUpload === "" && <Button onClick={this.setCaptionFile}><PublishIcon color="primary" fontSize="small"/></Button>}
                        {this.state.capFileUpload !== "" && <Button onClick={this.uploadCaptionFile}><PublishIcon style={{ color: green[500] }} fontSize="small"/></Button>}
                    </div>
                </div>
                <div className={"mediaContentSelectors"}>
                    <div>
                        <label style={{display: "block", fontSize: '12px'}} form={"media_select"}>Media Files</label>
                        <Select
                            name="media_select"
                            onChange={this.updateMediaSelectState}
                            styles={mediaSelectCustomStyles}
                            value={this.state.media_select}
                            options={this.state.mediaFiles
                            }/>
                    </div>
                    <div>
                        <label style={{display: "block", fontSize: '12px', textAlign: "center"}} form={"media_select"}>Download</label>
                        <Button style={{marginRight: "4px"}} disabled={downloadMediaDisabled} onClick={this.downloadMedia}><GetAppIcon fontSize="small"/></Button>
                        <input id='mediaFileUpload' type='file' accept="video/*, audio/*" hidden={true}/>
                    </div>
                    <div>
                        <label style={{display: "block", fontSize: '12px', textAlign: "center"}} form={"media_select"}>Upload</label>
                        {this.state.mediaFileUpload === "" && <Button onClick={this.setMediaFile}><PublishIcon color="primary" fontSize="small"/></Button>}
                        {this.state.mediaFileUpload !== "" && <Button onClick={this.uploadMediaFile}><PublishIcon style={{ color: green[500] }} fontSize="small"/></Button>}
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
                accumulator.push({caption_id:currentValue.associated_captions.id, value:currentValue.associated_captions.file_name, label:currentValue.associated_captions.file_name, association_id:currentValue.id})
            }
            return accumulator
        },[])

        mediaFiles = mediaReducer[mediaId].media_objects.reduce((accumulator, currentValue) => {
            if (currentValue.associated_files !== null) {
                accumulator.push({file_id:currentValue.associated_files.id, value:currentValue.associated_files.file_name, label:currentValue.associated_files.file_name, association_id:currentValue.id})
            }
            return accumulator
        },[])



    }




    return {
        captionFiles,
        mediaFiles,
        mediaReducer,
        mediaId

    }
}

export default withRouter(connect(mapStateToProps)(MediaContentContainer))