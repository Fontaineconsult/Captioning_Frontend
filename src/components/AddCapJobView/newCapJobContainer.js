
import {withRouter} from "react-router";
import {connect} from "react-redux";
import React, { Component } from "react";
import NewMediaContainer from '../AddMediaContainer/newMediaContainer'
import NewCapJobFormContainer from './newCapJobFormContainer'

class NewCapJobContainer extends Component {

    render() {

        return(

            <div>
                CapJobContainer
                <NewMediaContainer/>
                <NewCapJobFormContainer/>
            </div>

        )
    }


}




function mapStateToProps({mediaReducer, videosJobsReducer}) {



    return {
        mediaReducer,
        videosJobsReducer
    }
}


export default withRouter(connect(mapStateToProps)(NewCapJobContainer))