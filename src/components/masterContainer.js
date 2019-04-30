import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import ILearnItem from '../components/iLearnViewsContainer/SingleiLearnListItemView/SingleiLearnItem'

class MasterContainer extends Component {

    render() {
        return(
            <div>

                <p>Master Container</p>

                {this.props.isLoading && (
                    <p>Is Loading</p>
                )}

                {!this.props.isLoading && (
                    Object.keys(this.props.iLearnVideoReducer).map(id => (<ILearnItem id={id} key={id}/>))
                )}





            </div>

        )
    }


}




function mapStateToProps({iLearnVideoReducer, loadingStatusReducer}) {

    let isLoading = loadingStatusReducer['iLearnVideosLoading'] && Object.keys(iLearnVideoReducer).length === 0;
    console.log("ISLOADING", isLoading)
    return {
        iLearnVideoReducer,
        isLoading
    }
}


export default withRouter(connect(mapStateToProps)(MasterContainer))