import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";


class MediaDisplayContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemFound: false,
            itemNotFound: false,
            startedSearch: false
        };

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        let compare = {
            itemFound: this.props.itemFound,
            itemNotFound: this.props.itemNotFound,
            startedSearch: this.props.startedSearch
        };
        if (JSON.stringify(compare) !== JSON.stringify(this.state)) {
                this.setState({
                    itemFound: this.props.itemFound,
                    itemNotFound: this.props.itemNotFound,
                    startedSearch: this.props.startedSearch
                })

            }
    }

    componentDidMount() {

        this.setState({
            itemFound: this.props.itemFound,
            itemNotFound: this.props.itemNotFound,
            startedSearch: this.props.startedSearch
        })

    }

    render() {


        return(
           <div className="videoSearchFeedbackInnerContainer">
               {!this.state.startedSearch && <EmptySearchContainer/>}
               {this.state.startedSearch && this.state.itemFound &&  <MediaInfoDisplay capUrl={this.props.captionUrl} source={this.props.mediaSearchReducer[this.props.transaction_id]}/>}
               {this.state.startedSearch && this.state.itemNotFound &&  <NoItemFound source={this.props.errorsReducer[this.props.transaction_id]}/>}
           </div>
        )
    }

}


function MediaInfoDisplay(props) {


    let title = props.source ? props.source.title : '';
    let source_url = props.source ? props.source.source_url : '';
    let captioned_url = props.capUrl ? props.capUrl : undefined;


    return (<div className="feedbackSlug">
        <div>{title}</div>
        <br></br>
        <div>
            <div>Source URL</div>
            <div><a target="_blank" href={source_url}>{source_url}</a></div>
        </div>
            <br></br>
        <div>
            <div>Captioned URL</div>
            <div>{captioned_url ? <div>
                <div>
                    <a target="_blank" href={captioned_url}>{captioned_url}</a>
                </div>
                <div>
                    <br></br>
                    Download: <a href=" ">.SRT</a> | <a href=" ">Transcript</a>
                </div>
            </div>
                : <span>No captioned version provided</span>}</div>
        </div>

    </div>)

}

function NoItemFound(props){
    return <div className="feedbackSlug">{props.source_url} not found</div>
}


function EmptySearchContainer() {

    return (<div className="feedbackSlug">
        Enter a video source

    </div>)

}


function mapStateToProps({mediaSearchReducer, errorsReducer, tempJobsFormReducer}, {transaction_id}) {
    let captionResources
    let captionUrl
    let itemFound = mediaSearchReducer.hasOwnProperty(transaction_id);
    let itemNotFound = errorsReducer.hasOwnProperty(transaction_id);
    let startedSearch = itemFound || itemNotFound;
    console.log("GRUHHS", transaction_id)
    if (transaction_id !== "") {
        if (mediaSearchReducer.hasOwnProperty(transaction_id)) {
            if (mediaSearchReducer[transaction_id].hasOwnProperty("captioned_resources")) {
                captionResources = mediaSearchReducer[transaction_id].captioned_resources.reduce((accumulator, currentValue) => {
                    if (currentValue.amara_id !== null) {
                        accumulator.push({
                            currentValue
                        })
                    }
                    return accumulator
                }, [])
                if (captionResources.length > 0) {
                    captionUrl = captionResources[0].currentValue.amara_resource.url
                }
            }
        }
    }

    return {
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer,
        transaction_id,
        itemFound,
        itemNotFound,
        startedSearch,
        captionResources,
        captionUrl


    }
}

export default withRouter(connect(mapStateToProps)(MediaDisplayContainer))