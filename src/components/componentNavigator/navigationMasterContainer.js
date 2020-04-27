import React, { Component } from 'react';
import {
    Switch,
    Route,
    NavLink,

} from "react-router-dom";

import {withRouter} from "react-router";
import {connect} from "react-redux";
import JobManagementMasterContainer from "../JobManagementContainer/JobManagementMasterContainer";
import '../../css/NavMaster.css'
import IlearnManagementControlContainer from "../iLearnViewsContainer/iLearnNavBar/IlearnManagementControlContainer";
import AddJobControlContainer from "../AddCapJobView/AddJobControlContainer"




class NavigationMasterContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            jobManagerActive: true,
            addJobActive: false,
            iLearnScraperActive: false

        };

        this.selectNavigator = this.selectNavigator.bind(this)
    }

    selectNavigator(event) {
        this.setState({
            jobManagerActive: event.target.id === "JobManager",
            addJobActive: event.target.id === "addJob",
            iLearnScraperActive: event.target.id === "iLearnScraper"

        })

    }

    render() {
        return (
            <div className="NavigationMasterContainer">
                <div className="NavUpperContainer">
                    <div className="NavControlContainer">
                        <div id="jobManager" role="button" className="navButton">
                            <NavLink
                            to={{pathname: "/captioning/job-manager",
                                search: this.props.location.search,
                            }}>Job Manager</NavLink>
                        </div>
                        <div id="addJob" role="button" className="navButton">
                            <NavLink
                                to={{pathname: "/captioning/add-job",
                                    search: this.props.location.search,

                                }}>Add Job</NavLink>
                        </div>
                        <div id="iLearnScraper" role="button" className="navButton" onClick={this.selectNavigator}>
                            <NavLink
                                to={{pathname: "/captioning/ilearn-scraper/active-courses",
                                    search: this.props.location.search,

                                }}>iLearn Scraper</NavLink>

                        </div>
                        <div id="autoCaptioner" role="button" className="navButton" onClick={this.selectNavigator}>
                            <NavLink
                                to={{pathname: "/captioning/auto-captioner",
                                    search: this.props.location.search,

                                }}>Auto Captioner</NavLink>

                        </div>
                        <div id="autoExplorer" role="button" className="navButton" onClick={this.selectNavigator}>
                            <NavLink
                                to={{pathname: "/captioning/content-explorer",
                                    search: this.props.location.search,

                                }}>Content Manager</NavLink>
                        </div>
                        <div id="email" role="button" className="navButton" onClick={this.selectNavigator}>
                            <NavLink
                                to={{pathname: "/captioning/email",
                                    search: this.props.location.search,

                                }}>Email</NavLink>
                        </div>
                        <div id="email" role="button" className="navButton" onClick={this.selectNavigator}>
                            <NavLink
                                to={{pathname: "/captioning/users",
                                    search: this.props.location.search,
                                }}>Users</NavLink>
                        </div>
                    </div>
                </div>
                <div className="navContent">
                    <Switch>
                        <Route path="/captioning/job-manager">{this.props.isLoaded &&  <JobManagementMasterContainer query={this.props.query}/>}</Route>
                        <Route path="/captioning/add-job">{<AddJobControlContainer query={this.props.query}/>}</Route>
                        <Route path="/captioning/ilearn-scraper">{<IlearnManagementControlContainer/>}</Route>

                    </Switch>


                    {/*{this.state.addJobActive && <AddJobControlContainer/>}*/}
                    {/*{this.state.iLearnScraperActive && <IlearnManagementControlContainer/>}*/}

                </div>
            </div>

        )
    }
}

function mapStateToProps({requesterReducer, userPermissionReducer, loadingStatusReducer}, {query}) {

    let isLoaded = !loadingStatusReducer.userRequestsLoading && !loadingStatusReducer.coursesLoading
    return {
        query,
        isLoaded
    }
}

export default withRouter(connect(mapStateToProps)(NavigationMasterContainer))