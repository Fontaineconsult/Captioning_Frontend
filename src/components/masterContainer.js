import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import ILearnItem from '../components/iLearnViewsContainer/SingleiLearnListItemView/SingleiLearnItem'
import NewCapJobContainer from './AddMediaContainer/newMediaContainer'
class MasterContainer extends Component {

    render() {

        return(

            <div>

                <p>Master Container</p>
                <NewCapJobContainer/>
                <p>Master Container</p>


            </div>

        )
    }


}




function mapStateToProps({iLearnVideoReducer, loadingStatusReducer}) {

    let isLoading = loadingStatusReducer['iLearnVideosLoading'] && Object.keys(iLearnVideoReducer).length === 0;

    return {
        iLearnVideoReducer,
        isLoading
    }
}


export default withRouter(connect(mapStateToProps)(MasterContainer))