import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import ILearnMasterContainer from './iLearnViewsContainer/iLearnMasterContainer/iLearnMasterContainerView'
import {fetchCourseByCourseGenId, fetchiLearnVideosByCourseGenId} from "../actions/creators/fetchData";

import NewCapJobContainer from './AddCapJobView/newCapJobContainer'


class MasterContainer extends Component {

    componentDidMount() {
        console.log("GERRGGG:", this.props)


        Object.keys(this.props.requesterReducer).map(key => (
            this.props.dispatch(fetchCourseByCourseGenId(this.props.requesterReducer[key].course_id))

        ))
        Object.keys(this.props.requesterReducer).map(key => (
            this.props.dispatch(fetchiLearnVideosByCourseGenId(this.props.requesterReducer[key].course_id))

        ))

    }



    render() {

        return(

            <div>
                <p>Master Container</p>
                <ILearnMasterContainer/>
            </div>

        )
    }


}


function mapStateToProps({requesterReducer}){
    console.log("REDERCER", requesterReducer)

    return {
        requesterReducer

    }


}



export default withRouter(connect(mapStateToProps)(MasterContainer))