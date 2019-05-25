import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import ILearnMasterContainer from './iLearnViewsContainer/iLearnMasterContainer/iLearnMasterContainerView'

import NewCapJobContainer from './AddCapJobView/newCapJobContainer'


class MasterContainer extends Component {

    render() {

        return(

            <div>
                <p>Master Container</p>

                <ILearnMasterContainer/>


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