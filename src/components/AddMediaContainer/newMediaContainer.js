import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import {AddMediaToJob} from '../../actions/ampApi/postData'
import {fetchMediaBySourceUrl} from '../../actions/ampApi/fetchData'
import Select from 'react-select'
// import { Formik } from 'formik';
import SourceURLInput from './sourceLinkInput'
class NewMediaContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            cap_location: '',
            source_location: '',
            type: '',

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkURL = this.checkURL.bind(this)
    }

    checkURL(event) {
        if (this.state.link !== ''){
            this.props.dispatch(fetchMediaBySourceUrl(this.state.link))
        }
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
        this.props.dispatch(AddMediaToJob(this.state.title, this.state.source_location, this.state.type, this.props.transaction_id));
        event.preventDefault();


    }



    componentDidMount() {

        this.setState({source_location: this.props.transaction_link})
        console.log("PROPSSS", this.props.mediaSearchReducer)
        // this.setState({source_location: this.props.mediaSearchReducer[this.props.transaction_id].source_url,
        //                     title: this.props.mediaSearchReducer[this.props.transaction_id].title
        // })

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
                        size="50"
                        value={this.state.title}
                        onChange={this.handleInputChange}/>

                </label>
                <br />
                <label>
                    Source Location
                    <input
                        name="source_location"
                        type='text'
                        size="50"
                        value={this.state.source_location}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <br />
                <label>
                    Video Type:
                    <select name="type" value={this.state.type} onChange={this.handleInputChange}>
                        <option value="URL">URL</option>
                        <option value="File">File</option>
                    </select>
                </label>
                <input
                    name="submit"
                    type="submit"
                    onClick={this.handleSubmit}
                />
            </form>
            </div>

        )
    }


}




function mapStateToProps({mediaSearchReducer, errorsReducer, tempJobsFormReducer}, {transaction_id, transaction_link}) {



    return {
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer,
        transaction_id,
        transaction_link

    }
}


export default withRouter(connect(mapStateToProps)(NewMediaContainer))