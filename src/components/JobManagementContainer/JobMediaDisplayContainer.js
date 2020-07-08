import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {fileDownloadUrl} from '../../constants'
import CaptionResourceContainer from './captionResourceContainer'

class JobMediaDisplayContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            captioned_url: "Not Set"

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
                <div>
                    <form>
                        <div className="capJobMediaContentContainer">
                            <div tabIndex={0} className="mediaContentDescriptor">
                                Title: {this.state.title}
                            </div>

                        </div>
                        <div className="capJobMediaContentContainer">
                            <div tabIndex={0} className="mediaContentDescriptor">
                                {this.props.media.media_type === 'File' && "Source File: "}{this.props.media.media_type === 'File' && <a href={this.props.download_url}>{this.props.fileObject.associated_files.file_name}</a>}
                                {this.props.media.media_type === 'URL' && "Source URL: "}{this.props.media.media_type === 'URL' && <a href={this.state.source_url}>{this.state.source_url}</a>}

                            </div>

                        </div>
                        <div className="capJobMediaContentContainer">
                            <label className="capJobMediaContentContainer">
                                <div className="mediaContentDescriptor">
                                    Captioned URL:
                                </div>
                                {/*<CaptionResourceContainer media_id={this.props.mediaId}/>*/}
                            </label>
                        </div>
                    </form>
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