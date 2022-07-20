import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Select from "react-select";
import PreparedJobsContainer from "./preparedJobsContainer";
import JobPrepContainer from "./JobPrepContainer";
import {AddVideoJobBatch} from '../../actions/ampApi/postData'
import {clearTempCapJobs} from '../../actions/tempJobsForm';
import Button from "@material-ui/core/Button";
import {addTempFormValue, clearFormData} from "../../actions/tempFormData";


class NewJobMasterContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            formValue: this.props.formvalue,
        };

        this.applyRequesterId = this.applyRequesterId.bind(this)
        this.submitJobs = this.submitJobs.bind(this)


    }

    applyRequesterId(value) {
        //modified by KG
        this.setState({formValue: value}, () => {
            this.props.dispatch(addTempFormValue(this.state.formValue))
        })


    }

    submitJobs() {
        this.props.dispatch(AddVideoJobBatch(this.props.tempJobsFormReducer))
        this.props.dispatch(clearTempCapJobs())
        this.props.dispatch(clearFormData())
        this.setState({formValue: ''})


    }


    render() {
        return (
            <div className="newJobMasterContainer">
                <div className="requesterSelector">
                    <form className="requesterSelectorForm">
                        <label className="newJobLabel">
                            Select Requester
                            <Select className="selector" isDisabled={this.props.disableSelector}
                                    value={this.state.formValue} options={this.props.courses_list}
                                    onChange={this.applyRequesterId}/>
                        </label>
                    </form>
                </div>
                <JobPrepContainer requesterId={this.state.formValue}/>
                <PreparedJobsContainer/>
                <div className="submitJobsButton">
                    <Button size="small" variant="contained" onClick={this.submitJobs}
                            disabled={!this.props.enableSubmit}>{this.props.totalJobs === 0 ? ("No Jobs Added") : ("Submit Jobs")} </Button>
                </div>
            </div>

        )
    }

}

function mapStateToProps({
                             mediaSearchReducer,
                             errorsReducer,
                             tempJobsFormReducer,
                             coursesReducer,
                             campusOrgReducer,
                             requesterReducer,
                             employeesReducer,
                             loadingStatusReducer,
                             transaction_id,
                             tempFormDataReducer
                         }, {props}) {

    let courseIds = [];
    let campusOrgs = [];

    let formvalue = '';


    let totalJobs = Object.keys(tempJobsFormReducer).filter(job => {
        return tempJobsFormReducer[job].meta.created === true
    }).length;


    let enableSubmit = Object.keys(tempJobsFormReducer).some(item => {
        return tempJobsFormReducer[item].meta.created === true
    });

    let disableSelector = Object.keys(tempJobsFormReducer).some(job => {
        return tempJobsFormReducer[job].meta.created === false

    })


    if (loadingStatusReducer['instructorsLoading'] === false) {
        if (Object.keys(coursesReducer).length > 0) {
            courseIds = Object.keys(coursesReducer).map(currentCourse => {
                return Object.keys(requesterReducer).reduce((accumulator, currentRequester) => {
                    if (requesterReducer[currentRequester].course_id === currentCourse) {

                        accumulator = {
                            requester_id: requesterReducer[currentRequester].id,
                            label: requesterReducer[currentRequester].course_id + " | " + employeesReducer[requesterReducer[currentRequester].employee_id].employee_first_name + " " + employeesReducer[requesterReducer[currentRequester].employee_id].employee_last_name,
                            value: requesterReducer[currentRequester].course_id
                        }
                    }
                    return accumulator
                }, [])
            });

            if (Object.keys(campusOrgReducer).length > 0) {

                campusOrgs = Object.keys(campusOrgReducer).map(currentOrg => {
                    return Object.keys(requesterReducer).reduce((accumulator, currentRequester) => {
                        if (requesterReducer[currentRequester].campus_org_id === parseInt(currentOrg, 10)) {
                            const org = {
                                requester_id: requesterReducer[currentRequester].id,
                                label: campusOrgReducer[currentOrg].organization_name + " | " + employeesReducer[requesterReducer[currentRequester].org_employee_id].employee_first_name + " " + employeesReducer[requesterReducer[currentRequester].org_employee_id].employee_last_name,
                                value: campusOrgReducer[currentOrg].organization_name
                            }
                            accumulator.push(org)
                        }
                        return accumulator
                    }, [])
                }).reduce((accumulator, currentOrg) => {
                    return accumulator.concat(currentOrg)
                }, [])

            }

        }

        if (Object.keys(tempFormDataReducer).length > 0) {

            console.log("Data: exists", tempFormDataReducer)

            //checking if formvalue exists

            if (tempFormDataReducer.data.formValue != null) {
                formvalue = tempFormDataReducer.data.formValue
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
        totalJobs,
        transaction_id,
        formvalue
    }
}


export default withRouter(connect(mapStateToProps)(NewJobMasterContainer))