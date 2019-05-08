import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route} from 'react-router-dom'
import {withRouter} from "react-router";
import {fetchAllCourses, fetchInstructors, fetchVideoJobsByInstructor, fetchStudent, fetchAllStudents, fetchCoursesbyInstructorId, fetchIlearnVideosBySemester, fetchMediaById, loginDiscovery} from "./actions/creators/fetchData";
import {updateCourse, updateVideoJob} from "./actions/creators/postData";
import {AddMedia} from "./actions/creators/putData";
import MasterContainer from './components/masterContainer'


class App extends Component {

    componentDidMount() {
     // this.props.dispatch(fetchAllCourses())
     // this.props.dispatch(fetchInstructors('sp19'))
     // this.props.dispatch(fetchIlearnVideosBySemester('sp19'))
     // this.props.dispatch(fetchVideoJobsByInstructor('fa18', '907384821'))
     // this.props.dispatch(fetchAllStudents())
     // this.props.dispatch(fetchMediaById("44"))
     // this.props.dispatch(updateVideoJob("77", "comments", "BLLYRGGGGGGG"))
     // this.props.dispatch(updateCourse("fa18AAS35001", "comments", "BLLsssssYRGGGGGGG"))
        this.props.dispatch(loginDiscovery("908390527"))
     //    this.props.dispatch(AddMedia("Test", "www.111ur.ur..4444urcom", "link"))
}


    render() {
    return (
      <div className="App">
        <p>Hello</p>
          <MasterContainer/>
      </div>
    );
  }
}


function mapStateToProps({state}) {

    return {
        state

    }
}



export default withRouter(connect(mapStateToProps)(App))