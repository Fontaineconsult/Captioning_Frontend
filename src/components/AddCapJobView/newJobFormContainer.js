import DatePicker from 'react-date-picker';
import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Select from "react-select";
import {addJobInfoToTempJob, completeTempJob} from "../../actions/tempJobsForm";
import Button from "@material-ui/core/Button";



class NewJobFormContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            comments: "",
            show_date: new Date(),
            delivery_format: "URL (Amara.org)"

        };
        this.addJobInfo = this.addJobInfo.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSetDate = this.handleSetDate.bind(this)

    }

    handleSetDate(value) {
        console.log(value)
        this.setState({show_date: value})

    }


    addJobInfo(event) {

        console.log(event)
        let requester_ids = Object.keys(this.props.requesterReducer);
        let requester_id = requester_ids.find(x => this.props.requesterReducer[x].course.course_gen_id === this.props.current_course)
        let employee_id = this.props.coursesReducer[this.props.current_course].employee_id;


        let reducer_obj = {show_date: this.state.show_date,
            delivery_format: this.state.delivery_format,
            comments: this.state.comments,
            employee_id: employee_id,
            requester_id: requester_id,
        };

        this.props.dispatch(addJobInfoToTempJob(this.props.transaction_id, reducer_obj))
        this.props.dispatch(completeTempJob(this.props.transaction_id, true))

    }


    handleInputChange(event) {



        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (!this.props.isLocked) {


            this.setState({
                [name]: value
            });

        }


    }


    componentDidUpdate(prevProps, prevState, snapshot) {


        if (prevProps.transaction_id !== this.props.transaction_id) {
            if (this.props.transaction_id === '') {
                this.setState({
                    comments: '',
                    show_date: new Date(),
                    delivery_format: "URL (Amara.org)"
                })
            }
        }
    }


    render() {

        return (

            <div>
                <p>NEW JOB FORM ASFDASDASD</p>
                <form>
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
                            value={this.state.comments}
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
                </form>
                <Button size="small"  onClick={e => this.addJobInfo(e)}>Complete Request</Button>
            </div>

        )
    }

}

function mapStateToProps({coursesReducer, mediaSearchReducer, errorsReducer, tempJobsFormReducer, requesterReducer}, {props, current_course, isLocked}) {



    return {
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer,
        requesterReducer,
        coursesReducer,
        props,
        isLocked,
        current_course
    }
}


export default withRouter(connect(mapStateToProps)(NewJobFormContainer))