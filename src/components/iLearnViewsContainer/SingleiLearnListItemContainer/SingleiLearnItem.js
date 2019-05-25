import React, { Component } from 'react';
import { connect } from 'react-redux'



class ILearnItem extends Component {

    render() {
        return(
            <div>
                    <p>iLearnVideo</p>

            </div>

        )
    }


}




function mapStateToProps( {iLearnVideoReducer}) {



    return {

        iLearnVideoReducer

    }
}

export default connect(mapStateToProps)(ILearnItem)