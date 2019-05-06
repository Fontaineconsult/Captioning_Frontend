import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import {AddMedia} from '../../actions/creators/putData'
// import { Formik } from 'formik';

class NewCapJobFormContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            link: '',
            type: '',

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(target);

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
                <p>NEW JOB FORM</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Show Date:
                        <input
                            name="title"
                            type='text'
                            value={this.state.title}
                            onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Output Format:
                        <input
                            name="link"
                            type='text'
                            value={this.state.link}
                            onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Comments:
                        <input
                            name="type"
                            type='text'
                            value={this.state.type}
                            onChange={this.handleInputChange} />
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


export default withRouter(connect(mapStateToProps)(NewCapJobFormContainer))