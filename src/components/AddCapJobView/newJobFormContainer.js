import DatePicker from 'react-date-picker';
import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { addJobInfoToTempJob, completeTempJob } from "../../actions/tempJobsForm";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";

class NewJobFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: "",
            show_date: new Date(),
            delivery_format: "Amara",
            is_auto_caption: false
        };
        this.addJobInfo = this.addJobInfo.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSetDate = this.handleSetDate.bind(this);
    }

    handleSetDate(value) {
        this.setState({ show_date: value });
    }

    addJobInfo(event) {
        const { transaction_id, requesterId } = this.props;
        const { show_date, delivery_format, comments, is_auto_caption } = this.state;
        const reducer_obj = {
            show_date,
            delivery_format,
            comments,
            requester_id: requesterId.requester_id,
            semester: this.props.semester,
            ilearn_auto_caption: is_auto_caption
        };
        this.props.dispatch(addJobInfoToTempJob(transaction_id, reducer_obj));
        this.props.dispatch(completeTempJob(transaction_id, true));
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (!this.props.isLocked) {
            this.setState({ [name]: value });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { transaction_id } = this.props;
        if (prevProps.transaction_id !== transaction_id && transaction_id === '') {
            this.setState({
                comments: '',
                show_date: new Date(),
                delivery_format: "Amara",
                requester_id: this.props.requesterId,
                is_auto_caption: false
            });
        }
    }

    render() {
        const { formEnabled } = this.props;
        const { show_date, delivery_format, comments, is_auto_caption } = this.state;
        return (
            <div className="newJobFormOuterContainer">
                <div>
                    <form className="jobForm">
                        <div className="jobFormLeft">
                            <div>
                                <label>
                                    Show Date:
                                    <DatePicker
                                        disabled={!formEnabled}
                                        name="show_date"
                                        value={show_date}
                                        onChange={this.handleSetDate}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Output:
                                    <Select
                                        value={delivery_format}
                                        onChange={this.handleInputChange}
                                        disabled={!formEnabled}
                                        name="delivery_format"
                                    >
                                        <MenuItem value={'Amara'}>Amara</MenuItem>
                                        <MenuItem value={"SRT"}>SRT</MenuItem>
                                        <MenuItem value={"Video File"}>Video File</MenuItem>
                                        <MenuItem value={"Open Caption"}>Open Caption</MenuItem>
                                        <MenuItem value={"Described Video"}>Described Video</MenuItem>
                                        <MenuItem value={"DVD"}>DVD</MenuItem>
                                    </Select>
                                </label>
                            </div>
                            <div>
                                <label>
                                    iLearn Auto Caption
                                    <input
                                        name="is_auto_caption"
                                        type="checkbox"
                                        value={is_auto_caption}
                                        onChange={this.handleInputChange}
                                        disabled={!formEnabled}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="jobFormRight">
                            <label>
                                <TextField
                                    className="jobFormComments"
                                    multiline
                                    rows={7}
                                    placeholder="comments"
                                    name="comments"
                                    disabled={!formEnabled}
                                    value={comments}
                                    onChange={this.handleInputChange}
                                />
                            </label>
                        </div>
                    </form>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={this.addJobInfo}
                        disabled={!this.props.submitButtonEnabled || !formEnabled}
                    >
                        Complete Request
                    </Button>
                </div>
            </div>
        );
    }
}

function mapStateToProps({
                             globalsReducer,
                             coursesReducer,
                             mediaSearchReducer,
                             errorsReducer,
                             tempJobsFormReducer,
                             requesterReducer
                         }, { requesterId, transaction_id, isLocked }) {
    const formEnabled = transaction_id in tempJobsFormReducer;
    let submitButtonEnabled = false;
    let semester = globalsReducer.currentSemester;

    // Controls the submit button disabled feature
    if (tempJobsFormReducer.hasOwnProperty(transaction_id)) {
        if (tempJobsFormReducer[transaction_id].hasOwnProperty('video')) {
            if (tempJobsFormReducer[transaction_id].video.hasOwnProperty('id')) {
                if (tempJobsFormReducer[transaction_id].video.media_type === 'File') {
                    submitButtonEnabled = true;
                }
                if (tempJobsFormReducer[transaction_id].video.media_type === 'URL') {
                    submitButtonEnabled = true;
                }
            }
        }
    }

    return {
        mediaSearchReducer,
        errorsReducer,
        tempJobsFormReducer,
        requesterReducer,
        coursesReducer,
        requesterId,
        formEnabled,
        submitButtonEnabled,
        semester
    };
}

export default withRouter(connect(mapStateToProps)(NewJobFormContainer));
