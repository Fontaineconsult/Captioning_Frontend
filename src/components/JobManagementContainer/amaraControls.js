import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from '@material-ui/icons/Close';
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green"

class AmaraControls extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    // amara-controls is display: flex
    render() {
        return (
            <div className="amaraControls" style={{
                border: "2px",
                borderStyle: "solid",
                borderRadius: "5px",
                borderColor: "#A8A8A8",
                paddingLeft: "10px",
                width: "100%"
            }}>
                <div style={{marginTop: "10px"}}>
                    <a target="_blank" href={this.props.amaraResource.url}>{this.props.amaraResource.url}</a>
                </div>

                <div style={{display: "flex", marginLeft: "10px", width: "20rem", verticalAlign: "middle"}}>

                    <div>Uploaded: {this.props.amaraResource.captions_uploaded ?
                        <DoneIcon style={{color: "green", verticalAlign: "bottom", marginTop: "5px"}}/> :
                        <CloseIcon style={{color: "red", verticalAlign: "bottom", marginTop: "5px"}}/>}</div>


                    <div>Complete: {this.props.amaraResource.captions_complete ?
                        <DoneIcon style={{color: "green", verticalAlign: "bottom", marginTop: "5px"}}/> :
                        <CloseIcon style={{color: "red", verticalAlign: "bottom", marginTop: "5px"}}/>}</div>


                </div>
            </div>

        )
    }

}


function mapStateToProps({loadingStatusReducer, errorsReducer, videosJobsReducer}, {amaraResource}) {
    console.log("amara resource ", amaraResource);


    return {
        amaraResource,


    }
}

export default withRouter(connect(mapStateToProps)(AmaraControls))