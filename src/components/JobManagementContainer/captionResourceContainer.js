import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Select from "react-select";
import {captionResourceSelectCustomStyles} from "./selectCustomStyle";
import {updateMedia} from "../../actions/ampApi/putData"
import {addCaptionedResource} from "../../actions/ampApi/postData"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";


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


class CaptionResourceContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            captioned_url: this.props.primaryCapResource,
            captionResources: this.props.captionResources,
            newCapResource: '',
            setOpen: false,
            open: false,
            modalStyle: this.getModalStyle(),

        };

        this.updatePrimaryCapResource = this.updatePrimaryCapResource.bind(this)
        this.addCapResource = this.addCapResource.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.addCaptionResourceContent = this.addCaptionResourceContent.bind(this)
        this.getModalStyle = this.getModalStyle.bind(this)
        this.updateNewCaptionInput = this.updateNewCaptionInput.bind(this)

    }


    updateNewCaptionInput(event) {
        console.log("EVENT", event.target.value)
        this.setState({
            newCapResource: event.target.value
        });


    }

    addCapResource() {

        this.props.dispatch(addCaptionedResource(this.props.media_id, this.state.newCapResource))
    }

    updatePrimaryCapResource(event) {
        console.log("EVENT", event)
        this.setState({
            captioned_url: event
        });

        this.props.dispatch(updateMedia(this.props.media_id, "primary_caption_resource_id", event.value))
    }

    componentDidMount() {

        this.setState({
            captioned_url: this.props.primaryCapsource
        })

    }


    getModalStyle() {
        const top = 50
        const left = 50
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    handleOpen() {

        this.setState({
            setOpen: true,
            open: true
        })
    };

    handleClose() {
        this.setState({
            setOpen: false,
            open: false
        })

    };

    addCaptionResourceContent() {

        return (<div style={this.state.modalStyle} className={this.props.classes.paper}>
            <input type="text" name="newCapResource" value={this.state.newCapResource}
                   onChange={this.updateNewCaptionInput}>
            </input>
            <Button disabled={false} name={"extract_video"} size={"small"} onClick={this.addCapResource}>Add Cap
                Resource</Button>
        </div>)

    }

    render() {

        return (
            <div className="caption_resource_container">
                <div>
                    <Select
                        style={{width: "300px"}}
                        name="primary_caption"
                        onChange={this.updatePrimaryCapResource}
                        styles={captionResourceSelectCustomStyles}
                        value={this.state.captioned_url}
                        options={this.props.captionResources
                        }/>
                </div>
                <div className={"addCapResource"}>

                    <Button disabled={false} name={"extract_video"} size={"small"}
                            onClick={this.handleOpen}><AddCircleIcon/>
                    </Button><Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    onClose={this.handleClose}
                    open={this.state.open}>{this.addCaptionResourceContent()}</Modal>
                </div>
            </div>
        )
    }

}

function mapStateToProps({loadingStatusReducer, errorsReducer, mediaReducer}, {media_id}) {
    let media
    let captionResources
    let primaryCapResource

    if (loadingStatusReducer.mediaLoading === false) {

        media = mediaReducer[media_id]
        captionResources = mediaReducer[media_id].captioned_resources.reduce((accumulator, currentValue) => {

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

        if (media.primary_caption_resource_id !== null) {
            primaryCapResource = mediaReducer[media_id].captioned_resources.map(item => {
                if (item.id === media.primary_caption_resource_id) {
                    if (item.amara_id !== null) {
                        return {
                            value: item.id,
                            label: <a target="_blank" href={item.amara_resource.url}>{item.amara_resource.url}</a>
                        }
                    }
                    if (item.s3_file_id !== null) {
                        return {
                            value: item.id,
                            label: <a target="_blank"
                                      href={item.s3_file_resource.object_url}>{item.s3_file_resource.file_name}</a>
                        }
                    }
                    if (item.other_id !== null) {
                        return {
                            value: item.id,
                            label: <a target="_blank"
                                      href={item.other_resource.source_link}>{item.other_resource.source_link}</a>
                        }
                    }


                }
            })

        }

    }
    console.log("ZOPRS", captionResources)
    return {
        media,
        captionResources,
        media_id,
        mediaReducer,
        primaryCapResource
    }
}

export default withRouter(connect(mapStateToProps)(withStyles(useStyles, {withTheme: true})(CaptionResourceContainer)))