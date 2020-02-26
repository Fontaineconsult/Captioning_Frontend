import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import {AddMedia} from '../../actions/creators/postData'
// import { Formik } from 'formik';

class NewMediaContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            link: '',
            type: '',

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleSubmit(event){
        this.props.dispatch(AddMedia(this.state.title, this.state.link, this.state.type));
        event.preventDefault();
        this.setState({title:"", link:"", type:""})

    }

    render() {

        return(
            <div>
                <p>NEW MEDIA FORM</p>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Video Title:
                    <input
                        name="title"
                        type='text'
                        value={this.state.title}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Source Link:
                    <input
                        name="link"
                        type='text'
                        value={this.state.link}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Video Type:
                    <input
                        name="type"
                        type='text'
                        value={this.state.type}
                        onChange={this.handleInputChange} />

                    <input
                    name="submit"
                    type='submit'
                    onChange={this.handleSubmit} />
                </label>
            </form>
            </div>

        )
    }


}




function mapStateToProps({state}) {



    return {
        state
    }
}


export default withRouter(connect(mapStateToProps)(NewMediaContainer))