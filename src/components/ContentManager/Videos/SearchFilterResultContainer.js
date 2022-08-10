import React, {Component} from 'react';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css';
import "../../../css/searchFilter.css"
import Select from "react-select";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";
import withRouter from "react-router-dom/es/withRouter";
import {connect} from "react-redux";
import {getS3Link} from "../../../actions/ampApi/putData";
import {downloadCaptionFile} from "../../../actions/ampApi/fetchData";
import {uploadCaptionFileWithMediaId, uploadMediaFromJobView} from "../../../actions/ampApi/postData";
import {v1 as uuidv1} from "uuid";
import green from "@material-ui/core/colors/green";
import CryptoJS from "crypto-js";


class SearchFilterResultContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            source_url: this.props.source_url,
            media_id: this.props.media_id,
            reducer: this.props.reducer,
            caption_select: "",
            output_select: "",
            video_select: "",
            video_label: "",
            video_selected_id: 0,
            capFileUpload: "",
            cap_temp_id: "",
            mediaFileUpload: "",
            media_temp_id: "",
            sha_256_hash: "",
            isCapDownBtnDisabled: true,
            isVideoDownBtnDisabled: true
        };

        this.getData = this.getData.bind(this)
        this.updateCapSelectState = this.updateCapSelectState.bind(this)
        this.updateVideoSelectState = this.updateVideoSelectState.bind(this)
        this.updateOutputSelectState = this.updateOutputSelectState.bind(this)
        this.downloadCaption = this.downloadCaption.bind(this)
        this.downloadVideo = this.downloadVideo.bind(this)
        this.uploadCaption = this.uploadCaption.bind(this)
        this.uploadVideo = this.uploadVideo.bind(this)
        this.setCaptionFile = this.setCaptionFile.bind(this)
        this.setMediaFile = this.setMediaFile.bind(this)


    }


    jobFocusedStyle() {
        return (
            {
                "background": "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 74%," +
                    "rgba(237,235,235,1) 95%, rgba(207,207,207,1) 98%, rgba(148,148,148,1) 100%)"

            }
        )
    }

    getData() {
        let data = []

        let reducer = this.state.reducer;
        let media_id = this.state.media_id
        let formatData = (content) => {
            return {
                title: content.title,
                source_url: content.source_url,
                captioned_resources: content.captioned_resources,
                media_objects: content.media_objects

            }
        }

        if (Object.keys(reducer).length > 0) {
            Object.keys(reducer).forEach(function (key) {

                if (key == media_id) {
                    data.push(formatData(reducer[key]))
                }
            });
        }

        return data
    }

    //
    downloadVideo() {

        if (this.state.video_select.value != undefined) {
            console.log("video id ", this.state.video_select.value)
            this.props.dispatch(getS3Link(this.state.video_select.value, this.state.video_select.label))

        }
    }

    uploadVideo() {
        this.props.dispatch(uploadMediaFromJobView(this.state.mediaFileUpload, this.state.media_id, this.state.cap_temp_id, this.state.content_type, this.state.sha_256_hash))
        this.setState({
            mediaFileUpload: "",
            content_type: ""
        })

    }

    downloadCaption() {
        this.props.dispatch(downloadCaptionFile(this.state.caption_select.caption_id, this.state.media_id))
        this.setState({
            capFileUpload: ""
        })

    }

    uploadCaption() {
        this.props.dispatch(uploadCaptionFileWithMediaId(this.state.capFileUpload, this.state.media_id, this.state.cap_temp_id))

    }

    updateCapSelectState(event) {
        this.setState({
            caption_select: event,
            isCapDownBtnDisabled: false
        });
    }

    updateOutputSelectState(event) {
        this.setState({
            output_select: event
        });
    }

    updateVideoSelectState(event) {
        this.setState({
            video_select: event,
            isVideoDownBtnDisabled: false
        });
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

    setMediaFile(event) {

        document.getElementById('mediaFileUpload').click();
        document.getElementById('mediaFileUpload').onchange = () => {

            let fileReader = new FileReader()

            fileReader.onload = (completionEvent) => {
                let slicedFile = fileReader.result.slice(0, 1024)
                let wordArray = CryptoJS.lib.WordArray.create(slicedFile)
                let fileHash = CryptoJS.SHA256(wordArray).toString()

                this.setState({
                    sha_256_hash: fileHash,
                })

            }


            fileReader.readAsArrayBuffer(document.getElementById('mediaFileUpload').files[0])

            let type = document.getElementById('mediaFileUpload').files[0].type
            let blobFile = new Blob([document.getElementById('mediaFileUpload').files[0]], {type: type})
            this.setState({
                mediaFileUpload: blobFile,
                content_type: type,
                media_temp_id: uuidv1()
            });
        }

    }

    render() {
        let data = this.getData()

        let captionFiles = data[0].media_objects.reduce((accumulator, currentValue) => {
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
        let outputFiles = data[0].captioned_resources.reduce((accumulator, currentValue) => {

            console.log("Current value", currentValue)

            if (currentValue.amara_id !== null) {
                accumulator.push({
                    value: currentValue.id,
                    label: currentValue.amara_resource.url,
                })

            }
            if (currentValue.s3_file_id !== null) {
                accumulator.push({
                    value: currentValue.id,
                    label: currentValue.s3_file_resource.file_name,
                })


            }
            if (currentValue.other_id !== null) {
                accumulator.push({
                    value: currentValue.id,
                    label: currentValue.other_resource.source_link,
                })
            }

            return accumulator
        }, [])
        let videoFiles = data[0].media_objects.reduce((accumulator, currentValue) => {
            if (currentValue.associated_files !== null) {

                accumulator.push({
                    value: currentValue.associated_files.id,
                    label: currentValue.associated_files.file_name,
                })
            }


            return accumulator
        }, [])

        return (
            <div>
                <div className="job-container-search masterListItemSearch" style={this.jobFocusedStyle()} tabIndex={0}
                     onBlur={this.clearFocus}>
                    <div className="inner-container-left">
                        <div className={"text-container"}>
                            <label className={"title"}>Title: </label>
                            <label className={"title"}>{data[0].title}</label>
                        </div>
                        <div className={"source-caption-container"}>
                            <div className={"source-container"}>
                                <div style={{"display": "flex"}}>
                                    <label className={"label"}>Source: </label>
                                    <a
                                        className={"description"} href={data[0].source_url}>{data[0].source_url}</a>
                                </div>
                            </div>

                            <div className={"caption-master-container"}>
                                <div className={"caption-container"}>
                                    <label className={"label"}>Caption Files: </label>
                                    <Select
                                        className={"caption-selector"}
                                        name="caption_select"
                                        value={this.state.caption_select}
                                        onChange={this.updateCapSelectState}
                                        options={captionFiles}
                                    />
                                </div>

                                <div className={"upload-download-video"}>
                                    <div>
                                        <label style={{display: "block", fontSize: '12px', textAlign: "center"}}
                                        >Download</label>
                                        <Button onClick={this.downloadCaption}
                                                disabled={this.state.isCapDownBtnDisabled}><GetAppIcon
                                            fontSize="small"/></Button>
                                        <input id='captionUpload' type='file' accept="text/*" hidden={true}/>
                                    </div>
                                    <div>
                                        <div>
                                            <label style={{display: "block", fontSize: '12px', textAlign: "center"}}
                                            >Upload</label>
                                            {/*<Button onClick={this.uploadCaption}><PublishIcon*/}
                                            {/*    fontSize="small"/></Button>*/}
                                            {this.state.capFileUpload === "" &&
                                                <Button onClick={this.setCaptionFile}><PublishIcon color="primary"
                                                                                                   fontSize="small"/></Button>}
                                            {this.state.capFileUpload !== "" &&
                                                <Button onClick={this.uploadCaption}><PublishIcon
                                                    style={{color: green[500]}}
                                                    fontSize="small"/></Button>}
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className={"search-lower-container"}>
                            <div className={"output-dropdown"}>
                                <label className={"label"}>Output Files: </label>
                                <Select
                                    name="output_select"
                                    value={this.state.output_select}
                                    className={"output-selector"}
                                    onChange={this.updateOutputSelectState}
                                    options={outputFiles}

                                />
                            </div>

                            <div className={"video-container"}>
                                <div className={"video-dropdown"}>
                                    <label className={"label"}>Video Files: </label>
                                    <Select
                                        name="video_select"
                                        className={"video-selector"}
                                        onChange={this.updateVideoSelectState}
                                        value={this.state.video_select}
                                        options={videoFiles}
                                    />
                                </div>

                                <div className={"upload-download-video"}>
                                    <div>
                                        <label style={{display: "block", fontSize: '12px', textAlign: "center"}}
                                        >Download</label>
                                        <Button onClick={this.downloadVideo}
                                                disabled={this.state.isVideoDownBtnDisabled}><GetAppIcon
                                            fontSize="small"/></Button>
                                        <input id='mediaFileUpload' type='file' accept="video/*, audio/*"
                                               hidden={true}/>
                                    </div>
                                    <div>
                                        <div>
                                            <label style={{display: "block", fontSize: '12px', textAlign: "center"}}
                                            >Upload</label>
                                            {this.state.mediaFileUpload === "" &&
                                                <Button onClick={this.setMediaFile}><PublishIcon color="primary"
                                                                                                 fontSize="small"/></Button>}
                                            {this.state.mediaFileUpload !== "" &&
                                                <Button onClick={this.uploadVideo}><PublishIcon
                                                    style={{color: green[500]}}
                                                    fontSize="small"/></Button>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={"inner-container-right"}>

                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(
    {
        loadingStatusReducer, mediaReducer
    }
) {
    return {
        mediaReducer,
        loadingStatusReducer
    }
}

export default withRouter(connect(mapStateToProps)(SearchFilterResultContainer))