import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import NavigationMasterContainer from "./componentNavigator/navigationMasterContainer";
import NewJobMasterContainer from "./AddCapJobView/newJobMasterContainer"
import JobManagementMasterContainer from "./JobManagementContainer/JobManagementMasterContainer"
import IlearnMasterContainer from "./iLearnViewsContainer/iLearnViewContainers/iLearnAllCoursesView"

import {
    assetDiscovery,
    fetchAllCourses,
    fetchCourseByCourseGenId,
    fetchiLearnVideosByCourseGenId,
    fetchIlearnVideosBySemester,
    allAssetDiscovery
} from "../actions/ampApi/fetchData";
import '../css/masterContainer-css.css'

import NewCapJobContainer from './AddCapJobView/old/newCapJobContainer'



class MasterContainer extends Component {

    componentDidMount() {



        if (this.props.userPermissionReducer[this.props.query.id].permission_type === 'admin') {
            this.props.dispatch(allAssetDiscovery())
            this.props.dispatch(fetchIlearnVideosBySemester(this.props.query.semester))

            this.props.dispatch(fetchAllCourses(this.props.query.semester))


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

    }

    render() {

        return(

            <div className={"master-container"}>
                <div className={"top-bar"}>Master Container</div>
                <NavigationMasterContainer query={this.props.query}/>

            </div>

        )
    }


}


function mapStateToProps({requesterReducer, userPermissionReducer, loadingStatusReducer}, {query}){



    return {
        requesterReducer,
        userPermissionReducer,
        query

    }


}



export default withRouter(connect(mapStateToProps)(MasterContainer))