import React, {Component} from 'react';
import {NavLink, Route, Switch,} from "react-router-dom";

import {withRouter} from "react-router";
import {connect} from "react-redux";
import JobManagementMasterContainer from "../JobManagementContainer/JobManagementMasterContainer";
import '../../css/NavMaster.css'
import IlearnManagementControlContainer from "../iLearnViewsContainer/iLearnNavBar/IlearnManagementControlContainer";
import AddJobControlContainer from "../AddCapJobView/AddJobControlContainer"
import UserManagementMasterContainer from "../UsersManagementContainer/UsersManagementMasterContainer";
import {updateGlobalParam} from "../../actions/globals"
import CircularProgress from '@material-ui/core/CircularProgress';
import EmailManagementMasterContainer from "../EmailManagementContainer/EmailManagementMasterContainer";
import ContentManagerMasterContainer from "../ContentManager/ContentManagerMasterContainer";
import CanvasManagementControlContainer from "../CanvasViewsContainer/CanvasNavBar/CanvasManagementControlContainer";


class NavigationMasterContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            jobManagerActive: true,
            addJobActive: false,
            iLearnScraperActive: false,
            semester: ""

        };

        this.selectNavigator = this.selectNavigator.bind(this)
        this.updateSemester = this.updateSemester.bind(this)
    }

    componentDidMount() {

        this.setState({
            semester: this.props.globalsReducer.currentSemester

        })
    }


    updateSemester(event) {
        this.setState({semester: event.target.value});
        this.props.dispatch(updateGlobalParam("currentSemester", event.target.value))
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
                    <div className={"NavUpperInnerContainer"}>
                        <div className="NavControlContainer">
                            <div id="jobManager" role="button" className="navButton">
                                <NavLink
                                    to={{
                                        pathname: "/captioning/job-manager",
                                        search: this.props.location.search,
                                    }}>Job Manager</NavLink>
                            </div>
                            <div id="addJob" role="button" className="navButton">
                                <NavLink
                                    to={{
                                        pathname: "/captioning/add-job",
                                        search: this.props.location.search,

                                    }}>Add Job</NavLink>
                            </div>
                            <div id="iLearnScraper" role="button" className="navButton" onClick={this.selectNavigator}>
                                <NavLink
                                    to={{
                                        pathname: "/captioning/ilearn-scraper/active-courses",
                                        search: this.props.location.search,

                                    }}>iLearn Scraper</NavLink>

                            </div>
                            <div id="canvasScraper" role="button" className="navButton" onClick={this.selectNavigator}>
                                <NavLink
                                    to={{
                                        pathname: "/captioning/canvas-scraper/active-courses",
                                        search: this.props.location.search,

                                    }}>Canvas Scraper</NavLink>

                            </div>
                            <div id="autoExplorer" role="button" className="navButton" onClick={this.selectNavigator}>
                                <NavLink
                                    to={{
                                        pathname: "/captioning/content-explorer/videos",
                                        search: this.props.location.search,

                                    }}>Content Manager</NavLink>
                            </div>
                            <div id="email" role="button" className="navButton" onClick={this.selectNavigator}>
                                <NavLink
                                    to={{
                                        pathname: "/captioning/email/send",
                                        search: this.props.location.search,

                                    }}>Email</NavLink>
                            </div>
                            <div id="email" role="button" className="navButton" onClick={this.selectNavigator}>
                                <NavLink
                                    to={{
                                        pathname: "/captioning/users/add-user",
                                        search: this.props.location.search,
                                    }}>Users</NavLink>
                            </div>
                        </div>
                        <div className={"semesterSelectContainer"}>
                            <form>
                                <label>
                                    Semester
                                    <select value={this.state.semester} onChange={this.updateSemester}>
                                        <option value={"sp20"}>Spring 2020</option>
                                        <option value={"su20"}>Summer 2020</option>
                                        <option value={"fa20"}>Fall 2020</option>
                                        <option value={"sp21"}>Spring 2021</option>
                                        <option value={"su21"}>Summer 2021</option>
                                        <option value={"fa21"}>Fall 2021</option>
                                        <option value={"sp22"}>Spring 2022</option>
                                        <option value={"su22"}>Summer 2022</option>
                                        <option value={"fa22"}>Fall 2022</option>
                                        <option value={"sp23"}>Spring 2023</option>
                                        <option value={"su23"}>Summer 2023</option>
                                    </select>
                                </label>
                            </form>
                        </div>
                        <div className={"logout-container"}><a href={`/authentication/logout`}>logout</a></div>
                        <div className={"globalLoadingContainer"}>{this.props.displayLoader && (
                            <CircularProgress size={30}/>)}</div>

                    </div>


                </div>
                <div className="navContent">
                    <Switch>
                        <Route path="/captioning/job-manager">{this.props.isLoaded &&
                            <JobManagementMasterContainer query={this.props.query}/>}</Route>
                        <Route path="/captioning/add-job">{<AddJobControlContainer query={this.props.query}/>}</Route>
                        <Route path="/captioning/ilearn-scraper">{<IlearnManagementControlContainer/>}</Route>
                        <Route path="/captioning/canvas-scraper">{<CanvasManagementControlContainer/>}</Route>
                        <Route path="/captioning/content-explorer">{<ContentManagerMasterContainer/>}</Route>
                        <Route path="/captioning/users">{<UserManagementMasterContainer/>}</Route>
                        <Route path="/captioning/email">{<EmailManagementMasterContainer/>}</Route>

                    </Switch>


                </div>
            </div>

        )
    }
}

function mapStateToProps({requesterReducer, userPermissionReducer, loadingStatusReducer, globalsReducer}, {query}) {

    let displayLoader = loadingStatusReducer.coursesLoading ||
        loadingStatusReducer.iLearnVideosLoading ||
        loadingStatusReducer.mediaLoading ||
        loadingStatusReducer.videoJobsLoading ||
        loadingStatusReducer.astRequestsLoading




    let isLoaded = !loadingStatusReducer.userRequestsLoading && !loadingStatusReducer.coursesLoading
    return {
        query,
        globalsReducer,
        isLoaded,
        displayLoader
    }
}

export default withRouter(connect(mapStateToProps)(NavigationMasterContainer))