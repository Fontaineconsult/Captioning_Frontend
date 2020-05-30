import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Select from "react-select";
import {customStyles} from "./selectCustomStyle";
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from "@material-ui/core/Button";
import {downloadCaptionFile} from '../../actions/ampApi/fetchData'
import { saveAs } from 'file-saver';


class MediaContentContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            captionFiles: this.props.captionFiles,
            captionSelectValue: '',
            mediaFiles: []

        };

        this.downloadCaption = this.downloadCaption.bind(this)
        this.updateState = this.updateState.bind(this)
    }

    downloadCaption(event) {
        // saveAs('http://localhost:5000/api/v2/captioning/services/download/caption?item_id=6&media_id=826', "test.srt")
        console.log(this.state.captionSelectValue)
        //
        this.props.dispatch(downloadCaptionFile(this.state.captionSelectValue.caption_id, this.props.mediaId))

    }


    updateState(event){

        console.log(event)
        this.setState({
            captionSelectValue: event
        });

    }

    render() {
        console.log(this.state.captionFiles)
        return (
            <div className="mediaContentContainer">
                <Select
                    name="caption_select"
                    onChange={this.updateState}
                    styles={customStyles}
                    value={this.state.captionSelectValue}
                    options={this.state.captionFiles
                    }/>
               <Button onClick={this.downloadCaption}><GetAppIcon/></Button>
            </div>

        )
    }
}


function mapStateToProps({loadingStatusReducer, errorsReducer, mediaReducer}, {mediaId}) {

    let captionFiles = mediaReducer[mediaId].media_objects.reduce((accumulator, currentValue) => {
        if (currentValue.associated_captions !== null) {
            accumulator.push({caption_id:currentValue.associated_captions.id, value:currentValue.associated_captions.file_name, label:currentValue.associated_captions.file_name, association_id:currentValue.id})
        }
        return accumulator
    },[])
    let mediaFiles = mediaReducer[mediaId].media_objects.reduce((accumulator, currentValue) => {
        if (currentValue.associated_files !== null) {
            accumulator.push({file_id:currentValue.associated_files.id, value:currentValue.associated_files.file_name, label:currentValue.associated_files.file_name, association_id:currentValue.id})
        }
        return accumulator
    },[])


    return {
        captionFiles,
        mediaFiles,
        mediaReducer,
        mediaId

    }
}

export default withRouter(connect(mapStateToProps)(MediaContentContainer))