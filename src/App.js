import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route} from 'react-router-dom'
import {withRouter} from "react-router";
import {fetchAllCourses} from "../src/actions/shared";


class App extends Component {

    componentDidMount() {
        this.props.dispatch(fetchAllCourses())

    }


    render() {
    return (
      <div className="App">
        <p>Hello</p>
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