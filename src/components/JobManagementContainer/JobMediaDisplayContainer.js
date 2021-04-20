import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {fileDownloadUrl} from '../../constants'
import {sendVideoExtractRequestDeferred} from '../../actions/ampApi/postData'
import CaptionResourceContainer from './captionResourceContainer'
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import IconButton from '@material-ui/core/IconButton'
import Select from "react-select";
import {captionResourceSelectCustomStyles, s3ResourceSelect} from "./selectCustomStyle";
import {getS3Link} from "../../actions/ampApi/putData"
import FlashAutoIcon from '@material-ui/icons/FlashAuto';

class JobMediaDisplayContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            captioned_url: "Not Set",
            s3Resources: ""
        };
        this.extractAudio = this.extractAudio.bind(this)
        this.extractVideo = this.extractVideo.bind(this)
        this.getS3Link = this.getS3Link.bind(this)
    }

    extractAudio() {
        if (this.props.media.media_type === 'URL') {
            this.props.dispatch(sendVideoExtractRequestDeferred(this.props.mediaId, this.state.source_url, 'm4a'))
        }
    }

    getS3Link(event) {
        this.setState({
            s3Resources: event
        });
        this.props.dispatch(getS3Link(event.value))

    }

    extractVideo() {

        if (this.props.media.media_type === 'URL') {
            this.props.dispatch(sendVideoExtractRequestDeferred(this.props.mediaId, this.state.source_url, 'mp4'))
        }
    }


    componentDidMount() {
        this.setState({
            captioned_url:this.props.media.captioned_url,
            title:this.props.media.title,
            source_url:this.props.media.source_url
        })
    }


    render() {
        return (
            <div className="capJobMediaContainer">
                <div>
                        <div className="capJobMediaContentContainer">
                            <div tabIndex={0} className="mediaContentDescriptor">
                                <label style={{'margin-right': '80px'}}>
                                    Title:
                                </label>
                                <div>
                                    {this.state.title}
                                </div>
                            </div>

                        </div>
                        <div className="capJobMediaContentContainer">
                            <div tabIndex={0} className="mediaContentDescriptor">
                                {this.props.media.media_type === 'File' && (<label style={{'margin-right': '32px'}}>Source File: </label>)}
                                {this.props.media.media_type === 'File' && <a href={this.props.download_url}>{this.props.fileObject.associated_files.file_name}</a>}

                                {this.props.media.media_type === 'URL' && (<div><label style={{'margin-right': '32px'}}>Source URL: </label></div>)}
                                {this.props.media.media_type === 'URL' && (<div className={"sourceUrlLink"}><a target="_blank" href={this.state.source_url}>{this.state.source_url}</a></div>)}
                            </div>

                            <div className={"extractorButtonsContainer"}>
                                <div className={"extractorButton"}><div className={"extractorLabel"}>m4a</div><IconButton disabled={false} name={"extract_video"} size={"small"} onClick={this.extractAudio}><SettingsEthernetIcon fontSize={"small"}/></IconButton></div>
                                <div className={"extractorButton"}><div className={"extractorLabel"}>mp4</div><IconButton disabled={false} name={"extract_video"} size={"small"} onClick={this.extractVideo}><SettingsEthernetIcon fontSize={"small"}/></IconButton></div>
                            </div>
                        </div>
                        <div className="capJobMediaContentContainer">
                            <label className="capJobMediaContentContainer">
                                <div className="mediaContentDescriptor">
                                    <label style={{'margin-right': '8px'}}>Captioned URL:</label>
                                    <CaptionResourceContainer media_id={this.props.mediaId}/>
                                </div>



                            </label>
                            <label className="capJobMediaContentContainer">
                                <div className="mediaContentDescriptor" style={{'margin-right': '0px','margin-left': 'auto' }}>
                                    <label style={{'margin-right': '8px'}}>S3 Link:</label>
                                    <Select
                                        style={{width: "50px"}}
                                        name="s3_links"
                                        onChange={this.getS3Link}
                                        styles={s3ResourceSelect}
                                        value={this.state.s3Resources}
                                        options={this.props.s3Resources}
                                    />
                                </div>

                            </label>

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

    return {
        media,
        fileObject,
        download_url,
        mediaId,
        s3Resources
    }
}

export default withRouter(connect(mapStateToProps)(JobMediaDisplayContainer))