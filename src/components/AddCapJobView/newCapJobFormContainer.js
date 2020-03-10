import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import {AddMediaToJob} from '../../actions/ampApi/postData'
import {addJobInfoToTempJob} from '../../actions/tempJobsForm'
import { v4 as uuidv4 } from 'uuid';
import Select from "react-select";
import DatePicker from 'react-date-picker';
import {addCapJob} from "../../actions/newCapJob";
// import { Formik } from 'formik';
import {AddVideoJob} from  "../../actions/ampApi/postData"

class NewCapJobFormContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show_date: new Date(),
            delivery_format: "URL (Amara.org)",
            comments: '',
            course: {value: '', label:''},
            employee_id: '',
            requester_id: ''

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSetDate = this.handleSetDate.bind(this);
    }

    handleSelectChange(value) {
        let requester_ids = Object.keys(this.props.requesterReducer);
        let requester_id = requester_ids.find(x => this.props.requesterReducer[x].course.course_gen_id === value.value)
        let employee_id = this.props.coursesReducer[value.value].employee_id;


        this.setState( {course: value,
                             employee_id: employee_id,
                             requester_id: requester_id});

        let reducer_obj = {show_date: this.state.show_date,
                            delivery_format: this.state.delivery_format,
                            comments: this.state.comments,
                            employee_id: employee_id,
                            requester_id: requester_id};

        this.props.dispatch(addJobInfoToTempJob(this.props.transaction_id, reducer_obj))

    }
    handleSetDate(value) {
        console.log(value)
        this.setState({show_date: value})

    }

    handleInputChange(event) {
        console.log(event);
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event){
        let media_id = this.props.mediaSearchReducer[this.props.transaction_id].id;
        event.preventDefault();

        this.props.dispatch(AddVideoJob(this.state.requester_id,
                                        this.state.show_date,
                                        media_id,
                                        this.state.output_format,
                                        this.state.comments))

    }
    render() {

        return(
            <div>
                <p>NEW JOB FORM</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Show Date:
                        <DatePicker name="show_date" value={this.state.show_date} onChange={this.handleSetDate}/>
                    </label>
                    <br />
                    <label>
                        Comments:
                        <input
                            name="comments"
                            type='text'
                            value={this.state.link}
                            onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Output:
                        <select name="delivery_format" value={this.state.delivery_format} onChange={this.handleInputChange}>
                            <option value="URL (Amara.org)">URL (Amara.org)</option>
                            <option value="SRT">Caption File (.SRT)</option>
                            <option value="Video File">Video File (.mp4)</option>
                        </select>
                    </label>
                    <Select value={this.state.course} options={this.props.courses_list} onChange={this.handleSelectChange}/>
                    <button onClick={this.handleSubmit}>Add Request</button>
                </form>
            </div>

        )
    }


}

function mapStateToProps({coursesReducer, mediaSearchReducer, tempJobReducer, requesterReducer}, {transaction_id}) {

    let courses_list = Object.keys(coursesReducer).map(current_course => {





        return {value: current_course , label: current_course,}
    });

    return {
        coursesReducer,
        transaction_id,
        courses_list,
        tempJobReducer,
        mediaSearchReducer,
        requesterReducer
    }
}


export default withRouter(connect(mapStateToProps)(NewCapJobFormContainer))