import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import AmaraControls from "./amaraControls";
import Button from "@material-ui/core/Button";



function NoAmaraResource(props) {

    return(
        <div>No Amara Resource</div>
    )

}



class AmaraControlsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.createAmaraResource = this.createAmaraResource.bind(this)
        this.addSRTtoAmaraResource = this.addSRTtoAmaraResource.bind(this)

    }

    createAmaraResource(){}
    addSRTtoAmaraResource(){}



    render() {
        return (
            <div className="astControls">
                <Button>Add</Button>
                {this.props.amaraResource  && <AmaraControls amaraResource={this.props.amaraResource.amara_resource}/>}
                {this.props.amaraResource === undefined && <NoAmaraResource/>}
            </div>

        )
    }

}




function mapStateToProps({loadingStatusReducer, errorsReducer, mediaReducer}, {media_id}) {

    let amaraResource = mediaReducer[media_id].captioned_resources[0]
    console.log(amaraResource)
    return {

        amaraResource


    }
}

export default withRouter(connect(mapStateToProps)(AmaraControlsContainer))