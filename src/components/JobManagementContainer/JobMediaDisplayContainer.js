import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";

import CaptionResourceContainer from './captionResourceContainer'
import VideoFileControlsContainer from './videoFileControlsContainer'
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import IconButton from '@material-ui/core/IconButton'
import Select from "react-select";
import {captionResourceSelectCustomStyles, s3ResourceSelect} from "./selectCustomStyle";
import {getS3Link} from "../../actions/ampApi/putData"
import FlashAutoIcon from '@material-ui/icons/FlashAuto';
import MediaContentContainer from "./jobMediaContentContainer";

class JobMediaDisplayContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            captioned_url: "Not Set",
        };

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
                <div style={{display: "flex"}}>
                    <div className={"captionMediaContainerLeft"}>
                        <div className="capJobMediaContentContainer">
                            <div tabIndex={0} className="mediaContentDescriptor">
                                <label style={{'margin-right': '25px'}}>
                                    Title:
                                </label>
                                <div>
                                    {this.state.title}
                                </div>
                            </div>
                        </div>
                        <div className="capJobMediaContentContainer">
                            <div tabIndex={0} className="mediaContentDescriptor">
                                {this.props.media.media_type === 'File' && (<label style={{'margin-right': '10px'}}>Source: </label>)}
                                {this.props.media.media_type === 'File' && <a href={this.props.download_url}>{this.props.fileObject.associated_files.file_name}</a>}

                                {this.props.media.media_type === 'URL' && (<div><label style={{'margin-right': '10px'}}>Source: </label></div>)}
                                {this.props.media.media_type === 'URL' && (<div className={"sourceUrlLink"}><a target="_blank" href={this.state.source_url}>{this.state.source_url}</a></div>)}
                            </div>

                        </div>
                        <div className="capJobMediaContentContainer">
                            <label className="capJobMediaContentContainer">
                                <div className="mediaContentDescriptor">
                                    <label style={{'margin-right': '8px'}}>Output:</label>
                                    <CaptionResourceContainer media_id={this.props.mediaId}/>
                                </div>
                            </label>


                        </div>
                        <div className="joMediaContentContainer">
                            <MediaContentContainer mediaId={this.props.mediaId}/>

                        </div>
                    </div>

                    <VideoFileControlsContainer mediaId={this.props.mediaId}/>


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


    return {
        media,
        fileObject,
        download_url,
        mediaId,
        s3Resources
    }
}

export default withRouter(connect(mapStateToProps)(JobMediaDisplayContainer))