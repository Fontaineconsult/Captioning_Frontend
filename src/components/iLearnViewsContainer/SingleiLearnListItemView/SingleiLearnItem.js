import React, { Component } from 'react';
import { connect } from 'react-redux'
import loadingStatusReducer from "../../../reducers/status";


class ILearnItem extends Component {

    render() {
        return(
            <div>
                    <p>iLearnItem: {this.props.currentItem['title']}</p>

            </div>

        )
    }


}




function mapStateToProps( {iLearnVideoReducer}, id) {
    id = id.id
    let currentItem = iLearnVideoReducer[id]


    return {

        currentItem,


    }
}

export default connect(mapStateToProps)(ILearnItem)