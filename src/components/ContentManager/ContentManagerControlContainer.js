import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {NavLink, Route, Switch,} from "react-router-dom";
import VideosContainer from "./Videos/VideosContainer";


class ContentManagerControlContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {

        return (
            <div className="ContentManagementMasterContainer">
                <div className="control-bar">
                    <div className="controlBarNavButtons">
                        <div id="jobManager" role="button" className="navButton">
                            <NavLink
                                to={{
                                    pathname: "/captioning/content-explorer/videos",
                                    search: this.props.location.search,
                                }}>Videos</NavLink>
                        </div>
                        <div id="jobManager" role="button" className="navButton">
                            <NavLink
                                to={{
                                    pathname: "/captioning/content-explorer/something",
                                    search: this.props.location.search,
                                }}>Something</NavLink>
                        </div>

                    </div>
                </div>
                <div>

                    <Switch>
                        <Route path="/captioning/content-explorer/videos">{<VideosContainer/>}</Route>
                    </Switch>
                </div>
            </div>


        )


    }


}


function mapStateToProps({videosJobsReducer}, {props}) {
    return {
        videosJobsReducer,
        props
    }
}

export default withRouter(connect(mapStateToProps)(ContentManagerControlContainer))