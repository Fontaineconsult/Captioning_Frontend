import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import AmaraControls from "./amaraControls";
import AmaraModalContainer from './amaraConfirmModal'


function NoAmaraResource(props) {

    return(
        <div>No Amara Resource</div>
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
                {this.props.amaraResource  && <AmaraControls amaraResource={this.props.amaraResource.amara_resource}/>}
                {this.props.amaraResource === undefined && <NoAmaraResource/>}
            </div>

        )
    }

}

function mapStateToProps({loadingStatusReducer, errorsReducer, mediaReducer}, {media_id}) {
    let amaraResource

    if (loadingStatusReducer.mediaLoading === false) {

        amaraResource = mediaReducer[media_id].captioned_resources[0]

    }

    return {

        amaraResource

    }
}

export default withRouter(connect(mapStateToProps)(AmaraControlsContainer))