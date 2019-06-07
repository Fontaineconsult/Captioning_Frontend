import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route} from 'react-router-dom'
import {withRouter} from "react-router";
import {loginDiscovery, } from "./actions/creators/fetchData";
import MasterContainer from './components/masterContainer'
import queryString from "query-string"

class App extends Component {

    componentDidMount() {
     const query_id = queryString.parse(this.props.location.search);
     this.props.dispatch(loginDiscovery(query_id.id));
     //
     // this.props.dispatch(fetchAllCourses("sp19"))
     // // this.props.dispatch(fetchInstructors('sp19'))
     //
     // this.props.dispatch(fetchiLearnVideosByInstructorId('910484411', "sp19"))

     // this.props.dispatch(fetchVideoJobsByInstructor('fa18', '907384821'))
     // this.props.dispatch(fetchAllStudents())
     // this.props.dispatch(fetchMediaById("True"))
     // this.props.dispatch(updateVideoJob("77", "comments", "BLLYRGGGGGGG"))
     // this.props.dispatch(updateCourse("fa18AAS35001", "comments", "BLLsssssYRGGGGGGG"))


     //    this.props.dispatch(AddMedia("Test", "www.111ur.ur..4444urcom", "link"))
}



    render() {
        console.log("REDURasdasdCER", this.props.requesterReducer)
    return (
      <div className="App">


        <p>Hello</p>

          {this.props.requesterPass === true && (<p>DId not pass</p>)}
          {this.props.requesterPass === false && (<MasterContainer/>)}


      </div>
    );
  }
}


function mapStateToProps({state, requesterReducer}) {
    let requesterPass = requesterReducer.hasOwnProperty("message") || Object.keys(requesterReducer).length === 0

    return {
        requesterPass,
        requesterReducer

    }
}



export default withRouter(connect(mapStateToProps)(App))