import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import JobContainer from "./JobContainer";
import Select from "react-select";
import ClearIcon from '@material-ui/icons/Clear';
import videosJobsReducer from "../../reducers/existingVideoJobs";
import {customStyles} from './selectCustomStyle'
import moment from "moment"
import {CSSTransition, TransitionGroup}  from 'react-transition-group';
import jobContainer from '../../css/jobContainer.css'
import NavMaster from '../../css/NavMaster.css'
import {LoadingVideoJobs} from "../../actions/status";
import campusOrgReducer from "../../reducers/campusOrgs";
import {List, AutoSizer, Collection  } from "react-virtualized";

class JobManagementControlContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videoJobs: [],

            filterSelectedCourse: '',
            job_status_value: '',
            order_by_value: '',
            job_status: 'semesterJobs'

        };

        this.reductionFilter = this.reductionFilter.bind(this);
        this.removeFilters = this.removeFilters.bind(this);
        this.orderByFilter = this.orderByFilter.bind(this);
        this.updateJobStatusFilter = this.updateJobStatusFilter.bind(this)
        this.renderRow = this.renderRow.bind(this)

    }

    removeFilters(event) {
        if (event.charCode  === 13 || event.type === 'click') {
            this.setState({
                videoJobs: Object.keys(this.props.videosJobsReducer).map((key) => this.props.videosJobsReducer[key].id),
                job_status_value: '',
                order_by_value: '',
                filterSelectedCourse: '',
            })
        }
    }

    reductionFilter(value, key) {

        let filter = []

        switch (key) {
            case "job_status":
                filter = this.state.videoJobs.reduce((accumulator, element) => {
                    if (this.props.videosJobsReducer[element].job_status === value[key]) {
                        accumulator.push(element)
                    }
                    return accumulator
                }, []);

                this.setState({videoJobs:filter,
                                    job_status_value: value
                });
                break;
            case "requester_id":

                filter = this.state.videoJobs.reduce((accumulator, element) => {
                    if (this.props.videosJobsReducer[element].requester_id === value[key]) {
                        accumulator.push(element)
                    }
                    return accumulator
                }, []);

                this.setState({videoJobs:filter,
                    filterSelectedCourse: value
                });
                break
        }
    }

    orderByFilter(value, key) {
        let list_filter = this.state.videoJobs.reduce((accumulator, element) => {
            accumulator.push(this.props.videosJobsReducer[element])
            return accumulator
        },[])

        let filter = list_filter.sort((a,b) => moment(b[key]) -  moment(a[key]))

        let to_return = filter.reduce((accumulator, element) => {

            accumulator.push(element.id)
            return accumulator
        },[])

        this.setState({
            videoJobs:to_return,
            order_by_value: value
        })
    }

    updateJobStatusFilter(value) {
        this.setState({job_status:value,
                            videoJobs: this.props[value].map((key) => this.props.videosJobsReducer[key].id)})


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Only runs if no filters are set.
        if (this.state.filterSelectedCourse === '' && this.state.job_status_value === '' && this.state.order_by_value === '') {
            if (this.state.videoJobs.length !== this.props[this.state.job_status].length) {
                this.setState({
                    videoJobs: this.props[this.state.job_status].map((key) => this.props.videosJobsReducer[key].id)
                })
            }
        }

    }
    
    componentDidMount() {
        this.setState({
            videoJobs: this.props.semesterJobs.map((key) => this.props.videosJobsReducer[key].id)
        })

    }

    renderRow({index, key, style}) {

        if (Object.keys(this.props.mediaReducer).length > 0) {
            return(
                <div style={style}>
                    <JobContainer key={key} jobId={this.state.videoJobs[index]} />
                </div>
            )
        } else {
            return(
                "Loading"
            )
    }}

    render() {

        return (

            <div className="JobManagementControlContainer">
                <div className="control-bar">
                    <div className="controlBarNavButtons">
                        <div tabIndex={0} role={'button'} className="navButton"
                             onClick={() => this.updateJobStatusFilter("semesterJobs")}
                             onKeyPress={event => {if (event.key === 'Enter'){this.updateJobStatusFilter("semesterJobs")}}}>
                            Semester Jobs <span className={"jobCount"}>{this.props.semesterJobsCount}</span>
                        </div >
                        <div tabIndex={0} role={'button'} className="navButton"
                             onClick={() => this.updateJobStatusFilter("activeJobs")}
                             onKeyPress={event => {if (event.key === 'Enter'){this.updateJobStatusFilter("activeJobs")}}}>
                            Active Jobs <span className={"jobCount"}>{this.props.activeJobsCount}</span>
                        </div >
                        <div tabIndex={0} role={'button'} className="navButton"
                             onClick={() => this.updateJobStatusFilter("completeJobs")}
                             onKeyPress={event => {if (event.key === 'Enter'){this.updateJobStatusFilter("completeJobs")}}}>
                            Complete Jobs <span className={"jobCount"}>{this.props.completeJobsCount}</span>
                        </div >
                    </div>
                </div>
                <div className="filtersMainContainer">
                    <div className="jobManagementFilters">
                        <div className="filtersOuterContainer">
                            <div className="requesterFilterContainer">
                                <label>
                                    <div className="filterTitles">Job Status</div>
                                    <Select styles={customStyles}
                                            options={[
                                                {value:"Queued", label:"Queued", job_status:"Queued"},
                                                {value:"Captioning", label:"Captioning",job_status:"Captioning"},
                                                {value:"Ready", label:"Ready", job_status:"Ready"},
                                                {value:"Delivered", label:"Delivered", job_status:"Delivered"},
                                                {value:"Cancelled", label:"Cancelled", job_status:"Cancelled"},
                                                {value:"On Hold", label:"On Hold", job_status:"On Hold"},
                                            ]}
                                            value={this.state.job_status_value}
                                            onChange={(value) => this.reductionFilter(value, 'job_status')}/>
                                </label>
                            </div>
                            <div className="requesterFilterContainer">
                                <label>
                                    <div className="filterTitles">Requester</div>
                                    <Select
                                        styles={customStyles}
                                        options={this.props.courseSelectorContent}
                                        value={this.state.filterSelectedCourse}
                                        onChange={(value, key, event) => this.reductionFilter(value, 'requester_id')}/>
                                </label>
                            </div>
                            <div className="requesterFilterContainer">
                                <label>
                                    <div className="filterTitles">Order By</div>
                                    <Select
                                        styles={customStyles}
                                        value={this.state.order_by_value}
                                        options={[
                                            {value:"request_date", label:"Request Date", date:"request_date"},
                                            {value:"show_date", label:"Show Date", date:"show_date"},
                                            {value:"delivered_date", label:"Delivered Date", date:"delivered_date"},
                                        ]}
                                        onChange={(value, key, event) => this.orderByFilter(value, value.date)}/>
                                </label>
                            </div>
                            <div>
                                <ClearIcon tabIndex={0} onKeyPress={this.removeFilters} onClick={this.removeFilters}  />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="contentContainer jobContentContainer">
                        <AutoSizer>
                            {
                                ({ width, height }) => {
                                    return <List
                                        width={width}
                                        height={height}
                                        rowHeight={287}
                                        rowRenderer={this.renderRow}
                                        rowCount={this.state.videoJobs.length}
                                        data={this.state.videoJobs}
                                        overscanRowCount={5}/>
                                }
                            }
                        </AutoSizer>
                </div>
            </div>
        )
    }
}

function mapStateToProps({loadingStatusReducer,mediaReducer, errorsReducer, videosJobsReducer, requesterReducer, coursesReducer, campusOrgReducer}, {jobsLoading}) {

    let requester = {};
    let courseSelectorContent = [];
    let requester_1
    let semesterJobs = Object.keys(videosJobsReducer)

    let activeJobs = Object.keys(videosJobsReducer).filter((videoJobId) => {
        return videosJobsReducer[videoJobId].job_status === 'Queued' ||
            videosJobsReducer[videoJobId].job_status === "Captioning" ||
            videosJobsReducer[videoJobId].job_status === 'Ready'

    })
    let completeJobs = Object.keys(videosJobsReducer).filter((videoJobId) => {
        return videosJobsReducer[videoJobId].job_status === 'Delivered'
    })


    if (Object.keys(requesterReducer).length > 0 && Object.keys(videosJobsReducer).length > 0) {

        let requester_ids = Object.keys(videosJobsReducer).map(x => {
            return videosJobsReducer[x].requester_id
        });


        requester = requester_ids.reduce((accumulator, element) => {

            if (requesterReducer[element].course_id !== null) {
                accumulator[element] =  {value: requesterReducer[element].course_id, label:requesterReducer[element].course_id, requester_id:requesterReducer[element].id}
            } else {
                accumulator[element] = {value: campusOrgReducer[requesterReducer[element].campus_org_id].organization_name, label:campusOrgReducer[requesterReducer[element].campus_org_id].organization_name, requester_id:requesterReducer[element].id}

            }

            return accumulator

        }, {});


        courseSelectorContent = Object.keys(requester).map(key => {
            return requester[key]

        })




    }


    return {
        videosJobsReducer,
        jobsLoading,
        requesterReducer,
        coursesReducer,
        requester,
        courseSelectorContent,
        videoJobsLoading: loadingStatusReducer.videoJobsLoading,
        activeJobs,
        semesterJobs,
        completeJobs,
        mediaReducer,

        semesterJobsCount: semesterJobs.length,
        activeJobsCount: activeJobs.length,
        completeJobsCount: completeJobs.length

    }
}

export default withRouter(connect(mapStateToProps)(JobManagementControlContainer))