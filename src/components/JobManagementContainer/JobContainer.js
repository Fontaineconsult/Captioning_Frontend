import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import mediaReducer from "../../reducers/media";
import JobMediaDisplayContainer from "./JobMediaDisplayContainer"
import {updateVideoJob} from "../../actions/ampApi/putData"
import jobContainer from "../../css/jobContainer.css"


const tempStyle = {

    height: '100px'

}

class JobContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: '',
            job_status: 'Queued',
            output_format: '',
            priority: false,
            request_date: Date(),
            show_date: Date(),
            delivered_date: Date(),
            requester_id: '',
            rush_service_used: false,
            transcripts_only: false,
            employee_email: '',
            employee_first_name:'',
            employee_last_name:''
        };

        this.updateState = this.updateState.bind(this)
        this.dispatchInput = this.dispatchInput.bind(this)
    }

    updateState(event){
        const target = event.target;
        const value = target.name === 'priority' || target.name === 'rush_service_used' || target.name === 'transcripts_only' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    dispatchInput(event) {
        this.props.dispatch(updateVideoJob(this.props.jobId, event.target.name, this.state[event.target.name]))
    }

    componentDidMount() {
        let r = this.props.job
        let c = this.props.course
        this.setState({
            comments: r.comments,
            job_status: r.job_status,
            output_format: r.output_format,
            priority: r.priority,
            request_date: r.request_date,
            show_date: r.show_date,
            delivered_date: r.delivered_date,
            requester_id: r.requester_id,
            rush_service_used: r.rush_service_used,
            transcripts_only: r.transcripts_only,
            employee_email: c.course_instructor.employee_email,
            employee_first_name: c.course_instructor.employee_first_name,
            employee_last_name: c.course_instructor.employee_last_name


        })

    }

    render() {

        return (
            <div className="job-container">
                <br/>
                Job Container
                <div>Requester Course: {this.props.requester_course_id}</div>
                <div>Instructor: {this.state.employee_first_name} {this.state.employee_last_name} </div>
                <div>Email: {this.state.employee_email}</div>
                <div style={tempStyle}>
                    <form>
                        <label>
                            Comments
                            <input type="input" name="comments" value={this.state.comments} onBlur={this.dispatchInput} onChange={this.updateState}/>
                        </label>

                        <label>
                            Job Status
                            <select name="job_status" onChange={this.updateState} onBlur={this.dispatchInput} value={this.state.job_status}>
                                <option value="Queued">Queued</option>
                                <option value="Captioning">Captioning</option>
                                <option value="Ready">Ready</option>
                                <option value="Delivered">Delivered</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </label>
                        <label>
                            Output Format
                            <input type="input" name="output_format" value={this.state.output_format} onBlur={this.dispatchInput} onChange={this.updateState}/>
                        </label>

                        <label>
                            Priority
                            <input type="checkbox" name="priority" checked={this.state.priority} onBlur={this.dispatchInput} onChange={this.updateState}/>
                        </label>
                        <label>
                            Request Date
                            <input type="input" name="request_date" value={this.state.request_date} onBlur={this.dispatchInput} onChange={this.updateState}/>
                        </label>
                        <label>
                            Show Date
                            <input type="input" name="show_date" value={this.state.show_date} onBlur={this.dispatchInput} onChange={this.updateState}/>
                        </label>
                        <label>
                            Delivered Date
                            <input type="input" name="show_date" value={this.state.delivered_date} onBlur={this.dispatchInput} onChange={this.updateState}/>
                        </label>
                        <label>
                            Requester ID
                            <div>{this.state.requester_id}</div>
                        </label>

                        <label>
                            Rush Service
                            <input type="checkbox" name="rush_service_used" checked={this.state.rush_service_used} onBlur={this.dispatchInput} onChange={this.updateState}/>
                        </label>
                        <label>
                            Transcripts Requested
                            <input type="checkbox" name="transcripts_only" checked={this.state.transcripts_only} onBlur={this.dispatchInput} onChange={this.updateState}/>
                        </label>

                    </form>
                    <div>
                        {this.props.mediaReducer[this.props.mediaId]  && <JobMediaDisplayContainer mediaId={this.props.mediaId}/>}
                    </div>
                </div>
            </div>

        )


    }


}


function mapStateToProps({errorsReducer, videosJobsReducer, mediaReducer, requesterReducer, coursesReducer}, {props, jobId}) {
    let job = videosJobsReducer[jobId];

    let mediaId  = job.media.id;
    console.log("REQUESTER ID", job.requester_id, requesterReducer[job.requester_id])
    let requester_course_id = requesterReducer[job.requester_id].course.course_gen_id
    let course = coursesReducer[requester_course_id]

    return {

        errorsReducer,
        videosJobsReducer,
        props,
        job,
        mediaReducer,
        mediaId,
        jobId,
        requester_course_id,
        course


    }
}

export default withRouter(connect(mapStateToProps)(JobContainer))