import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Select from "react-select";
import PreparedJobsContainer from "./preparedJobsContainer";
import JobPrepContainer from "./JobPrepContainer";
import {AddVideoJobBatch} from '../../actions/ampApi/postData'
import {clearTempCapJobs} from '../../actions/tempJobsForm';
import {clearMediaSearch} from "../../actions/mediaSearch";
import {removeErrorState} from "../../actions/error_state";
import Button from "@material-ui/core/Button";


class NewJobMasterContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            formValue: '',
        };

        this.applyRequesterId = this.applyRequesterId.bind(this)
        this.submitJobs = this.submitJobs.bind(this)
    }

    applyRequesterId(value) {
        this.setState({formValue:value})
    }

    submitJobs() {
        this.props.dispatch(AddVideoJobBatch(this.props.tempJobsFormReducer))
        this.props.dispatch(clearTempCapJobs())

    }

    componentWillUnmount() {

        this.props.dispatch(clearTempCapJobs())
        this.props.dispatch(clearMediaSearch())
        this.props.dispatch(removeErrorState())

    }




    render() {
        return (
            <div className="newJobMasterContainer">
                <div className="requesterSelector">
                    <form className="requesterSelectorForm">
                        <label className="newJobLabel">
                            Select Requester
                            <Select className="selector" isDisabled={this.props.disableSelector} value={this.state.formValue} options={this.props.courses_list} onChange={this.applyRequesterId}/>
                        </label>
                    </form>
                </div>
                <JobPrepContainer requesterId = {this.state.formValue}/>
                <PreparedJobsContainer />
                <div className="submitJobsButton">
                    <Button size="small"  variant="contained" onClick={this.submitJobs} disabled={!this.props.enableSubmit}>{this.props.totalJobs === 0 ? ("No Jobs Added") : ("Submit Jobs") } </Button>

                </div>
            </div>

        )
    }

}

function mapStateToProps({mediaSearchReducer, errorsReducer, tempJobsFormReducer, coursesReducer, campusOrgReducer, requesterReducer, employeesReducer, loadingStatusReducer}, {props}) {

    let courseIds = [];
    let campusOrgs = [];


    let totalJobs = Object.keys(tempJobsFormReducer).filter(job => {
        return tempJobsFormReducer[job].meta.created === true
    }).length;


    let enableSubmit = Object.keys(tempJobsFormReducer).some(item =>{
        return tempJobsFormReducer[item].meta.created === true
    });

    let disableSelector = Object.keys(tempJobsFormReducer).some(job =>{
        return tempJobsFormReducer[job].meta.created === false

    })

    if (loadingStatusReducer['instructorsLoading'] === false) {
        if (Object.keys(coursesReducer).length > 0) {
            courseIds = Object.keys(coursesReducer).map(currentCourse => {
                return  Object.keys(requesterReducer).reduce((accumulator, currentRequester) => {
                    if (requesterReducer[currentRequester].course_id === currentCourse) {

                        accumulator = {requester_id: requesterReducer[currentRequester].id,
                            label: requesterReducer[currentRequester].course_id + " | " + employeesReducer[requesterReducer[currentRequester].employee_id].employee_first_name + " " + employeesReducer[requesterReducer[currentRequester].employee_id].employee_last_name,
                            value:requesterReducer[currentRequester].course_id}
                    }
                    return accumulator
                },[])
            });

            if (Object.keys(campusOrgReducer).length > 0) {

                campusOrgs = Object.keys(campusOrgReducer).map(currentOrg => {
                    return Object.keys(requesterReducer).reduce((accumulator, currentRequester) => {
                        if (requesterReducer[currentRequester].campus_org_id === parseInt(currentOrg, 10)) {
                            const org = {requester_id: requesterReducer[currentRequester].id,
                                label: campusOrgReducer[currentOrg].organization_name + " | " + employeesReducer[requesterReducer[currentRequester].org_employee_id].employee_first_name + " " + employeesReducer[requesterReducer[currentRequester].org_employee_id].employee_last_name,
                                value:campusOrgReducer[currentOrg].organization_name}
                            accumulator.push(org)
                        }
                        return accumulator
                    },[])
                }).reduce((accumulator, currentOrg) => {
                    return accumulator.concat(currentOrg)
                },[])

            }

        }

    }

    let courses_list = []
    if (loadingStatusReducer.requestersLoading === true) {
        courses_list = []
    }

    if (loadingStatusReducer.requestersLoading === false) {

        courses_list = [...courseIds, ...campusOrgs]
    }



    return {
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer,
        courses_list,
        enableSubmit,
        disableSelector,
        totalJobs
    }
}


export default withRouter(connect(mapStateToProps)(NewJobMasterContainer))