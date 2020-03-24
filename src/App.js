 import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route} from 'react-router-dom'
import {withRouter} from "react-router";
import {assetDiscovery, fetchIlearnVideosBySemester, fetchAllCourses, permissionDiscovery } from "./actions/ampApi/fetchData";
import MasterContainer from './components/masterContainer'
import queryString from "query-string"

class App extends Component {

    constructor(props) {
        super(props);
        this.query_id = queryString.parse(this.props.location.search);
    }


    componentDidMount() {


    this.props.dispatch(permissionDiscovery(this.query_id.id))


     // this.props.dispatch(assetDiscovery(query_id.id));
     //
     // this.props.dispatch(fetchAllCourses("sp19"));
     // this.props.dispatch(fetchIlearnVideosBySemester("sp19"))
     // // this.props.dispatch(fetchInstructors('sp19'))
     //
     // this.props.dispatch(fetchiLearnVideosByInstructorId('910484411', "sp19"))

     // this.props.dispatch(fetchVideoJobsByInstructor('fa18', '907384821'))
     // this.props.dispatch(fetchAllStudents())
     // this.props.dispatch(fetchMediaById("True"))
     // this.props.dispatch(updateVideoJob("77", "comments", "BLLYRGGGGGGG"))
     // this.props.dispatch(updateCourse("fa18AAS35001", "comments", "BLLsssssYRGGGGGGG"))


     //    this.props.dispatch(AddMediaToJob("Test", "www.111ur.ur..4444urcom", "link"))
}



    render() {

    return (
      <div className="App">


          {this.props.permissionsLoading === true && (<p>LOADING LOADING LOADING</p>)}
          {this.props.permissionsLoading === false & this.props.userPass === true && (<p>You Don't Have Permission for this Content</p>)}
          {this.props.permissionsLoading === false & this.props.userPass === false && (<MasterContainer query={this.query_id}/>)}


      </div>
    );
  }
}


function mapStateToProps({state, userPermissionReducer, requesterReducer, loadingStatusReducer}) {

    let userPass = userPermissionReducer.hasOwnProperty("message") || Object.keys(userPermissionReducer).length === 0
    let assetPass = requesterReducer.hasOwnProperty("message") || Object.keys(requesterReducer).length === 0
    let permissionsLoading = loadingStatusReducer['userPermissionLoading']


    return {
        userPass,
        assetPass,
        userPermissionReducer,
        requesterReducer,
        permissionsLoading


    }
}



export default withRouter(connect(mapStateToProps)(App))