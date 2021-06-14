import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {
    Switch,
    Route,
    NavLink,

} from "react-router-dom";
import AddUserContainer from "./addUserContainer"






class UserManagementControlContainer extends Component {

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
                                to={{pathname: "/captioning/users/add-user",
                                    search: this.props.location.search,
                                }}>Add User</NavLink>
                        </div>
                        <div id="jobManager" role="button" className="navButton">
                            <NavLink
                                to={{pathname: "/captioning/users/edit-user",
                                    search: this.props.location.search,
                                }}>Edit Users</NavLink>
                        </div>
                        <div id="jobManager" role="button" className="navButton">
                            <NavLink
                                to={{pathname: "/captioning/users/courses",
                                    search: this.props.location.search,
                                }}>Courses</NavLink>
                        </div>
                        <div id="jobManager" role="button" className="navButton">
                            <NavLink
                                to={{pathname: "/captioning/users/students",
                                    search: this.props.location.search,
                                }}>Students</NavLink>
                        </div>
                    </div>
                </div>
                <div>

                    <Switch>
                        <Route path="/captioning/users/add-user">{<AddUserContainer/>}</Route>

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

export default withRouter(connect(mapStateToProps)(UserManagementControlContainer))