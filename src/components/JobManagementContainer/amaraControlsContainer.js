import React, {Component} from 'react';
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
            <div style={{border: "1px", borderStyle: "solid", borderRadius: "5px", borderColor: "#A8A8A8"}}>
                <div style={{margin: "auto", width: "90%"}}>
                    <div className="astControls">
                        <div style={{marginTop: "10px"}}>
                            <AmaraModalContainer media_id={this.props.media_id}/>
                        </div>


                        <div>
                            <div className={"astControlsContainer"}>

                                {this.props.amaraResource &&
                                    <AmaraControls amaraResource={this.props.amaraResource.amara_resource}/>}
                                {this.props.amaraResource === undefined && <NoJobsSlug/>}

                            </div>
                        </div>


                    </div>
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