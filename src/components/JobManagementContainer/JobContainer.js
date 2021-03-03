import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import mediaReducer from "../../reducers/media";
import JobMediaDisplayContainer from "./JobMediaDisplayContainer"
import MediaContentContainer from "./jobMediaContentContainer"
import {updateVideoJob, deleteVideoJob} from "../../actions/ampApi/putData"
import jobContainer from "../../css/jobContainer.css"
import AstControls from "./astControls"
import AmaraControls from "./amaraControlsContainer";
import DatePicker from 'react-date-picker';
import ClearIcon from '@material-ui/icons/Clear';
import moment from "moment";
import {iLearnURL} from "../../constants";

const statusColor = (status) => ({
    "Queued": "linear-gradient(to left, rgba(63, 123, 191, 0), rgb(63, 123, 191))",
    "Captioning": "linear-gradient(to left, rgba(172, 57, 91, 0), rgb(172, 57, 91))",
    "Ready": "linear-gradient(to left, rgba(172, 143, 57, 0), rgb(172, 143, 573))",
    "Delivered": "linear-gradient(to left, rgba(114, 172, 57, 0), rgb(114, 172, 57))",
    "On Hold": "linear-gradient(to left, rgba(257, 172, 139, 0), rgb(57, 172, 139))",
    "Cancelled": "linear-gradient(to left, rgba(17, 18, 38, 0), rgb(17, 18, 38))"


})[status]



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
            delivered_date: new Date(),
            requester_id: '',
            rush_service_used: false,
            transcripts_only: false,
            employee_email: '',
            employee_first_name:'',
            employee_last_name:'',
            ast_job_id: 'Not Used',
            isFocused: false

        };

        this.updateState = this.updateState.bind(this)
        this.dispatchInput = this.dispatchInput.bind(this)
        this.saveCurrentValue = this.saveCurrentValue.bind(this)
        this.handleSetDate = this.handleSetDate.bind(this)
        this.saveCurrentDateValue = this.saveCurrentDateValue.bind(this)
        this.dispatchDateInput = this.dispatchDateInput.bind(this)
        this.deleteRecord = this.deleteRecord.bind(this)
        this.jobFocusedStyle = this.jobFocusedStyle.bind(this)
        this.setFocus = this.setFocus.bind(this)
        this.clearFocus = this.clearFocus.bind(this)
        this.ilearnPage = iLearnURL() + this.props.ilearn_page_id;
    }


    deleteRecord(event) {

        if (window.confirm("Are you sure you want to delete this record?")) {
            this.props.dispatch(deleteVideoJob(this.props.jobId, "deleted", true))

        }

    }

    handleSetDate(value, name) {


        this.setState({[name]: value})
    }

    saveCurrentDateValue(value, name) {

        this.prev_value = this.state[name]

    }

    dispatchDateInput(value, name) {
        if (value !== this.prev_value) {
            this.props.dispatch(updateVideoJob(this.props.jobId, name, this.state[name]))
        }
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
            if (this.state[event.target.name] === "Delivered") {
                this.props.dispatch(updateVideoJob(this.props.jobId, "delivered_date", new Date()))

            }


        }
    }

    saveCurrentValue(event) {

        const target = event.target;
        const name = target.name;
        this.prev_value = this.state[name]

    }

    jobFocusedStyle() {
        if (this.state.isFocused) {
            return(
                {"background": "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 74%, rgba(237,235,235,1) 95%, rgba(207,207,207,1) 98%, rgba(148,148,148,1) 100%)",
                    "box-shadow": "6px 8px 3px #808385"}
            )
        }

    }
    setFocus() {

        this.setState(
            {isFocused:true}
        )
    }

    clearFocus() {
        this.setState(
            {isFocused:false}
        )
    }

    componentDidMount() {
        let r = this.props.job
        let e = this.props.employee
        this.setState({
            comments: r.comments,
            job_status: r.job_status,
            output_format: r.output_format,
            priority: r.priority,
            request_date: r.request_date,
            show_date: r.show_date,
            delivered_date: moment(r.delivered_date).isValid ? r.delivered_date: moment(null),
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
            <div className="job-container masterListItem" style={this.jobFocusedStyle()} tabIndex={0} onFocus={this.setFocus} onBlur={this.clearFocus}>
                <div className={"job-container-left"} style={{'background':statusColor(this.state.job_status)}}>
                    <span className={'job-status-color'}></span>
                </div>
                <div className={"job-container-right"}>
                    <div className="upperJobContainer">
                        <div className="upperJobContainerLeft">
                            <div tabIndex={0}>Requester Resource: {this.props.requesterResource}</div>
                        </div>
                        <div className="upperJobContainerRight">
                            <div tabIndex={0} className="upperJobContainerRightContent">Requester: {this.state.employee_first_name} {this.state.employee_last_name} </div>
                            <div tabIndex={0} className="upperJobContainerRightContent">Email: {this.state.employee_email}</div>
                            <div className="upperJobContainerRightContent">RID: {this.state.requester_id}</div>
                            <div className={'deleteJobIcon'}><ClearIcon onClick={this.deleteRecord}/></div>
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
                                            <option value="SRT">.SRT</option>
                                            <option value="File">File</option>
                                            <option value="Open Caption">Open Cap</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="upperJobContainerLeftContent">
                                    <label className="upperJobContainerLeftLabel">
                                        <div>Request Date</div>
                                        <DatePicker className="upperJobContainerLeftContentInput"
                                                    name="request_date"
                                                    clearIcon={null}
                                                    calendarIcon={null}
                                                    onFocus={(date) => this.saveCurrentDateValue(date, "request_date")}
                                                    value={new Date(this.state.request_date)}
                                                    onBlur={(date) => this.dispatchDateInput(date,"request_date")}
                                                    onChange={(date)=> this.handleSetDate(date, 'request_date')}
                                        />
                                    </label>
                                </div>
                                <div className="upperJobContainerLeftContent">
                                    <label className="upperJobContainerLeftLabel">
                                        <div>Show Date</div>
                                        <DatePicker className="upperJobContainerLeftContentInput"
                                                    name="show_date"
                                                    clearIcon={null}
                                                    calendarIcon={null}
                                                    onFocus={(date) => this.saveCurrentDateValue(date, "show_date")}
                                                    value={new Date(this.state.show_date)}
                                                    onBlur={(date) => this.dispatchDateInput(date,"show_date")}
                                                    onChange={(date)=> this.handleSetDate(date, 'show_date')}
                                        />
                                    </label>
                                </div>
                                <div className="upperJobContainerLeftContent">
                                    <label className="upperJobContainerLeftLabel">
                                        <div>Delivered Date</div>
                                        <DatePicker className="upperJobContainerLeftContentInput"
                                                    name="delivered_date"
                                                    clearIcon={null}
                                                    calendarIcon={null}
                                                    onFocus={(date) => this.saveCurrentDateValue(date, "delivered_date")}
                                                    value={this.state.delivered_date}
                                                    onBlur={(date) => this.dispatchDateInput(date,"delivered_date")}
                                                    onChange={(date)=> this.handleSetDate(date, 'delivered_date')}
                                        />
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className="lowerJobContainerRight">
                            <div className="jobMediaContainer">
                                {this.props.mediaReducer[this.props.mediaId]  && <JobMediaDisplayContainer mediaId={this.props.mediaId}/>}
                            </div>
                            <div className="joMediaContentContainer">
                                <MediaContentContainer mediaId={this.props.mediaId}/>

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
                            <label style={{'margin-right': '10px'}}>
                                Priority
                                <input type="checkbox" name="priority" checked={this.state.priority} onFocus={this.saveCurrentValue} onBlur={this.dispatchInput} onChange={this.updateState}/>
                            </label>

                            <label style={{'margin-right': '10px'}}>
                                Rush Service
                                <input type="checkbox" name="rush_service_used" checked={this.state.rush_service_used}  onFocus={this.saveCurrentValue} onBlur={this.dispatchInput} onChange={this.updateState}/>
                            </label>
                            <label style={{'margin-right': '10px'}}>
                                Transcripts Requested
                                <input type="checkbox" name="transcripts_only" checked={this.state.transcripts_only}  onFocus={this.saveCurrentValue} onBlur={this.dispatchInput} onChange={this.updateState}/>
                            </label>
                            {this.props.ilearn_page_id !== undefined && (
                                <label style={{'margin-right': '10px'}}>
                                    iLearn:
                                    <a target={"_blank"} href={this.ilearnPage}>{this.props.ilearn_page_id}</a>
                                </label>
                            )}


                        </form>
                    </div>
                    <div className="pluginControlsContainer">
                        <div className="pluginContainer">
                            <AstControls job_id={this.props.jobId} ast_jobs={this.props.job.ast_jobs} media_id = {this.props.job.media.id} />
                        </div>
                        <div className="pluginContainer">
                            <AmaraControls media_id={this.props.mediaId}/>
                        </div>
                    </div>
                </div>
            </div>

        )

    }

}


function mapStateToProps({errorsReducer, videosJobsReducer, mediaReducer, requesterReducer, coursesReducer, employeesReducer, campusOrgReducer}, {props, jobId}) {
    let job = videosJobsReducer[jobId];

    let mediaId = ''
    if (job !== undefined){mediaId = job.media.id}


    // let course = coursesReducer[requesterResource]
    let employee = '';
    let requesterResource = '';



    if (job !== undefined){

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


    }

    let ilearn_page_id = undefined
    if (coursesReducer[requesterResource] !== undefined){
        ilearn_page_id = coursesReducer[requesterResource].ilearn_page_id.ilearn_page_id

    }


    return {

        errorsReducer,
        videosJobsReducer,
        props,
        job,
        mediaReducer,
        mediaId,
        jobId,
        employee,
        requesterResource,
        ilearn_page_id


    }
}

export default withRouter(connect(mapStateToProps)(JobContainer))