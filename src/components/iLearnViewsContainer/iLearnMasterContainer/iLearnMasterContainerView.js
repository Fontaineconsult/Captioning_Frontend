import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import ILearnCourseContainer from '../../iLearnViewsContainer/iLearnCourseContainer/iLearnCourseContainerView'



class ILearnMasterContainer extends Component {

    render() {

        return(

            <div>

                <p>Your iLearn Videos</p>
                {this.props.isLoading === true && (<p>Loading</p>)}

                {this.props.isLoading === false && (Object.keys(this.props.coursesReducer).map((course, i) =>(
                        <ILearnCourseContainer course_id={course} key={i}/>

                    )))}





            </div>

        )
    }


}




function mapStateToProps({iLearnVideoReducer, loadingStatusReducer, coursesReducer}) {



    let isLoading = loadingStatusReducer['iLearnVideosLoading'] && Object.keys(iLearnVideoReducer).length === 0;

    return {
        coursesReducer,
        isLoading
    }
}


export default withRouter(connect(mapStateToProps)(ILearnMasterContainer))