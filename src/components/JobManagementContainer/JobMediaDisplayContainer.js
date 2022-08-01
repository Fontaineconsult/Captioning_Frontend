import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import CaptionResourceContainer from './captionResourceContainer'

import MediaContentContainer from "./jobMediaContentContainer";

class JobMediaDisplayContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            captioned_url: "Not Set",
            file_url: "",
            file_name: ""

        };

    }


    componentDidMount() {
        this.setState({
            captioned_url: this.props.media.captioned_url,
            title: this.props.media.title,
            source_url: this.props.media.source_url,
            file_url: this.props.file_url,
            file_name: this.props.file_name
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
                                <div className="contentTitle">
                                    {this.state.title}
                                </div>
                            </div>
                        </div>
                        <div className="capJobMediaContentContainer">
                            <div tabIndex={0} className="mediaContentDescriptor">
                                {this.props.media.media_type === 'File' && (
                                    <label style={{'margin-right': '10px'}}>Source: </label>)}
                                {this.props.media.media_type === 'File' && (
                                    <div className={"sourceUrlLink"}><a target="_blank"
                                                                        href={this.props.file_url}>{this.props.file_name}</a>
                                    </div>)}

                                {this.props.media.media_type === 'URL' && (
                                    <div><label style={{'margin-right': '10px'}}>Source: </label></div>)}
                                {this.props.media.media_type === 'URL' && (
                                    <div className={"sourceUrlLink"}><a target="_blank"
                                                                        href={this.state.source_url}>{this.state.source_url}</a>
                                    </div>)}
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


                </div>
            </div>
        )

    }

}


function mapStateToProps({loadingStatusReducer, errorsReducer, mediaReducer}, {mediaId}) {
    let media = mediaReducer[mediaId]
    let fileObject = null
    let download_url = null
    let file_name = null
    let file_url = null

    let s3Resources
    if (media.media_type === 'File') {
        fileObject = media.media_objects.find(item => {
            return item.associated_files.sha_256_hash === media.sha_256_hash

        })

        let temp_array = media.media_objects
        temp_array.some((e) => {
            if (e.associated_files != null) {
                file_name = e.associated_files.file_name;
                file_url = e.associated_files.object_url;

                return;
            }
        })
    }

    console.log(file_name)
    console.log(file_url)

    return {
        media,
        fileObject,
        download_url,
        mediaId,
        s3Resources,
        file_name,
        file_url
    }
}

export default withRouter(connect(mapStateToProps)(JobMediaDisplayContainer))