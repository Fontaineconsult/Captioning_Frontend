import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import JobContainer from "./JobContainer";
import Select from "react-select";
import ClearIcon from '@material-ui/icons/Clear';
import videosJobsReducer from "../../reducers/existingVideoJobs";





class JobManagementControlContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videoJobs: this.props.videosJobsReducer,
            courseIds: {},
            filterSelectedCourse: '',
        };

        this.reductionFilter = this.reductionFilter.bind(this);
        this.removeFilters = this.removeFilters.bind(this);
    }


    removeFilters() {

        this.setState({
            videoJobs: this.props.videosJobsReducer

        })

    }

    reductionFilter(value, key) {

        console.log("value", value, "key", key)
        console.log("SDFDSF", value[key])

        let filter = Object.keys(this.props.videosJobsReducer).reduce((accumulator, element) => {
            console.log(this.props.videosJobsReducer[element][key], value[key], this.props.videosJobsReducer[element][key] === value[key])
            if (this.props.videosJobsReducer[element][key] === value[key]) {
                accumulator[element] = this.props.videosJobsReducer[element]
            }
            return accumulator
        }, {});
        this.setState({videoJobs:filter})
    }


    componentDidMount() {

        // let requester_id = requester_ids.find(x => this.props.requesterReducer[x].course_id === this.props.current_course)

    }

    render() {


        return (

            <div className="JobManagementControlContainer">
                <div className="control-bar">
                    <div className="controlBarNavButtons">
                        <div className="controlButton">
                            Courses
                        </div >
                        <div className="controlButton" >
                            Filters
                        </div>
                        <div className="controlButton">
                            Videos
                        </div>

                    </div>
                    <div className="jobManagementFilters">
                        <div className="filtersOuterContainer">
                            <div className="requesterFilterContainer">
                                <Select
                                        options={[
                                        {value:"Queued", label:"Queued", job_status:"Queued"},
                                        {value:"Captioning", label:"Captioning",job_status:"Captioning"},
                                        {value:"Ready", label:"Ready", job_status:"Ready"},
                                        {value:"Delivered", label:"Delivered", job_status:"Delivered"},
                                        {value:"Cancelled", label:"Cancelled", job_status:"Cancelled"},
                                        {value:"On Hold", label:"On Hold", job_status:"On Hold"},
                                    ]}
                                        onChange={(value, key, event) => this.reductionFilter(value, 'job_status')}/>
                            </div>
                            <div className="requesterFilterContainer">
                                <Select
                                    options={this.props.courseSelectorContent}

                                    onChange={(value, key, event) => this.reductionFilter(value, 'requester_id')}/>
                            </div>
                            <div>
                                <ClearIcon onClick={this.removeFilters}  />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contentContainer">
                    {!this.props.jobsLoading && Object.keys(this.state.videoJobs).map(job => (
                        <JobContainer key={job} jobId={job}/>
                    ))}
                </div>
            </div>
        )
    }

}


function mapStateToProps({loadingStatusReducer, errorsReducer, videosJobsReducer, requesterReducer, coursesReducer}, {jobsLoading}) {

    let requester = {};
    let courseSelectorContent = {};

    if (Object.keys(requesterReducer).length > 0 && Object.keys(videosJobsReducer).length > 0) {

        let requester_ids = Object.keys(videosJobsReducer).map(x => {
            return videosJobsReducer[x].requester_id
        });

        requester = requester_ids.reduce((accumulator, element) => {
            accumulator[element] = {id: requesterReducer[element].id, course_id: requesterReducer[element].course_id}
            return accumulator

        }, {});

        courseSelectorContent = requester_ids.map(x => {
            return {value: requesterReducer[x].course_id, label:requesterReducer[x].course_id, requester_id:requesterReducer[x].id}
        }).reduce((accumulator, element) => {
            if (accumulator.some(e => e.requester_id === element.requester_id)) {
                return accumulator
            } else {
                return [...accumulator, element]
            }
        }, []);

    }

    return {
        videosJobsReducer,
        jobsLoading,
        requesterReducer,
        coursesReducer,
        requester,
        courseSelectorContent

    }
}

export default withRouter(connect(mapStateToProps)(JobManagementControlContainer))