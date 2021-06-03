import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import AmaraControls from "./amaraControls";
import AmaraModalContainer from './amaraConfirmModal'


function NoJobsSlug(props) {

    return (
        <div className={"noJobSlug"}>No Amara Resource</div>
    )


}




class AmaraControlsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }


    render() {
        return (
            <div className="astControls">
                <AmaraModalContainer media_id = {this.props.media_id}/>

                <div className={"astControlsContainer"}>

                    {this.props.amaraResource  && <AmaraControls amaraResource={this.props.amaraResource.amara_resource}/>}
                    {this.props.amaraResource === undefined && <NoJobsSlug/>}

                </div>

            </div>

        )
    }

}

function mapStateToProps({loadingStatusReducer, errorsReducer, mediaReducer}, {media_id}) {
    let amaraResource
    let amara_index


    if (loadingStatusReducer.mediaLoading === false) {

        if (Object.keys(mediaReducer).length > 0) {

            amara_index = Object.keys(mediaReducer[media_id].captioned_resources).find(index => {
                    if (mediaReducer[media_id].captioned_resources[index].amara_id !== null) {
                        return true
                    }
                }
            )

            amaraResource = mediaReducer[media_id].captioned_resources[amara_index]
        }
    }




    return {

        amaraResource

    }
}

export default withRouter(connect(mapStateToProps)(AmaraControlsContainer))