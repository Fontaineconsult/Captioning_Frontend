import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";



class JobMediaDisplayContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            captioned_url: "Not Set"

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
            <div className="capJobMediaContainer">
                <div>
                    <form>
                        <div className="capJobMediaContentContainer">
                            <div tabIndex={0} className="mediaContentDescriptor">
                                Title: {this.state.title}
                            </div>

                        </div>
                        <div className="capJobMediaContentContainer">
                            <div tabIndex={0} className="mediaContentDescriptor">
                                Source URL: <a href={this.state.source_url}>{this.state.source_url}</a>
                            </div>

                        </div>
                        <div className="capJobMediaContentContainer">
                            <label className="capJobMediaContentContainer">
                                <div className="mediaContentDescriptor">
                                    Captioned URL:
                                </div>
                                <div>
                                    <input type='input' name='captioned_url' value={this.state.captioned_url}/>
                                </div>
                            </label>
                        </div>
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