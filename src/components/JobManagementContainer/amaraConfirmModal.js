import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import {v1 as uuidv1} from 'uuid';
import Select from "react-select";
import {customStyles} from "./selectCustomStyle";
import {addSRTtoAmaraResource, createAmaraResource} from "../../actions/ampApi/postData"


const useStyles = theme => ({
    paper: {
        position: 'absolute',
        width: 800,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});


class AmaraModalContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            caption_select: '',
            media_select: '',
            temp_id: '',
            setOpen: false,
            modalStyle: this.getModalStyle(),
            mediaFiles: this.props.mediaFiles,
            captionFiles: this.props.captionFiles,
            isCreateButtonEnabled: true,


        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getModalStyle = this.getModalStyle.bind(this);
        this.modalContent = this.modalContent.bind(this)
        this.createAmaraResource = this.createAmaraResource.bind(this)
        this.addSRTtoAmaraResource = this.addSRTtoAmaraResource.bind(this)
        this.updateCapSelectState = this.updateCapSelectState.bind(this)
        this.updateMediaSelectState = this.updateMediaSelectState.bind(this)
        this.updateCreateButtonState = this.updateCreateButtonState.bind(this)


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
            temp_id: uuidv1(),
            setOpen: true,
            open: true
        })

        this.updateCreateButtonState()
    };

    handleClose() {
        this.setState({

            setOpen: false,
            open: false,
            media_select: ''


        })

    };

    updateState(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    };

    createAmaraResource(event) {
        if (this.state.media_select === "") {
            this.props.dispatch(createAmaraResource(this.props.media_id))
        } else {
            console.log(this.state.media_select)
            this.props.dispatch(createAmaraResource(this.props.media_id, this.state.media_select.file_id))


        }

    }

    addSRTtoAmaraResource(event) {
        let caption_id = this.state.caption_select.caption_id
        let amara_index = this.props.media_obj.captioned_resources.findIndex(element => (
            element.amara_id !== null
        ))
        let amara_id = this.props.media_obj.captioned_resources[amara_index].amara_resource.video_id
        this.props.dispatch(addSRTtoAmaraResource(caption_id, amara_id, this.props.media_id))

    }

    updateCapSelectState(event) {
        this.setState({
            caption_select: event
        });

    }

    updateMediaSelectState(event) {
        if (event.value.slice(-3) != "mp4") {
            // this.isCreateButtonEnabled = false;
            this.setState({isCreateButtonEnabled: false})

            alert("Can only select mp4 files")
        } else {
            //this.isCreateButtonEnabled = true;

            this.setState({
                media_select: event,
                isCreateButtonEnabled: true
            });
            console.log("is create button", this.isCreateButtonEnabled)

        }
    }

    updateCreateButtonState() {
        console.log("I am here")

        let source_url = this.props.media_obj.source_url;
        console.log("Source url: ", source_url)
        if (source_url === null) {
            //if file selected is not selected in media then create button is set to false
            let media_selected_file = this.state.media_select;

            if (media_selected_file == '') {
                console.log("no file selected in media when source url is null");
                // this.isCreateButtonEnabled = false;
                this.setState({isCreateButtonEnabled: false})

            }


        } else if (source_url.includes("youtube.com") || source_url.includes("youtu.be")
            || source_url.includes("vimeo")) {
            //this is a youtube or vimeo url, no media file is to be selected, just have the create button
            // this.isCreateButtonEnabled = true;
            this.setState({isCreateButtonEnabled: true})

            console.log("button: ", this.isCreateButtonEnabled)

        } else {
            //source url is not null and not youtube or vimeo. Do the same thing as top.
            let media_selected_file = this.state.media_select;

            if (media_selected_file == '') {
                console.log("no file selected in media when source url is null");
                // this.isCreateButtonEnabled = false;
                this.setState({isCreateButtonEnabled: false})

            }
        }


    }


    modalContent() {
        return (

            <div style={this.state.modalStyle} className={this.props.classes.paper}>
                <div>Add Amara Resource</div>
                <div>
                    <label style={{display: "block", fontSize: '12px'}} form={"caption_select"}>Media Files</label>
                    <Select
                        name="media_select"
                        onChange={this.updateMediaSelectState}
                        styles={customStyles}
                        value={this.state.media_select}
                        options={this.state.mediaFiles
                        }/>

                </div>
                {/*{this.isCreateButtonEnabled ? <Button onClick={this.createAmaraResource}*/}
                {/*>Create</Button> : null}*/}

                <Button onClick={this.createAmaraResource} disabled={!this.state.isCreateButtonEnabled}
                >Create</Button>


                <div>Add Captions</div>
                <div>
                    <label style={{display: "block", fontSize: '12px'}} form={"caption_select"}>Caption Files</label>
                    <Select
                        style={{display: "block"}}
                        name="caption_select"
                        onChange={this.updateCapSelectState}
                        styles={customStyles}
                        value={this.state.caption_select}
                        options={this.state.captionFiles
                        }/>
                </div>
                <Button onClick={this.addSRTtoAmaraResource}>Add Caption</Button>
            </div>

        )

    }

    render() {

        return (
            <React.Fragment>
                <Button
                    style={{maxHeight: '25px', padding: '0px 3px'}}
                    variant="contained"
                    name={"creatAstJob"}
                    onClick={this.handleOpen}
                    title={"Send to Ast"}

                >ADD</Button>
                <Modal open={this.state.open}
                       onClose={this.handleClose}
                       aria-labelledby="simple-modal-title"
                       aria-describedby="simple-modal-description">{this.modalContent()}</Modal>
            </React.Fragment>)

    }

}


function mapStateToProps({mediaReducer}, {media_id}) {

    let media_obj = mediaReducer[media_id]

    let captionFiles = mediaReducer[media_id].media_objects.reduce((accumulator, currentValue) => {
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

    let mediaFiles = mediaReducer[media_id].media_objects.reduce((accumulator, currentValue) => {
        if (currentValue.associated_files !== null) {
            accumulator.push({
                file_id: currentValue.associated_files.id,
                value: currentValue.associated_files.file_name,
                label: currentValue.associated_files.file_name,
                association_id: currentValue.id
            })
        }
        return accumulator
    }, [])

    return {
        media_id,
        captionFiles,
        mediaFiles,
        media_obj
    }
}


export default withRouter(connect(mapStateToProps)(withStyles(useStyles, {withTheme: true})(AmaraModalContainer)))