import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";




class TabToolBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected_rows: []
        };

    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selected_rows !== this.state.selected_rows) {
            this.setState({selected_rows: this.props.selected_rows})

        }
    }

    render() {
        console.log("DA PROPS", this.props)
        return(
            <div>
                checkbox
                checkbox

            </div>

        )
    }

}

function mapStateToProps(state, {props}) {

    return {
        state,
        props
    }
}


export default withRouter(connect(mapStateToProps)(TabToolBar))