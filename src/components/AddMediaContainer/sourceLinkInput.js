import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import {fetchMediaBySourceUrl} from '../../actions/ampApi/fetchData'
import { v1 as uuidv1 } from 'uuid';




class SourceURLInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            link: '',
            error_id: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkURL = this.checkURL.bind(this)
        this.checkError = this.checkError.bind(this)
    }
    checkURL(event) {
        if (this.state.link !== ''){
            this.state.error_id = uuidv1();
            this.props.dispatch(fetchMediaBySourceUrl(this.state.link, this.state.error_id))
        }
    }
    checkError(){
        return !!this.props.errorsReducer[this.state.error_id];
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(target)
        this.setState({
            [name]: value
        });
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Source Link:
                        <input
                            name="link"
                            type='text'
                            value={this.state.link}
                            onChange={this.handleInputChange}
                            onBlur={this.checkURL}/>
                    </label>
                </form>
            </div>

        )
    }

}

function mapStateToProps({mediaSearchReducer, errorsReducer}) {

    return {
        mediaSearchReducer,
        errorsReducer
    }
}


export default withRouter(connect(mapStateToProps)(SourceURLInput))