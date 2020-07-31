import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import NavigationMasterContainer from "./componentNavigator/navigationMasterContainer";
import NewJobMasterContainer from "./AddCapJobView/newJobMasterContainer"
import JobManagementMasterContainer from "./JobManagementContainer/JobManagementMasterContainer"
import IlearnMasterContainer from "./iLearnViewsContainer/iLearnViewContainers/iLearnAllCoursesView"
import {setGlobalParams} from "../actions/globals"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {devServerUrl} from '../constants'


import {
    assetDiscovery,
    fetchAllCourses,
    fetchCourseByCourseGenId,
    fetchiLearnVideosByCourseGenId,
    fetchIlearnVideosBySemester,
    allAssetDiscovery, fetchAllVideoJobsBySemester, fetchAllOrgs, fetchAllEmployees
} from "../actions/ampApi/fetchData";
import '../css/masterContainer-css.css'

import NewCapJobContainer from './AddCapJobView/old/newCapJobContainer'



class MasterContainer extends Component {

    componentDidMount() {



        if (this.props.userPermissionReducer[this.props.query.id].permission_type === 'admin') {
            this.props.dispatch(allAssetDiscovery(this.props.globalsReducer.currentSemester))
            this.props.dispatch(fetchIlearnVideosBySemester(this.props.globalsReducer.currentSemester))
            this.props.dispatch(fetchAllCourses(this.props.globalsReducer.currentSemester))
            this.props.dispatch(fetchAllOrgs())
            this.props.dispatch(fetchAllEmployees())
            this.props.dispatch(fetchAllVideoJobsBySemester(this.props.globalsReducer.currentSemester))


        }

        if (this.props.userPermissionReducer[this.props.query.id].permission_type === 'user') {
            this.props.dispatch(assetDiscovery(this.props.query.id))

        }




    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.userPermissionReducer[this.props.query.id].permission_type === 'user') {
            if (Object.keys(this.props.requesterReducer).length !== Object.keys(prevProps.requesterReducer).length) {
                Object.keys(this.props.requesterReducer).map(key => (
                    this.props.dispatch(fetchCourseByCourseGenId(this.props.requesterReducer[key].course_id))
                ))
                Object.keys(this.props.requesterReducer).map(key => (
                    this.props.dispatch(fetchiLearnVideosByCourseGenId(this.props.requesterReducer[key].course_id))
                ))

            }

        }


        if (this.props.globalsReducer.currentSemester !== prevProps.globalsReducer.currentSemester ) {

            this.props.dispatch(allAssetDiscovery(this.props.globalsReducer.currentSemester))
            this.props.dispatch(fetchIlearnVideosBySemester(this.props.globalsReducer.currentSemester))
            this.props.dispatch(fetchAllCourses(this.props.globalsReducer.currentSemester))
            this.props.dispatch(fetchAllVideoJobsBySemester(this.props.globalsReducer.currentSemester))

        }





    }

    render() {

        return(

            <div className={"master-container"}>
                <div className={"top-bar"}>
                    <div>Master Container</div>
                    <div className={"logout-container"}><a href={`/authentication/logout`}>logout</a></div>
                </div>
                <Route path='/captioning'><NavigationMasterContainer query={this.props.query}/></Route>
            </div>

        )
    }


}


function mapStateToProps({requesterReducer, userPermissionReducer, loadingStatusReducer, globalsReducer}, {query}){



    return {
        globalsReducer,
        requesterReducer,
        userPermissionReducer,
        query

    }


}



export default withRouter(connect(mapStateToProps)(MasterContainer))