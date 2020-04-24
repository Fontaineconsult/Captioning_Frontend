import DatePicker from 'react-date-picker';
import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";

import {addJobInfoToTempJob, completeTempJob} from "../../actions/tempJobsForm";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import addJobsContainer from "../iLearnViewsContainer/iLearnTabulatorViewContainer/addJobsContainer";
import Section from "react-virtualized/dist/commonjs/Collection/Section";
import MenuItem from "@material-ui/core/MenuItem";

class NewJobFormContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {

            comments: "",
            show_date: new Date(),
            delivery_format: "Amara"

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
        console.log("SDFGDSFGSDF", this.props.requesterId)
        let reducer_obj = {
            show_date: this.state.show_date,
            delivery_format: this.state.delivery_format,
            comments: this.state.comments,
            requester_id: this.props.requesterId.requester_id,
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
                    delivery_format: "Amara",
                    requester_id: this.props.requesterId
                })
            }
        }
    }

    render() {

        return (

            <div>
                <form className="jobForm">

                    <div className="jobFormLeft">
                        <div>
                            <label>
                                Show Date:
                                <DatePicker disabled={!this.props.formEnabled} name="show_date" value={this.state.show_date} onChange={this.handleSetDate}/>
                            </label>
                        </div>

                        <div>
                            <label>
                                Output:
                                <Select
                                    value={this.state.delivery_format}
                                    onChange={this.handleInputChange}
                                    disabled={!this.props.formEnabled}
                                    name="delivery_format"

                                >
                                    <MenuItem value={'Amara'}>Amara</MenuItem>
                                    <MenuItem value={"SRT"}>SRT</MenuItem>
                                    <MenuItem value={"Video File"}>Video File</MenuItem>
                                </Select>


                            </label>
                        </div>
                    </div>
                    <div className="jobFormRight">
                        <label>
                            <textarea
                                className="jobFormComments"
                                placeholder="comments"
                                name="comments"
                                disabled={!this.props.formEnabled}
                                value={this.state.comments}
                                onChange={this.handleInputChange} />
                        </label>
                    </div>

                </form>

                <Button size="small"  variant="contained" onClick={e => this.addJobInfo(e)} disabled={!this.props.formEnabled}>Complete Request</Button>
            </div>

        )
    }

}

function mapStateToProps({coursesReducer, mediaSearchReducer, errorsReducer, tempJobsFormReducer, requesterReducer}, {props, requesterId,transaction_id, isLocked}) {
    let formEnabled = transaction_id in tempJobsFormReducer;
    if (formEnabled) {
            if (tempJobsFormReducer[transaction_id].hasOwnProperty('video')) {
                formEnabled = tempJobsFormReducer[transaction_id].video.hasOwnProperty('id');
            }
        }

    return {
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer,
        requesterReducer,
        coursesReducer,
        props,
        isLocked,
        requesterId,
        formEnabled
    }
}


export default withRouter(connect(mapStateToProps)(NewJobFormContainer))