import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {sendVideoExtractRequestDeferred,
    uploadMediaFromJobView,
    sendVideoConversionRequestDeferred,
    sendOpenCaptionRequestDeferred} from "../../actions/ampApi/postData";

import {fileDownloadUrl} from "../../constants";
import IconButton from "@material-ui/core/IconButton";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import Select from "react-select";
import {mediaSelectCustomStyles, s3ResourceSelect} from "./selectCustomStyle";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {getS3Link} from "../../actions/ampApi/putData"
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";
import green from "@material-ui/core/colors/green";
import {downloadMediaFile} from "../../actions/ampApi/fetchData";
import CryptoJS from "crypto-js";
import {v1 as uuidv1} from "uuid";




const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            padding: "4px 3px"
        },
    },
}));




class VideoFileControlsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            s3Resources: "",
            media_select: "",
            mediaFiles: this.props.mediaFiles,
            mediaFileUpload:"",
            media_temp_id:"",
            sha_256_hash:""
        };

        this.extractAudioFromVideo = this.extractAudioFromVideo.bind(this)
        this.extractVideoYTDL = this.extractVideoYTDL.bind(this)
        this.convertVideoToMp4 = this.convertVideoToMp4.bind(this)
        this.convertAudioToM4a = this.convertAudioToM4a.bind(this)
        this.getS3Link = this.getS3Link.bind(this)
        this.createOpenCaption = this.createOpenCaption.bind(this)
        this.extractAudioYTDL = this.extractAudioYTDL.bind(this)
        this.updateMediaSelectState = this.updateMediaSelectState.bind(this)
        this.downloadMedia = this.downloadMedia.bind(this)
        this.setMediaFile = this.setMediaFile.bind(this)
        this.uploadMediaFile = this.uploadMediaFile.bind(this)
    }


    componentDidMount() {


    }

    updateMediaSelectState(event){
        this.setState({
            media_select: event
        });

    }
    // Convert
    convertVideoToMp4() {
        //media_file_id media_id task

            this.props.dispatch(sendVideoConversionRequestDeferred(this.state.media_select.value, this.props.mediaId, 'convert-video'))

    }

    extractAudioFromVideo() {
            console.log("START", this.state.media_select.value, this.props.mediaId,)
            this.props.dispatch(sendVideoConversionRequestDeferred(this.state.media_select.value, this.props.mediaId, 'extract-audio'))

    }

    convertAudioToM4a() {


            this.props.dispatch(sendVideoConversionRequestDeferred(this.state.media_select.value, this.props.mediaId, 'extract-audio'))

    }
    // YouTubeDL
    extractVideoYTDL() {
        if (this.props.media.media_type === 'URL') {
            this.props.dispatch(sendVideoExtractRequestDeferred(this.props.mediaId, this.props.media.source_url, 'mp4'))
        }
    }


    extractAudioYTDL() {
        if (this.props.media.media_type === 'URL') {
            this.props.dispatch(sendVideoExtractRequestDeferred(this.props.mediaId, this.props.media.source_url, 'm4a'))
        }
    }

    // S3 Link
    getS3Link(event) {
        this.setState({
            s3Resources: event
        });
        this.props.dispatch(getS3Link(this.state.value))

    }


    // Open Caption
    createOpenCaption() {

        if (this.props.media.media_type === 'URL') {
            this.props.dispatch(sendOpenCaptionRequestDeferred(this.props.mediaId, this.state.source_url, 'mp4'))
        }
    }





    // Download / Upload
    downloadMedia() {

        this.props.dispatch(downloadMediaFile(this.state.media_select.value, this.props.mediaId))
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


    render() {
        let downloadMediaDisabled = this.state.media_select === ''
        console.log(this.state.media_select.value)
        return (

                <div>
                    <label className="capJobMediaContentContainer">
                        <div className="mediaContentDescriptor">
                            <label style={{'margin-right': '8px'}}>Videos:</label>
                            <Select
                                style={{width: "50px"}}
                                name="s3_links"
                                onChange={this.updateMediaSelectState}
                                styles={s3ResourceSelect}
                                value={this.state.media_select}
                                options={this.props.s3Resources}
                            />
                        </div>
                    </label>
                    <div className={"extractorButtonsContainer"}>
                        <label style={{'margin-right': '8px'}}>Convert:</label>
                        <div><Button classes={{root: useStyles.padding}} disabled={false} name={"extract_audio"} size={"small"} onClick={this.extractAudioFromVideo}>m4a</Button></div>
                        <div><Button disabled={false} name={"extract_video"} size={"small"} onClick={this.convertVideoToMp4}>mp4</Button></div>
                        <div><Button disabled={false} name={"open_caption"} size={"small"} onClick={this.createOpenCaption}>OC</Button></div>
                    </div>
                    <div className={"extractorButtonsContainer"}>
                        <label style={{'margin-right': '8px'}}>YTDL:</label>
                        <div><Button classes={{root: useStyles.padding}} disabled={false} name={"extract_audio"} size={"small"} onClick={this.extractAudioYTDL}>m4a</Button></div>
                        <div><Button disabled={false} name={"extract_video"} size={"small"} onClick={this.extractVideoYTDL}>mp4</Button></div>

                    </div>
                    <div className={"extractorButtonsContainer"}>
                        <label style={{'margin-right': '8px'}}>Links:</label>
                        <div><Button classes={{root: useStyles.padding}} disabled={false} name={"extract_audio"} size={"small"} onClick={this.getS3Link}>S3 Link</Button></div>
                    </div>
                    <div className={"extractorButtonsContainer"}>
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

    let media = mediaReducer[mediaId]
    let fileObject = null
    let download_url = null
    let s3Resources
    if (media.media_type === 'File') {
        fileObject =  media.media_objects.find(item => {
            return item.associated_files.sha_256_hash === media.sha_256_hash

        })
    }

    if (fileObject) {
        let endpoint = fileDownloadUrl()
        download_url = `${endpoint}?media_id=${media.id}`
    }

    if (Object.keys(mediaReducer).length > 0) {
        media = mediaReducer[mediaId]


        s3Resources = mediaReducer[mediaId].media_objects.reduce((accumulator, currentValue) => {
            if (currentValue.associated_files !== null){

                accumulator.push({
                    value: currentValue.associated_files.id,
                    label: currentValue.associated_files.file_name,
                })
            }
            return accumulator
        }, [])}

    console.log("SDFSDF", media)
    return {
        media,
        fileObject,
        download_url,
        mediaId,
        s3Resources
    }
}

export default withRouter(connect(mapStateToProps)(VideoFileControlsContainer))


