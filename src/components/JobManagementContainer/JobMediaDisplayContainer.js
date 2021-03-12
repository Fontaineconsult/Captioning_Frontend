import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {fileDownloadUrl} from '../../constants'
import {sendVideoExtractRequestDeferred} from '../../actions/ampApi/postData'
import CaptionResourceContainer from './captionResourceContainer'
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import IconButton from '@material-ui/core/IconButton'


class JobMediaDisplayContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            captioned_url: "Not Set"
        };
        this.extractAudio = this.extractAudio.bind(this)
        this.extractVideo = this.extractVideo.bind(this)
    }

    extractAudio() {
        if (this.props.media.media_type === 'URL') {
            this.props.dispatch(sendVideoExtractRequestDeferred(this.props.mediaId, this.state.source_url, 'm4a'))
        }
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

    if (media.media_type === 'File') {
        fileObject =  media.media_objects.find(item => {
            return item.associated_files.sha_256_hash === media.sha_256_hash

        })
    }

    if (fileObject) {
        let endpoint = fileDownloadUrl()
        download_url = `${endpoint}?media_id=${media.id}`
    }

    return {
        media,
        fileObject,
        download_url,
        mediaId
    }
}

export default withRouter(connect(mapStateToProps)(JobMediaDisplayContainer))