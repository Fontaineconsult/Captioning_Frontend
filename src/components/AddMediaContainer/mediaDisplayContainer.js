import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";





class MediaDisplayContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

        if (this.props.mediaSearchReducer[this.props.transaction_id]) {
            this.setState({

                title: this.props.mediaSearchReducer[this.props.transaction_id].title,
                source_location: this.props.mediaSearchReducer[this.props.transaction_id].source_location,
                caption_location: this.props.mediaSearchReducer[this.props.transaction_id].captioned_link,
                item_available: this.props.mediaSearchReducer[this.props.transaction_id],
                item_unavailable: this.props.errorsReducer[this.props.transaction_id]

            })
        }

        if (this.props.errorsReducer[this.props.transaction_id]) {

            this.setState({
                source_location: this.props.errorsReducer[this.props.transaction_id].request_payload.source_url,
                item_available: this.props.mediaSearchReducer[this.props.transaction_id],
                item_unavailable: this.props.errorsReducer[this.props.transaction_id]

            })
        }

    }

    render() {

        return(
           <div>
               {this.state.item_available &&  <MediaInfoDisplay props={this.state}/>}
               {this.state.item_unavailable &&  <NoItemFound title={this.state.source_location}/>}
           </div>
        )
    }



}


function MediaInfoDisplay(props) {
    console.log(props)
    return (<div>
        <h2>{props.props.title}</h2>
        {props.props.captioned_link ? <a href={props.props.captioned_link}>{props.props.captioned_link}</a> : <span>No captioned version provided</span>}
    </div>)

}

function NoItemFound(props){
    return <h2>{props.title} not found</h2>
}





function mapStateToProps({mediaSearchReducer, errorsReducer, tempJobsFormReducer}, {transaction_id, transaction_link}) {

    return {
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer,
        transaction_id,
        transaction_link

    }
}

export default withRouter(connect(mapStateToProps)(MediaDisplayContainer))