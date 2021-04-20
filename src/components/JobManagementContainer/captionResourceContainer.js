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
            captioned_url: this.props.primaryCapResource,
            captionResources: this.props.captionResources

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

            this.setState({
                captioned_url: this.props.primaryCapResource
            })

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
            return accumulator
        }, [])

        if (media.primary_caption_resource_id !== null) {
            primaryCapResource = mediaReducer[media_id].captioned_resources.map(item => {
                if (item.id === media.primary_caption_resource_id) {
                    if (item.amara_id !== null) {
                        return {value:item.id,
                            label:<a target="_blank" href={item.amara_resource.url}>{item.amara_resource.url}</a> }
                    }
                    if (item.s3_file_id !== null) {
                        return {value:item.id,
                            label:<a target="_blank" href={item.s3_file_resource.object_url}>{item.s3_file_resource.file_name}</a> }
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

export default withRouter(connect(mapStateToProps)(CaptionResourceContainer))