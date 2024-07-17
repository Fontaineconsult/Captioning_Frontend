import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {
    sendOpenCaptionRequestDeferred,
    sendVideoConversionRequestDeferred,
    sendVideoExtractRequestDeferred,
    uploadMediaFromJobView
} from "../../actions/ampApi/postData";

import {fileDownloadUrl} from "../../constants";
import Select from "react-select";
import {s3ResourceSelect} from "./selectCustomStyle";
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {getS3Link} from "../../actions/ampApi/putData"
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";
import green from "@material-ui/core/colors/green";
import {downloadMediaFile} from "../../actions/ampApi/fetchData";
import CryptoJS from "crypto-js";
import {v1 as uuidv1} from "uuid";
import Modal from "@material-ui/core/Modal";
import TextField from '@material-ui/core/TextField';


const useStyles = theme => ({
    paper: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});

const modalStyles = theme => ({
    paper: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});


class VideoFileControlsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            s3Resources: "",
            media_select: "",
            mediaFiles: this.props.mediaFiles,
            mediaFileUpload: "",
            media_temp_id: "",
            sha_256_hash: "",
            setOpen: false,
            open: false,
            customModalOpen: false,
            customUrl: "",
            modalStyle: this.getModalStyle(),
            audioConvertDisabled: true,
            videoConvertDisabled: true,
            ytdlConvertDisabled: true,
            s3linkDisabled: true,
            OcDisabled: true,

        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCustomModalOpen = this.handleCustomModalOpen.bind(this);
        this.handleCustomModalClose = this.handleCustomModalClose.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleCustomSubmit = this.handleCustomSubmit.bind(this);
        this.extractAudioFromVideo = this.extractAudioFromVideo.bind(this);
        this.extractVideoYTDL = this.extractVideoYTDL.bind(this);
        this.convertVideoToMp4 = this.convertVideoToMp4.bind(this);
        this.convertAudioToM4a = this.convertAudioToM4a.bind(this);
        this.getS3Link = this.getS3Link.bind(this);
        this.createOpenCaption = this.createOpenCaption.bind(this);
        this.extractAudioYTDL = this.extractAudioYTDL.bind(this);
        this.updateMediaSelectState = this.updateMediaSelectState.bind(this);
        this.updateCaptionSelectState = this.updateCaptionSelectState.bind(this);
        this.downloadMedia = this.downloadMedia.bind(this);
        this.setMediaFile = this.setMediaFile.bind(this);
        this.uploadMediaFile = this.uploadMediaFile.bind(this);
        this.openCaptionModalContent = this.openCaptionModalContent.bind(this);
        this.getModalStyle = this.getModalStyle.bind(this);
        this.setConverterButtons = this.setConverterButtons(this);
    }

    componentDidMount() {
        this.setState({
            ytdlConvertDisabled: this.props.media_type

        });
    }

    getModalStyle() {
        const top = 50;
        const left = 50;
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    handleOpen() {
        this.setState({
            temp_id: uuidv1(),
            setOpen: true,
            open: true
        });
    };

    handleClose() {
        this.setState({
            setOpen: false,
            open: false
        });
    };

    handleCustomModalOpen() {
        this.setState({
            customModalOpen: true
        });
    }

    handleCustomModalClose() {
        this.setState({
            customModalOpen: false
        });
    }

    handleUrlChange(event) {
        this.setState({customUrl: event.target.value});
    }

    handleCustomSubmit(format) {
        const {customUrl} = this.state;
        if (customUrl) {
            const media_id = uuidv1(); // Generate or get the appropriate media_id
            this.props.dispatch(sendVideoExtractRequestDeferred(media_id, customUrl, format));
            this.setState({
                customModalOpen: false,
                customUrl: ""
            });
        }
    }

    updateMediaSelectState(event) {
        let file_type = event.label.split('.').pop();
        this.setState({
            media_select: event
        });

        if (file_type === 'mp4' ||
            file_type === 'mov' ||
            file_type === 'wmv' ||
            file_type === 'avi' ||
            file_type === 'mpg' ||
            file_type === 'mpeg') {

            this.setState({
                videoConvertDisabled: false,
                audioConvertDisabled: false,
                OcDisabled: true,
                s3linkDisabled: false
            });

            if (Object.keys(this.props.captionFiles).length > 0) {
                this.setState({
                    OcDisabled: false,
                });
            }
        }

        if (file_type === 'm4a' || file_type === 'mp3' || file_type === 'wav' || file_type === 'wma') {
            this.setState({
                audioConvertDisabled: false,
                videoConvertDisabled: true,
                OcDisabled: true,
                s3linkDisabled: false
            });
        }
    }

    updateCaptionSelectState(event) {
        this.setState({
            captionSelect: event
        });
    }

    // Convert
    convertVideoToMp4() {
        this.props.dispatch(sendVideoConversionRequestDeferred(this.state.media_select.value, this.props.mediaId, 'convert-video'));
    }

    extractAudioFromVideo() {
        this.props.dispatch(sendVideoConversionRequestDeferred(this.state.media_select.value, this.props.mediaId, 'extract-audio'));
    }

    convertAudioToM4a() {
        this.props.dispatch(sendVideoConversionRequestDeferred(this.state.media_select.value, this.props.mediaId, 'extract-audio'));
    }

    // YouTubeDL
    extractVideoYTDL() {
        if (this.props.media.media_type === 'URL') {
            this.props.dispatch(sendVideoExtractRequestDeferred(this.props.mediaId, this.props.media.source_url, 'mp4'));
        }
    }

    extractAudioYTDL() {
        if (this.props.media.media_type === 'URL') {
            this.props.dispatch(sendVideoExtractRequestDeferred(this.props.mediaId, this.props.media.source_url, 'm4a'));
        }
    }

    // S3 Link
    getS3Link(event) {
        this.setState({
            s3Resources: event
        });
        this.props.dispatch(getS3Link(this.state.media_select.value));
    }

    // Open Caption
    createOpenCaption() {
        this.props.dispatch(sendOpenCaptionRequestDeferred(this.props.mediaId,
            this.state.media_select.value, this.state.captionSelect.caption_id));
    }

    // Download / Upload
    downloadMedia() {
        this.props.dispatch(downloadMediaFile(this.state.media_select.value, this.props.mediaId));
    }

    setMediaFile(event) {
        document.getElementById('mediaFileUpload').click();
        document.getElementById('mediaFileUpload').onchange = () => {
            let fileReader = new FileReader();

            fileReader.onload = (completionEvent) => {
                let slicedFile = fileReader.result.slice(0, 1024);
                let wordArray = CryptoJS.lib.WordArray.create(slicedFile);
                let fileHash = CryptoJS.SHA256(wordArray).toString();

                this.setState({
                    sha_256_hash: fileHash,
                });
            };

            fileReader.readAsArrayBuffer(document.getElementById('mediaFileUpload').files[0]);
            let type = document.getElementById('mediaFileUpload').files[0].type;
            let blobFile = new Blob([document.getElementById('mediaFileUpload').files[0]], {type: type});
            this.setState({
                mediaFileUpload: blobFile,
                content_type: type,
                media_temp_id: uuidv1()
            });
        }
    }

    uploadMediaFile(event) {
        this.props.dispatch(uploadMediaFromJobView(this.state.mediaFileUpload, this.props.mediaId, this.state.cap_temp_id, this.state.content_type, this.state.sha_256_hash));
        this.setState({
            mediaFileUpload: "",
            content_type: ""
        });
    }

    setConverterButtons() {
        if (this.state.media_select !== '') {
            this.setState({
                videoConvertDisabled: false
            });
        }
    }

    openCaptionModalContent() {
        return (<div style={this.state.modalStyle} className={this.props.classes.paper}>
            <Select name="rate" options={this.props.captionFiles} value={this.state.captionSelect}
                    onChange={this.updateCaptionSelectState}>
            </Select>
            <Button disabled={false} name={"extract_video"} size={"small"} onClick={this.createOpenCaption}>Create Open
                Caption</Button>
        </div>);
    }

    render() {
        let downloadMediaDisabled = this.state.media_select === '';

        return (
            <div className={"videoFileControlsContainer"}>
                <label className="capJobMediaContentContainer">
                    <div className="mediaContentDescriptor">
                        <label style={{'margin-right': '8px'}}>Videos:</label>
                        <Select
                            style={{border_radius: "6px", width: "50px"}}
                            name="s3_links"
                            onChange={this.updateMediaSelectState}
                            styles={s3ResourceSelect}
                            value={this.state.media_select}
                            options={this.props.s3Resources}
                        />
                    </div>
                </label>
                <div className={"extractorButtonsContainer"}>
                    <label style={{'margin-right': '8px'}}>FFmpeg:</label>
                    <div><Button classes={{root: useStyles.padding}} disabled={this.state.audioConvertDisabled}
                                 name={"extract_audio"} size={"small"} onClick={this.extractAudioFromVideo}>m4a</Button>
                    </div>
                    <div><Button disabled={this.state.videoConvertDisabled} name={"extract_video"} size={"small"}
                                 onClick={this.convertVideoToMp4}>mp4</Button></div>
                    <div><Button disabled={this.state.OcDisabled} name={"open_caption"} size={"small"}
                                 onClick={this.handleOpen}>OC</Button><Modal open={this.state.open}
                                                                             onClose={this.handleClose}
                                                                             aria-labelledby="simple-modal-title"
                                                                             aria-describedby="simple-modal-description">{this.openCaptionModalContent()}</Modal>
                    </div>
                </div>
                <div className={"extractorButtonsContainer"}>
                    <label style={{'margin-right': '33px'}}>YTdl:</label>
                    <div><Button classes={{root: useStyles.padding}} disabled={this.state.ytdlConvertDisabled}
                                 name={"extract_audio_ytl"} size={"small"} onClick={this.extractAudioYTDL}>m4a</Button>
                    </div>
                    <div><Button disabled={this.state.ytdlConvertDisabled} name={"extract_video_ytl"} size={"small"}
                                 onClick={this.extractVideoYTDL}>mp4</Button></div>
                    <div><Button name={"custom"} size={"small"} onClick={this.handleCustomModalOpen}>Custom</Button>
                        <Modal open={this.state.customModalOpen} onClose={this.handleCustomModalClose}>
                            <div style={this.getModalStyle()} className={this.props.classes.paper}>
                                <h2>Enter Video URL</h2>
                                <TextField
                                    label="Video URL"
                                    value={this.state.customUrl}
                                    onChange={this.handleUrlChange}
                                    fullWidth
                                />
                                <div style={{marginTop: '20px'}}>
                                    <Button onClick={() => this.handleCustomSubmit('m4a')}>Extract Audio (m4a)</Button>
                                    <Button onClick={() => this.handleCustomSubmit('mp4')}>Extract Video (mp4)</Button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
                <div className={"extractorButtonsContainer"}>
                    <label style={{'margin-right': '37px'}}>Links:</label>
                    <div><Button classes={{root: useStyles.padding}} disabled={this.state.s3linkDisabled}
                                 name={"s3_link"} size={"small"} onClick={this.getS3Link}>S3 Link</Button></div>
                </div>
                <div style={{'margin-top': '5px'}} className={"extractorButtonsContainer"}>
                    <label style={{'margin-right': '37px'}}>DL:</label>
                    <div>
                        <label style={{display: "block", fontSize: '12px', textAlign: "center"}}
                               form={"media_select"}>Download</label>
                        <Button style={{marginRight: "4px"}} disabled={downloadMediaDisabled}
                                onClick={this.downloadMedia}><GetAppIcon fontSize="small"/></Button>
                        <input id='mediaFileUpload' type='file' accept="video/*, audio/*" hidden={true}/>
                    </div>
                    <div>
                        <label style={{display: "block", fontSize: '12px', textAlign: "center"}}
                               form={"media_select"}>Upload</label>
                        {this.state.mediaFileUpload === "" &&
                            <Button onClick={this.setMediaFile}><PublishIcon color="primary"
                                                                             fontSize="small"/></Button>}
                        {this.state.mediaFileUpload !== "" &&
                            <Button onClick={this.uploadMediaFile}><PublishIcon style={{color: green[500]}}
                                                                                fontSize="small"/></Button>}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({loadingStatusReducer, errorsReducer, mediaReducer,}, {mediaId}) {
    let media = mediaReducer[mediaId];
    let fileObject = null;
    let download_url = null;
    let s3Resources;
    let captionFiles;
    let media_type = true;

    if (media !== undefined) {
        if (media.media_type === 'File') {
            fileObject = media.media_objects.find(item => {
                return item.associated_files.sha_256_hash === media.sha_256_hash;
            });
        }

        if (media.media_type === 'URL') {
            media_type = false;
        }

        if (fileObject) {
            let endpoint = fileDownloadUrl();
            download_url = `${endpoint}?media_id=${media.id}`;
        }

        if (Object.keys(mediaReducer).length > 0) {
            media = mediaReducer[mediaId];

            s3Resources = mediaReducer[mediaId].media_objects.reduce((accumulator, currentValue) => {
                if (currentValue.associated_files !== null) {
                    accumulator.push({
                        value: currentValue.associated_files.id,
                        label: currentValue.associated_files.file_name,
                    });
                }
                return accumulator;
            }, []);
        }

        if (Object.keys(mediaReducer).length > 0) {
            media = mediaReducer[mediaId];

            captionFiles = mediaReducer[mediaId].media_objects.reduce((accumulator, currentValue) => {
                if (currentValue.associated_captions !== null) {
                    accumulator.push({
                        caption_id: currentValue.associated_captions.id,
                        value: currentValue.associated_captions.file_name,
                        label: currentValue.associated_captions.file_name,
                        association_id: currentValue.id
                    });
                }
                return accumulator;
            }, []);
        }

        console.log("s3 resources ", s3Resources);
    }

    return {
        media,
        fileObject,
        download_url,
        mediaId,
        s3Resources,
        captionFiles,
        media_type
    }
}

export default withRouter(connect(mapStateToProps)(withStyles(useStyles, {withTheme: true})(VideoFileControlsContainer)));
