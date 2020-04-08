import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";



class JobMediaDisplayContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            captioned_media: "Not Set"

        };
    }


    componentDidMount() {

        this.setState({
            captioned_url:this.props.media.captioned_url,
            title:this.props.media.title,
            source_url:this.props.media.source_url

        })
    }


    render() {

        return (


            <div className="capJobMediaView">
                <div>
                    <form>
                        <label>
                            Captioned URL
                            <input type='input' name='captioned_url' value={this.state.captioned_url}/>
                        </label>
                        <label>
                            Title
                            <input type='input' name='title' value={this.state.title}/>
                        </label>
                        <label>
                            Source URL
                            <input type='input' name='source_url' value={this.state.source_url}/>
                        </label>



                    </form>
                </div>


            </div>

        )


    }


}


function mapStateToProps({loadingStatusReducer, errorsReducer, mediaReducer}, {mediaId}) {
    let media = mediaReducer[mediaId]

    return {
        media


    }
}

export default withRouter(connect(mapStateToProps)(JobMediaDisplayContainer))