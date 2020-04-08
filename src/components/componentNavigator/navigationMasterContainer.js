import React, { Component } from 'react';


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
        console.log(event.target.id, event.target.id === "addJob")

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
                        <div id="JobManager" role="button" className="navButton" onClick={this.selectNavigator}>
                            Job Manager
                        </div>
                        <div id="addJob" role="button" className="navButton" onClick={this.selectNavigator}>
                            Add Job
                        </div>
                        <div id="iLearnScraper" role="button" className="navButton" onClick={this.selectNavigator}>
                            iLearn Scraper
                        </div>

                    </div>
                </div>
                <div class="navContent">
                    {this.state.jobManagerActive & this.props.isLoaded &&  <JobManagementMasterContainer query={this.props.query}/>}
                    {this.state.addJobActive && <AddJobControlContainer/>}
                    {this.state.iLearnScraperActive && <IlearnManagementControlContainer/>}

                </div>



            </div>

        )
    }

}

function mapStateToProps({requesterReducer, userPermissionReducer, loadingStatusReducer}, {query}) {


    let isLoaded = !loadingStatusReducer.userRequestsLoading

    return {
        query,
        isLoaded
    }
}


export default withRouter(connect(mapStateToProps)(NavigationMasterContainer))