import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Select from "react-select";
import {captionResourceSelectCustomStyles} from "./selectCustomStyle";
import {updateMedia} from "../../actions/ampApi/putData"
import IconButton from "@material-ui/core/IconButton";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import AddCircleIcon from '@material-ui/icons/AddCircle';


class CaptionResourceContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            captioned_url: {value:"None", label:"No Caption Resource"},
            captionResources: []

        };

        this.updatePrimaryCapResource = this.updatePrimaryCapResource.bind(this)
        this.addCapResource = this.addCapResource.bind(this)

    }

    addCapResource() {
        console.log("ADD RESOURCE")

    }

    updatePrimaryCapResource(event) {

        this.setState({
            captioned_url: event
        });

        this.props.dispatch(updateMedia(this.props.media_id,
            "primary_caption_resource_id",
            event.value))


    }

    componentDidMount() {

        if (this.props.media.primary_caption_resource_id !== null) {

            let primaryCapResource =  this.props.mediaReducer[this.props.media_id].captioned_resources.filter(item => {

                if (item.id === this.props.media.primary_caption_resource_id) {

                    return {value:this.props.media.primary_caption_resource_id,
                            label:this.props.media.captioned_resources[this.props.media.primary_caption_resource_id].url}
                }
            })

            this.setState({
                captioned_url: primaryCapResource,
                captionResources:this.props.captionResources
            })
        }
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
                        options={this.state.captionResources
                        }/>
                </div>

                <div className={"addCapResource"}>
                    <AddCircleIcon disabled={false} name={"extract_video"} size={"small"} onClick={this.addCapResource}><AddCircleIcon fontSize={"small"}/></AddCircleIcon>
                </div>
            </div>
        )
    }
}

function mapStateToProps({loadingStatusReducer, errorsReducer, mediaReducer}, {media_id}) {
    let media = mediaReducer[media_id]
    let captionResources

    captionResources = mediaReducer[media_id].captioned_resources.reduce((accumulator, currentValue) => {
        if (currentValue.amara_id !== null){
            accumulator.push({
                value:currentValue.id,
                label:currentValue.amara_resource.url,
               })
        }

        return accumulator
    },[])

    return {
        media,
        captionResources
    }
}

export default withRouter(connect(mapStateToProps)(CaptionResourceContainer))