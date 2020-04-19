import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import mediaReducer from "../../reducers/media";
import JobMediaDisplayContainer from "./JobMediaDisplayContainer"
import {updateVideoJob} from "../../actions/ampApi/putData"
import jobContainer from "../../css/jobContainer.css"
import AstControls from "./astControls"
import AmaraControls from "./amaraControls";
import moment from 'moment'

class JobContainer extends Component {

    constructor(props) {
        super(props);
        this.prev_value = undefined;
        this.state = {
            comments: '',
            job_status: 'Queued',
            output_format: '',
            priority: false,
            request_date:  Date(),
            show_date: Date(),
            delivered_date: Date(),
            requester_id: '',
            rush_service_used: false,
            transcripts_only: false,
            employee_email: '',
            employee_first_name:'',
            employee_last_name:'',
            ast_job_id: 'Not Used'
        };

        this.updateState = this.updateState.bind(this)
        this.dispatchInput = this.dispatchInput.bind(this)
        this.saveCurrentValue = this.saveCurrentValue.bind(this)
    }

    updateState(event){

        const target = event.target;
        const value = target.name === 'priority' || target.name === 'rush_service_used' || target.name === 'transcripts_only' ? target.checked : target.value;
        const name = target.name;

        this.prev_value = this.state[name]
        this.setState({
            [name]: value
        });

    }

    dispatchInput(event) {
        const target = event.target;
        if (target.value !== this.prev_value) {
            this.props.dispatch(updateVideoJob(this.props.jobId, event.target.name, this.state[event.target.name]))

        }
    }

    saveCurrentValue(event) {

        const target = event.target;
        const name = target.name;
        this.prev_value = this.state[name]

    }

    componentDidMount() {
        let r = this.props.job
        let c = this.props.course
        let e = this.props.employee
        this.setState({
            comments: r.comments,
            job_status: r.job_status,
            output_format: r.output_format,
            priority: r.priority,
            request_date: moment(r.request_date).format("MMM Do YYYY"),
            show_date: moment(r.show_date).format("MMM Do YYYY"),
            delivered_date: moment(r.delivered_date).format("MMM Do YY"),
            requester_id: r.requester_id,
            rush_service_used: r.rush_service_used,
            transcripts_only: r.transcripts_only,
            ast_job_id: r.ast_job_id,
            employee_email: e.employee_email,
            employee_first_name: e.employee_first_name,
            employee_last_name: e.employee_last_name
        })

    }

    render() {

        return (
            <div className="job-container">

                <div className="upperJobContainer">
                    <div className="upperJobContainerLeft">
                        <div>Requester Resource: {this.props.requesterResource}</div>
                    </div>
                    <div className="upperJobContainerRight">
                        <div className="upperJobContainerRightContent"><label>Requester </label>{this.state.employee_first_name} {this.state.employee_last_name} </div>
                        <div className="upperJobContainerRightContent"><label>Email </label> {this.state.employee_email}</div>
                        <div className="upperJobContainerRightContent"><label>RID </label> {this.state.requester_id}</div>
                    </div>
                </div>
                <div className="lowerJobContainer">
                    <div className="lowerJobContainerLeft">
                        <form className="lowerJobContainerLeftForm">
                                <div className="upperJobContainerLeftContent">
                                    <label className="upperJobContainerLeftLabel">
                                        <div>Job Status</div>
                                            <select className="upperJobContainerLeftContentInput" name="job_status" onChange={this.updateState} onBlur={this.dispatchInput} onFocus={this.saveCurrentValue} value={this.state.job_status}>
                                                <option value="Queued">Queued</option>
                                                <option value="Captioning">Captioning</option>
                                                <option value="Ready">Ready</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="On Hold">On Hold</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                    </label>
                                </div>
                                <div className="upperJobContainerLeftContent">
                                    <label className="upperJobContainerLeftLabel">
                                        <div>Output Format</div>

                                    <select className="upperJobContainerLeftContentInput" name="output_format" onFocus={this.saveCurrentValue} onChange={this.updateState} onBlur={this.dispatchInput} value={this.state.output_format}>
                                        <option value="Amara">Amara</option>
                                        <option value=".SRT">.SRT</option>
                                        <option value="File">File</option>

                                    </select>

                                    </label>
                                </div>
                            <div className="upperJobContainerLeftContent">
                                <label className="upperJobContainerLeftLabel">
                                    <div>Request Date</div>
                                    <input className="upperJobContainerLeftContentInput" type="input" name="request_date"  onFocus={this.saveCurrentValue} value={this.state.request_date} onBlur={this.dispatchInput} onChange={this.updateState}/>
                                </label>
                            </div>
                            <div className="upperJobContainerLeftContent">
                                <label className="upperJobContainerLeftLabel">
                                    <div>Show Date</div>
                                    <input className="upperJobContainerLeftContentInput" type="input" name="show_date" onFocus={this.saveCurrentValue} value={this.state.show_date} onBlur={this.dispatchInput} onChange={this.updateState}/>
                                </label>
                            </div>
                            <div className="upperJobContainerLeftContent">
                                <label className="upperJobContainerLeftLabel">
                                    <div>Delivered Dat</div>
                                    <input className="upperJobContainerLeftContentInput" type="input" name="delivered_date" onFocus={this.saveCurrentValue} value={this.state.delivered_date} onBlur={this.dispatchInput} onChange={this.updateState}/>
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="lowerJobContainerRight">
                        <div className="jobMediaContainer">
                            {this.props.mediaReducer[this.props.mediaId]  && <JobMediaDisplayContainer mediaId={this.props.mediaId}/>}
                        </div>
                    </div>
                    <div className="commentsContainer">
                        <label>
                            Comments
                            <textarea className="commentsInput" type="input" name="comments"  onFocus={this.saveCurrentValue} value={this.state.comments} onBlur={this.dispatchInput} onChange={this.updateState}/>
                        </label>
                    </div>
                </div>
                <div className="jobControlsBar">
                    <form>
                        <label>
                            Priority
                            <input type="checkbox" name="priority" checked={this.state.priority} onFocus={this.saveCurrentValue} onBlur={this.dispatchInput} onChange={this.updateState}/>
                        </label>


                        <label>
                            Rush Service
                            <input type="checkbox" name="rush_service_used" checked={this.state.rush_service_used}  onFocus={this.saveCurrentValue} onBlur={this.dispatchInput} onChange={this.updateState}/>
                        </label>
                        <label>
                            Transcripts Requested
                            <input type="checkbox" name="transcripts_only" checked={this.state.transcripts_only}  onFocus={this.saveCurrentValue} onBlur={this.dispatchInput} onChange={this.updateState}/>
                        </label>

                    </form>
                </div>
                <div className="pluginControlsContainer">
                    <div className="pluginContainer">
                        <AstControls id={this.state.ast_job_id} />
                    </div>
                    <div className="pluginContainer">
                        <AmaraControls/>
                    </div>

                </div>
            </div>

        )

    }

}


function mapStateToProps({errorsReducer, videosJobsReducer, mediaReducer, requesterReducer, coursesReducer, employeesReducer, campusOrgReducer}, {props, jobId}) {
    let job = videosJobsReducer[jobId];
    let mediaId  = job.media.id;

    // let course = coursesReducer[requesterResource]
    let employee = '';
    let requesterResource = '';


    if (requesterReducer[job.requester_id].course_id !== null) {
        requesterResource = requesterReducer[job.requester_id].course_id
    } else {
        requesterResource = campusOrgReducer[requesterReducer[job.requester_id].campus_org_id].organization_name

    }








    if (employeesReducer[requesterReducer[job.requester_id].employee_id] !== undefined) {
         employee = employeesReducer[requesterReducer[job.requester_id].employee_id]

    } else {
         employee = employeesReducer[requesterReducer[job.requester_id].org_employee_id]
    }



    console.log("EMMPLOYEEEEE", employee)



    return {

        errorsReducer,
        videosJobsReducer,
        props,
        job,
        mediaReducer,
        mediaId,
        jobId,
        employee,
        requesterResource


    }
}

export default withRouter(connect(mapStateToProps)(JobContainer))